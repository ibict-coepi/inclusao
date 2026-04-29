import {useEffect, useMemo, useState} from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Globe,
  Info,
  Menu,
  PlusCircle,
  Search,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';
import type {LucideIcon} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';

import atualizacoes from './conteudo/atualizacoes.json';
import equipe from './conteudo/equipe.json';
import metas from './conteudo/metas.json';
import portal from './conteudo/portal.json';

const icones = {
  apresentacao: Info,
  justificativa: ShieldCheck,
  objetivos: Target,
  metodologia: BookOpen,
  equipe: Users,
  atualizacoes: Clock,
};

const linksExternos = [
  {label: 'Portal IBICT', href: 'https://www.ibict.br', icon: Globe},
  {label: 'Validação SEI', href: 'https://sei.mcti.gov.br/verifica.html', icon: ShieldCheck},
];

export default function App() {
  const [filter, setFilter] = useState('');
  const [activeTab, setActiveTab] = useState('apresentacao');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (window.location.hash) {
      setActiveTab(window.location.hash.substring(1));
    }
  }, []);

  const filteredTeam = useMemo(() => {
    return equipe.filter((member) => {
      const busca = filter.toLowerCase();
      return member.nome.toLowerCase().includes(busca) || member.funcao.toLowerCase().includes(busca);
    });
  }, [filter]);

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-gov-gold/30">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Hero />
      <MobileMenu
        activeTab={activeTab}
        handleNavClick={handleNavClick}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <DesktopMenu activeTab={activeTab} handleNavClick={handleNavClick} />

      <main className="max-w-7xl mx-auto my-12 px-5 w-full flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <SecaoProjeto />
            <SecaoResultados />
            <SecaoJustificativa />
            <SecaoMetas />
            <SecaoMetodologia />
            <SecaoAtualizacoes />
          </div>

          <aside className="space-y-8">
            <CardDadosOficiais />
            <CardGovernanca />
            <SecaoEquipe filter={filter} filteredTeam={filteredTeam} setFilter={setFilter} />
            <LinksExternos />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Header({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}) {
  return (
    <header className="br-header">
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <a href={portal.links.govbr} className="flex items-center no-underline hover:opacity-80 transition-opacity" target="_blank" rel="noreferrer">
          <img src={portal.logoGoverno} alt={portal.textosAlternativos.logoGoverno} className="gov-logo-header" referrerPolicy="no-referrer" />
        </a>
      </div>
      <div className="hidden md:flex items-center gap-6 text-[10px] font-bold text-gov-gray-dark uppercase tracking-widest">
        {portal.linksCabecalho.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="hover:text-gov-blue transition-colors">
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="project-hero">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(255,204,0,0.4),transparent_50%)]" />
        <div className="grid grid-cols-12 h-full">
          {Array.from({length: 12}).map((_, i) => (
            <div key={i} className="border-r border-white/10 h-full" />
          ))}
        </div>
      </div>

      <motion.div
        initial={{opacity: 0, y: 30}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.6, ease: 'easeOut'}}
        className="relative z-10 max-w-5xl mx-auto px-4"
      >
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gov-gold text-gov-blue text-[11px] font-extrabold rounded-full uppercase tracking-[0.2em] shadow-lg">
            <ShieldCheck size={14} /> {portal.selo}
          </span>
        </div>
        <h1 className="m-0 text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 drop-shadow-sm">{portal.projeto.nome}</h1>
        <p className="mt-4 opacity-90 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">{portal.projeto.subtitulo}</p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href={portal.links.sei} target="_blank" rel="noreferrer" className="gov-button gov-button-primary no-underline">
            <FileText size={18} /> Validar no SEI
          </a>
          <button className="gov-button gov-button-outline bg-white/5 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-gov-blue">
            <Download size={18} /> Documentação do Projeto
          </button>
        </div>
      </motion.div>
    </section>
  );
}

