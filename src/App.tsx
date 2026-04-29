import {useEffect, useMemo, useState} from 'react';
import type {LucideIcon} from 'lucide-react';
import {
  ArrowUpRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Database,
  Download,
  ExternalLink,
  FileText,
  Filter,
  Globe,
  Info,
  Layers,
  Menu,
  Search,
  ShieldCheck,
  Target,
  Users,
  WalletCards,
  X,
} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';

import atualizacoes from './conteudo/atualizacoes.json';
import documentos from './conteudo/documentos.json';
import equipe from './conteudo/equipe.json';
import levantamento from './conteudo/levantamento.json';
import metas from './conteudo/metas.json';
import orcamento from './conteudo/orcamento.json';
import portal from './conteudo/portal.json';

const iconesMenu: Record<string, LucideIcon> = {
  visao: Info,
  dados: FileText,
  metas: Target,
  financeiro: WalletCards,
  documentos: Download,
  levantamento: Database,
  equipe: Users,
  atualizacoes: Clock,
};

const linksExternos = [
  {label: 'Portal IBICT', href: 'https://www.ibict.br', icon: Globe},
  {label: 'Validação SEI', href: 'https://sei.mcti.gov.br/verifica.html', icon: ShieldCheck},
];

export default function App() {
  const [buscaEquipe, setBuscaEquipe] = useState('');
  const [activeTab, setActiveTab] = useState('visao');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (window.location.hash) {
      setActiveTab(window.location.hash.substring(1));
    }
  }, []);

  const equipeFiltrada = useMemo(() => {
    const busca = buscaEquipe.toLowerCase();
    return equipe.filter((pessoa) => pessoa.nome.toLowerCase().includes(busca) || pessoa.funcao.toLowerCase().includes(busca));
  }, [buscaEquipe]);

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-gov-gold/30">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Hero />
      <MobileMenu activeTab={activeTab} handleNavClick={handleNavClick} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <DesktopMenu activeTab={activeTab} handleNavClick={handleNavClick} />

      <main className="max-w-7xl mx-auto my-12 px-5 w-full flex-grow">
        <PainelResumo />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 space-y-8">
            <SecaoVisaoGeral />
            <SecaoMetas />
            <SecaoFinanceiro />
            <SecaoEntregas />
            <SecaoLevantamento />
            <SecaoAtualizacoes />
          </div>

          <aside className="space-y-8">
            <CardDadosOficiais />
            <CardGovernanca />
            <SecaoDocumentos />
            <SecaoEquipe buscaEquipe={buscaEquipe} equipeFiltrada={equipeFiltrada} setBuscaEquipe={setBuscaEquipe} />
            <LinksExternos />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Header({isMenuOpen, setIsMenuOpen}: {isMenuOpen: boolean; setIsMenuOpen: (isOpen: boolean) => void}) {
  return (
    <header className="br-header">
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <a href={portal.links.govbr} className="flex items-center no-underline hover:opacity-80 transition-opacity" target="_blank" rel="noreferrer">
          <img src={portal.logoGovernoCabecalho} alt={portal.textosAlternativos.logoGoverno} className="gov-logo-header" referrerPolicy="no-referrer" />
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

      <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, ease: 'easeOut'}} className="relative z-10 max-w-5xl mx-auto px-4">
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gov-gold text-gov-blue text-[11px] font-extrabold rounded-full uppercase tracking-[0.2em] shadow-lg">
            <ShieldCheck size={14} /> {portal.selo}
          </span>
        </div>
        <h1 className="m-0 text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 drop-shadow-sm">{portal.projeto.nome}</h1>
        <p className="mt-4 opacity-90 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">{portal.projeto.subtitulo}</p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="#dados" className="gov-button gov-button-primary no-underline">
            <FileText size={18} /> Ver dados oficiais
          </a>
          <a href="#documentos" className="gov-button gov-button-outline bg-white/5 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-gov-blue no-underline">
            <Download size={18} /> Documentos do projeto
          </a>
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
        <motion.div initial={{opacity: 0, x: -100}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: -100}} className="fixed inset-0 z-[70] bg-white p-6 lg:hidden overflow-y-auto">
          <div className="flex justify-between items-center mb-10">
            <span className="font-black text-gov-blue tracking-tighter text-2xl">MENU</span>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-gray-100 rounded-full" aria-label="Fechar menu">
              <X />
            </button>
          </div>
          <ul className="space-y-5">
            {portal.menu.map((item) => {
              const Icone = iconesMenu[item.id] ?? Info;
              return (
                <li key={item.id}>
                  <a href={`#${item.id}`} onClick={() => handleNavClick(item.id)} className={`flex items-center gap-4 py-3 text-lg font-bold no-underline transition-colors ${activeTab === item.id ? 'text-gov-blue' : 'text-gray-400'}`}>
                    <Icone size={22} className={activeTab === item.id ? 'text-gov-gold' : ''} />
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
          const Icone = iconesMenu[item.id] ?? Info;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 py-6 px-5 font-bold text-[10px] tracking-[0.12em] transition-all relative no-underline ${
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

function PainelResumo() {
  const resumo = [
    {label: 'Contrato', valor: portal.projeto.contrato, icon: FileText},
    {label: 'Valor total', valor: portal.projeto.valor, icon: WalletCards},
    {label: 'Vigência', valor: portal.projeto.vigencia, icon: Calendar},
    {label: 'Status', valor: portal.projeto.status, icon: CheckCircle2},
  ];

  return (
    <section id="dados" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {resumo.map((item) => (
        <div key={item.label} className="bg-white border border-gray-100 rounded-xl p-5 shadow-bento">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item.label}</p>
              <p className="mt-2 text-lg font-black text-gov-blue leading-tight">{item.valor}</p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-gov-blue/5 text-gov-blue flex items-center justify-center">
              <item.icon size={21} />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

function SecaoVisaoGeral() {
  return (
    <motion.section id="visao" initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} className="bento-card">
      <div className="flex items-center justify-between mb-6 gap-4">
        <h2 className="text-gov-blue text-2xl font-black flex items-center gap-3">
          <Info size={28} className="text-gov-gold" /> Visão Geral
        </h2>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{portal.apresentacao.rotulo}</span>
      </div>
      <div className="space-y-6 text-gov-gray-dark leading-relaxed">
        <p className="text-xl font-semibold text-gov-blue/90 border-l-4 border-gov-gold pl-6 py-2 bg-gov-gold/5 rounded-r-lg">{portal.apresentacao.destaque}</p>
        {portal.apresentacao.paragrafos.map((paragrafo) => (
          <p key={paragrafo}>{paragrafo}</p>
        ))}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {portal.apresentacao.cards.map((card) => (
            <div key={card.titulo} className="p-5 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="font-bold text-gov-blue mb-2 flex items-center gap-2 text-base">
                {card.icone === 'dados' ? <Database size={18} className="text-gov-gold" /> : <Layers size={18} className="text-gov-gold" />}
                {card.titulo}
              </h3>
              <p className="text-sm opacity-80">{card.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function SecaoMetas() {
  return (
    <motion.section id="metas" initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} className="bento-card">
      <h2 className="text-gov-blue text-2xl font-black mb-8 flex items-center gap-3">
        <Target size={28} className="text-gov-gold" /> Metas e Cronograma
      </h2>
      <div className="mb-8 p-6 bg-gov-blue/5 rounded-xl border border-gov-blue/10">
        <h3 className="text-gov-blue font-black text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
          <ArrowUpRight size={16} className="text-gov-gold" /> Objetivo Geral
        </h3>
        <p className="text-gov-gray-dark font-medium leading-relaxed">{portal.objetivoGeral}</p>
      </div>
      <div className="space-y-5">
        {metas.map((meta) => (
          <div key={meta.id} className="group p-5 border border-gray-100 rounded-xl bg-white hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gov-blue/5 rounded-xl flex items-center justify-center text-gov-blue font-bold group-hover:bg-gov-blue group-hover:text-white transition-colors shrink-0">{meta.id}</div>
                <div>
                  <h3 className="font-black text-gov-blue leading-tight">{meta.titulo}</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">{meta.periodo}</p>
                </div>
              </div>
              <span className={`text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase w-fit ${statusClass(meta.status)}`}>{meta.status}</span>
            </div>
            <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-2 list-none p-0">
              {meta.detalhes.map((detail) => (
                <li key={detail} className="text-[12px] text-gray-500 flex items-start gap-2">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gov-gold shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

function SecaoFinanceiro() {
  const total = orcamento.reduce((acc, item) => acc + item.valor, 0);

  return (
    <motion.section id="financeiro" initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} className="bento-card">
      <h2 className="text-gov-blue text-2xl font-black mb-4 flex items-center gap-3">
        <WalletCards size={28} className="text-gov-gold" /> Execução Financeira
      </h2>
      <p className="text-sm text-gray-500 mb-8">{portal.financeiro.texto}</p>
      <div className="space-y-4">
        {orcamento.map((item) => {
          const percentual = Math.round((item.valor / total) * 100);
          return (
            <div key={item.rubrica}>
              <div className="flex justify-between gap-4 text-sm font-bold mb-2">
                <span className="text-gov-blue">{item.rubrica}</span>
                <span className="text-gray-500">{formatCurrency(item.valor)}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gov-light-blue" style={{width: `${percentual}%`}} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 p-4 rounded-xl bg-gov-gold/10 border border-gov-gold/20 text-xs text-gov-blue font-semibold leading-relaxed">{portal.financeiro.observacao}</div>
    </motion.section>
  );
}

function SecaoEntregas() {
  return (
    <motion.section initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} className="bento-card bg-gov-blue/5 border-gov-blue/10">
      <h2 className="text-gov-blue text-2xl font-black mb-8 flex items-center gap-3">
        <ArrowUpRight size={28} className="text-gov-gold" /> Entregas e Resultados Esperados
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {portal.resultadosEsperados.map((resultado) => (
          <div key={resultado.titulo} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="mt-1 text-gov-gold">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <h3 className="font-bold text-gov-blue text-sm">{resultado.titulo}</h3>
              <p className="text-xs text-gray-500">{resultado.descricao}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

function SecaoLevantamento() {
  return (
    <motion.section id="levantamento" initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} className="bento-card">
      <h2 className="text-gov-blue text-2xl font-black mb-4 flex items-center gap-3">
        <Database size={28} className="text-gov-gold" /> Levantamento Exploratório
      </h2>
      <p className="text-sm text-gray-500 mb-8">{levantamento.descricao}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {levantamento.eixos.map((eixo) => (
          <div key={eixo.titulo} className="p-4 border border-gray-100 rounded-xl bg-gray-50">
            <h3 className="font-black text-gov-blue text-sm mb-2 flex items-center gap-2">
              <Filter size={15} className="text-gov-gold" /> {eixo.titulo}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">{eixo.descricao}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

function SecaoAtualizacoes() {
  return (
    <motion.section id="atualizacoes" initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} className="bento-card border-dashed border-2 border-gov-blue/20 bg-gov-blue/[0.02]">
      <h2 className="text-gov-blue text-2xl font-black mb-8 flex items-center gap-3">
        <Clock size={28} className="text-gov-gold" /> Atualizações do Projeto
      </h2>
      <div className="space-y-6">
        {atualizacoes.map((update) => (
          <div key={`${update.data}-${update.titulo}`} className="flex gap-6 items-start">
            <div className="text-[10px] font-black text-gov-blue bg-gov-blue/10 px-3 py-2 rounded-lg whitespace-nowrap">{update.data}</div>
            <div className="flex-grow pb-6 border-b border-gray-100 last:border-0">
              <h3 className="font-bold text-gov-blue mb-2">{update.titulo}</h3>
              <p className="text-sm text-gray-500">{update.descricao}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

function CardDadosOficiais() {
  const dados = [
    ['Processo SEI', portal.projeto.processoSei],
    ['UASG', portal.projeto.uasg],
    ['Base legal', portal.projeto.baseLegal],
    ['Publicação', portal.projeto.publicacao],
  ];

  return (
    <motion.section id="dados-oficiais" initial={{opacity: 0, x: 20}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}} className="bento-card bg-gov-blue text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gov-gold/10 rounded-full -mr-16 -mt-16 blur-2xl" />
      <h2 className="text-lg font-black mb-8 flex items-center gap-3 text-gov-gold relative z-10">
        <FileText size={22} /> Dados Oficiais
      </h2>
      <div className="space-y-5 relative z-10">
        {dados.map(([label, value]) => (
          <div key={label} className="p-4 bg-white/10 rounded-xl">
            <p className="text-[9px] uppercase font-black tracking-widest opacity-50 mb-1">{label}</p>
            <p className="text-sm font-bold leading-tight">{value}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

function CardGovernanca() {
  return (
    <motion.section initial={{opacity: 0, x: 20}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}} className="bento-card">
      <h2 className="text-gov-blue font-black text-lg mb-8 flex items-center gap-3">
        <Globe size={22} className="text-gov-gold" /> Governança
      </h2>
      <div className="space-y-6">
        <LinhaGovernanca titulo="Contratante" texto={portal.projeto.instituicao} icon={ShieldCheck} />
        <LinhaGovernanca titulo="Fundação de apoio" texto={portal.projeto.gestora} icon={Users} />
        <LinhaGovernanca titulo="Coordenação" texto={portal.projeto.coordenador} icon={BookOpen} />
        <div className="p-4 bg-gov-gold/5 border border-gov-gold/20 rounded-xl">
          <p className="text-[10px] font-bold text-gov-blue/60 uppercase tracking-tighter mb-2">Apoio Institucional</p>
          <p className="text-xs font-bold text-gov-blue leading-tight">{portal.projeto.apoio}</p>
        </div>
      </div>
    </motion.section>
  );
}

function LinhaGovernanca({titulo, texto, icon: Icone}: {titulo: string; texto: string; icon: LucideIcon}) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="w-12 h-12 bg-gov-blue/5 rounded-xl flex items-center justify-center text-gov-blue group-hover:bg-gov-blue group-hover:text-white transition-all">
        <Icone size={20} />
      </div>
      <div>
        <p className="text-[9px] uppercase font-black text-gray-400">{titulo}</p>
        <p className="text-sm font-black text-gov-blue">{texto}</p>
      </div>
    </div>
  );
}

function SecaoDocumentos() {
  return (
    <motion.section id="documentos" initial={{opacity: 0, x: 20}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}} className="bento-card">
      <h2 className="text-gov-blue font-black text-lg mb-6 flex items-center gap-3">
        <Download size={22} className="text-gov-gold" /> Documentos
      </h2>
      <div className="space-y-3">
        {documentos.map((doc) => (
          <a key={doc.titulo} href={doc.caminho || '#documentos'} className="block p-4 border border-gray-100 rounded-xl no-underline hover:bg-gray-50 transition-colors">
            <div className="flex justify-between gap-3">
              <div>
                <h3 className="text-sm font-black text-gov-blue">{doc.titulo}</h3>
                <p className="text-[11px] text-gray-500 mt-1">{doc.descricao}</p>
              </div>
              {doc.caminho ? <ExternalLink size={15} className="text-gov-gold shrink-0" /> : <span className="text-[9px] font-black text-gray-400 uppercase">A publicar</span>}
            </div>
          </a>
        ))}
      </div>
    </motion.section>
  );
}

function SecaoEquipe({
  buscaEquipe,
  equipeFiltrada,
  setBuscaEquipe,
}: {
  buscaEquipe: string;
  equipeFiltrada: typeof equipe;
  setBuscaEquipe: (value: string) => void;
}) {
  return (
    <motion.section id="equipe" initial={{opacity: 0, x: 20}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}} className="bento-card">
      <h2 className="text-gov-blue font-black text-lg mb-6 flex items-center gap-3">
        <Users size={22} className="text-gov-gold" /> Equipe
      </h2>
      <p className="text-[11px] text-gray-500 mb-5">{portal.equipeObservacao}</p>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-gov-blue/10 transition-all"
          placeholder="Filtrar equipe..."
          value={buscaEquipe}
          onChange={(e) => setBuscaEquipe(e.target.value)}
        />
      </div>
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {equipeFiltrada.map((member) => (
            <motion.div key={member.nome} layout initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="p-3 border border-gray-50 rounded-xl hover:bg-gray-50 transition-colors">
           <div className="flex items-start justify-between gap-3">
  <div>
    <h3 className="font-bold text-xs text-gov-blue">{member.nome}</h3>
    <p className="text-[9px] text-gray-400 font-medium">{member.funcao}</p>
  </div>

  {member.lattes && (
    <a
      href={member.lattes}
      target="_blank"
      rel="noreferrer"
      className="text-[9px] font-black uppercase tracking-widest text-gov-blue hover:text-gov-light-blue no-underline"
    >
      Lattes
    </a>
  )}
</div>

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
        <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl group no-underline shadow-sm hover:shadow-md transition-all">
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
          <img src={portal.logoGovernoRodape} alt={portal.textosAlternativos.logoGoverno} className="gov-logo-footer" referrerPolicy="no-referrer" />
          <div className="space-y-2">
            <h2 className="font-black text-2xl tracking-tighter">{portal.rodape.orgao}</h2>
            <p className="text-xs opacity-50 leading-relaxed max-w-xs">{portal.rodape.descricao}</p>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="font-black text-sm text-gov-gold uppercase tracking-[0.2em]">{portal.rodape.localizacaoTitulo}</h2>
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
          <div className="p-8 bg-white/5 rounded-2xl border border-white/10 text-center backdrop-blur-xl">
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

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(value);
}