function MobileMenu({
  activeTab,
  handleNavClick,
  isMenuOpen,
  setIsMenuOpen,
}: {
  activeTab: string;
  handleNavClick: (id: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}) {
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div initial={{opacity: 0, x: -100}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: -100}} className="fixed inset-0 z-[70] bg-white p-6 lg:hidden">
          <div className="flex justify-between items-center mb-10">
            <span className="font-black text-gov-blue tracking-tighter text-2xl">MENU</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-gray-100 rounded-full" aria-label="Fechar menu">
              <X />
            </button>
          </div>
          <ul className="space-y-6">
            {portal.menu.map((item) => {
              const Icone = icones[item.id as keyof typeof icones];
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-4 py-4 text-xl font-bold no-underline transition-colors ${activeTab === item.id ? 'text-gov-blue' : 'text-gray-400'}`}
                  >
                    <Icone size={24} className={activeTab === item.id ? 'text-gov-gold' : ''} />
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DesktopMenu({activeTab, handleNavClick}: {activeTab: string; handleNavClick: (id: string) => void}) {
  return (
    <nav className="main-nav hidden lg:block">
      <ul className="flex justify-center list-none m-0 p-0">
        {portal.menu.map((item) => {
          const Icone = icones[item.id as keyof typeof icones];
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 py-6 px-8 font-bold text-[11px] tracking-[0.15em] transition-all relative no-underline ${
                  activeTab === item.id ? 'text-gov-blue bg-gov-blue/5' : 'text-gray-400 hover:text-gov-blue hover:bg-gray-50'
                }`}
              >
                <Icone size={14} className={activeTab === item.id ? 'text-gov-gold' : ''} />
                {item.label.toUpperCase()}
                {activeTab === item.id && <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-gov-gold" />}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function SecaoProjeto() {
  return (
    <motion.section id="apresentacao" initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} className="bento-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gov-blue text-2xl font-black flex items-center gap-3">
          <Info size={28} className="text-gov-gold" /> O Projeto
        </h2>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{portal.apresentacao.rotulo}</span>
      </div>
      <div className="prose prose-blue max-w-none text-gov-gray-dark leading-relaxed space-y-6">
        <p className="text-xl font-semibold text-gov-blue/90 border-l-4 border-gov-gold pl-6 py-2 bg-gov-gold/5 rounded-r-lg">{portal.apresentacao.destaque}</p>
        {portal.apresentacao.paragrafos.map((paragrafo) => (
          <p key={paragrafo}>{paragrafo}</p>
        ))}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {portal.apresentacao.cards.map((card) => (
            <div key={card.titulo} className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
              <h4 className="font-bold text-gov-blue mb-2 flex items-center gap-2">
                {card.icone === 'crescimento' ? <TrendingUp size={18} className="text-gov-gold" /> : <Globe size={18} className="text-gov-gold" />}
                {card.titulo}
              </h4>
              <p className="text-sm opacity-80">{card.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function SecaoResultados() {
  return (
    <motion.section initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} className="bento-card bg-gov-blue/5 border-gov-blue/10">
      <h2 className="text-gov-blue text-2xl font-black mb-8 flex items-center gap-3">
        <ArrowUpRight size={28} className="text-gov-gold" /> Resultados Esperados
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {portal.resultadosEsperados.map((resultado) => (
          <div key={resultado.titulo} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="mt-1 text-gov-gold"><CheckCircle2 size={18} /></div>
            <div>
              <h5 className="font-bold text-gov-blue text-sm">{resultado.titulo}</h5>
              <p className="text-xs text-gray-500">{resultado.descricao}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

function SecaoJustificativa() {
  return (
    <motion.section id="justificativa" initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} className="bento-card">
      <h2 className="text-gov-blue text-2xl font-black mb-6 flex items-center gap-3">
        <ShieldCheck size={28} className="text-gov-gold" /> Justificativa Social
      </h2>
      <div className="space-y-6">
        <div className="flex gap-6 items-center p-6 bg-gov-blue text-white rounded-2xl shadow-xl">
          <div className="text-4xl font-black text-gov-gold">{portal.justificativa.numeroDestaque}</div>
          <div className="text-sm font-medium opacity-90 leading-tight">{portal.justificativa.textoDestaque}</div>
        </div>
        <p className="text-gov-gray-dark italic">"{portal.justificativa.citacao}"</p>
        <div className="flex items-center gap-2 text-xs font-bold text-gov-blue">
          <ArrowUpRight size={14} />
          <span>{portal.justificativa.alinhamento}</span>
        </div>
      </div>
    </motion.section>
  );
}

function SecaoMetas() {
  return (
    <motion.section id="objetivos" initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} className="bento-card">
      <h2 className="text-gov-blue text-2xl font-black mb-8 flex items-center gap-3">
        <Target size={28} className="text-gov-gold" /> Objetivos e Metas
      </h2>
      <div className="mb-10 p-6 bg-gov-blue/5 rounded-2xl border border-gov-blue/10">
        <h4 className="text-gov-blue font-black text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
          <ArrowUpRight size={16} className="text-gov-gold" /> Objetivo Geral
        </h4>
        <p className="text-gov-gray-dark font-medium leading-relaxed">{portal.objetivoGeral}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metas.map((meta) => (
          <div key={meta.id} className="group p-6 border border-gray-100 rounded-2xl bg-white hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-gov-blue/5 rounded-xl flex items-center justify-center text-gov-blue font-bold group-hover:bg-gov-blue group-hover:text-white transition-colors">{meta.id}</div>
              <span className={`text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase ${statusClass(meta.status)}`}>{meta.status}</span>
            </div>
            <h4 className="font-bold text-gov-blue mb-4 leading-tight">{meta.titulo}</h4>
            <ul className="mb-6 space-y-2 list-none p-0">
              {meta.detalhes.map((detail) => (
                <li key={detail} className="text-[11px] text-gray-500 flex items-start gap-2">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-gov-gold shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <Calendar size={12} />
                <span>Previsão: {meta.ano}</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-gov-blue/40 uppercase">
                <Info size={12} />
                <span>Cronograma Oficial</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

function SecaoMetodologia() {
  return (
    <motion.section id="metodologia" initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} className="bento-card">
      <h2 className="text-gov-blue text-2xl font-black mb-8 flex items-center gap-3">
        <BookOpen size={28} className="text-gov-gold" /> Metodologia Sociotécnica
      </h2>
      <div className="relative space-y-4">
        {portal.metodologia.map((item) => (
          <div key={item.fase} className="timeline-item group hover:bg-gov-blue/5 transition-colors cursor-default">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <span className="text-gov-light-blue font-black text-xs uppercase tracking-widest">{item.fase}</span>
              <h4 className="font-black text-gov-blue group-hover:translate-x-1 transition-transform">{item.titulo}</h4>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">{item.descricao}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

function SecaoAtualizacoes() {
  return (
    <motion.section id="atualizacoes" initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} className="bento-card border-dashed border-2 border-gov-blue/20 bg-gov-blue/[0.02]">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-gov-blue text-2xl font-black flex items-center gap-3">
          <Clock size={28} className="text-gov-gold" /> Atualizações do Projeto
        </h2>
        <PlusCircle size={20} className="text-gov-blue/30 cursor-help" title="Novas informações serão adicionadas aqui" />
      </div>
      <div className="space-y-6">
        {atualizacoes.map((update) => (
          <div key={`${update.data}-${update.titulo}`} className="flex gap-6 items-start">
            <div className="text-[10px] font-black text-gov-blue bg-gov-blue/10 px-3 py-2 rounded-lg whitespace-nowrap">{update.data}</div>
            <div className="flex-grow pb-6 border-b border-gray-100 last:border-0">
              <h4 className="font-bold text-gov-blue mb-2">{update.titulo}</h4>
              <p className="text-sm text-gray-500">{update.descricao}</p>
            </div>
          </div>
        ))}
        <div className="p-8 text-center border-2 border-dashed border-gray-200 rounded-2xl">
          <p className="text-xs text-gray-400 font-medium italic">{portal.textoAguardandoAtualizacoes}</p>
        </div>
      </div>
    </motion.section>
  );
}

function CardDadosOficiais() {
  return (
    <motion.div initial={{opacity: 0, x: 20}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}} className="bento-card bg-gov-blue text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gov-gold/10 rounded-full -mr-16 -mt-16 blur-2xl" />
      <h3 className="text-lg font-black mb-8 flex items-center gap-3 text-gov-gold relative z-10">
        <FileText size={22} /> Dados Oficiais
      </h3>
      <div className="space-y-6 relative z-10">
        <div className="space-y-1">
          <p className="text-[10px] uppercase font-black tracking-widest opacity-50">Contrato</p>
          <p className="text-2xl font-black">{portal.projeto.contrato}</p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="p-4 bg-white/10 rounded-2xl">
            <p className="text-[9px] uppercase font-black tracking-widest opacity-50 mb-1">Valor Global</p>
            <p className="text-xl font-black text-gov-gold">{portal.projeto.valor}</p>
          </div>
          <div className="p-4 bg-white/10 rounded-2xl">
            <p className="text-[9px] uppercase font-black tracking-widest opacity-50 mb-1">Processo SEI</p>
            <p className="text-sm font-bold font-mono">{portal.projeto.processoSei}</p>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="text-xs font-bold opacity-60">Status de Execução</span>
          <span className="px-3 py-1 bg-gov-success text-white text-[10px] font-black rounded-full uppercase tracking-widest">{portal.projeto.status}</span>
        </div>
      </div>
    </motion.div>
  );
}

function CardGovernanca() {
  return (
    <motion.div initial={{opacity: 0, x: 20}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}} className="bento-card">
      <h3 className="text-gov-blue font-black text-lg mb-8 flex items-center gap-3">
        <Globe size={22} className="text-gov-gold" /> Governança
      </h3>
      <div className="space-y-6">
        <LinhaGovernanca titulo="Contratante" texto={portal.projeto.instituicao} icon={ShieldCheck} />
        <LinhaGovernanca titulo="Gestora" texto={portal.projeto.gestora} icon={Users} />
        <div className="p-4 bg-gov-gold/5 border border-gov-gold/20 rounded-2xl">
          <p className="text-[10px] font-bold text-gov-blue/60 uppercase tracking-tighter mb-2">Apoio Institucional</p>
          <p className="text-xs font-bold text-gov-blue leading-tight">{portal.projeto.apoio}</p>
        </div>
      </div>
    </motion.div>
  );
}

function LinhaGovernanca({titulo, texto, icon: Icone}: {titulo: string; texto: string; icon: LucideIcon}) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="w-12 h-12 bg-gov-blue/5 rounded-2xl flex items-center justify-center text-gov-blue group-hover:bg-gov-blue group-hover:text-white transition-all">
        <Icone size={20} />
      </div>
      <div>
        <p className="text-[9px] uppercase font-black text-gray-400">{titulo}</p>
        <p className="text-sm font-black text-gov-blue">{texto}</p>
      </div>
    </div>
  );
}

function SecaoEquipe({
  filter,
  filteredTeam,
  setFilter,
}: {
  filter: string;
  filteredTeam: typeof equipe;
  setFilter: (value: string) => void;
}) {
  return (
    <motion.section id="equipe" initial={{opacity: 0, x: 20}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}} className="bento-card">
      <h3 className="text-gov-blue font-black text-lg mb-6 flex items-center gap-3">
        <Users size={22} className="text-gov-gold" /> Equipe
      </h3>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-gov-blue/10 transition-all"
          placeholder="Filtrar equipe..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {filteredTeam.map((member) => (
            <motion.div key={member.nome} layout initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="p-3 border border-gray-50 rounded-xl hover:bg-gray-50 transition-colors">
              <h4 className="font-bold text-xs text-gov-blue">{member.nome}</h4>
              <p className="text-[9px] text-gray-400 font-medium">{member.funcao}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

function LinksExternos() {
  return (
    <div className="space-y-3">
      {linksExternos.map((link) => (
        <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl group no-underline shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3">
            <link.icon size={18} className="text-gov-blue" />
            <span className="text-xs font-bold text-gov-blue">{link.label}</span>
          </div>
          <ExternalLink size={14} className="text-gray-300 group-hover:text-gov-gold transition-colors" />
        </a>
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gov-gray-dark text-white py-20 px-[5%] mt-auto border-t-8 border-gov-gold">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
        <div className="space-y-8">
          <img src={portal.logoGoverno} alt={portal.textosAlternativos.logoGoverno} className="gov-logo-footer" referrerPolicy="no-referrer" />
          <div className="space-y-2">
            <h4 className="font-black text-2xl tracking-tighter">{portal.rodape.orgao}</h4>
            <p className="text-xs opacity-50 leading-relaxed max-w-xs">{portal.rodape.descricao}</p>
          </div>
        </div>

        <div className="space-y-8">
          <h5 className="font-black text-sm text-gov-gold uppercase tracking-[0.2em]">{portal.rodape.localizacaoTitulo}</h5>
          <div className="space-y-4 text-xs opacity-70 leading-loose">
            <p className="flex items-start gap-3">
              <Globe size={16} className="text-gov-gold shrink-0 mt-1" />
              <span>{portal.rodape.endereco}</span>
            </p>
            <p className="flex items-center gap-3">
              <Info size={16} className="text-gov-gold shrink-0" />
              <span>{portal.rodape.atendimento}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end justify-center space-y-6">
          <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 text-center backdrop-blur-xl">
            <CheckCircle2 size={40} className="mx-auto mb-4 text-gov-gold" />
            <p className="text-xs font-black uppercase tracking-widest">Portal de Transparência</p>
            <p className="text-[10px] opacity-40 mt-2 italic">Atualizado em: {portal.projeto.ultimaAtualizacao}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest opacity-30">
        <p>{portal.rodape.copyright}</p>
        <div className="flex gap-8">
          {portal.linksRodape.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="hover:text-gov-gold transition-colors no-underline text-white">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function statusClass(status: string) {
  if (status === 'Concluído') return 'bg-gov-success/10 text-gov-success';
  if (status === 'Em Execução') return 'bg-gov-light-blue/10 text-gov-light-blue';
  return 'bg-gray-100 text-gray-400';
}
