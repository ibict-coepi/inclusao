import {useEffect, useMemo, useState} from 'react';
import type {LucideIcon} from 'lucide-react';
import {
  ArrowUpRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
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

const sections = [
  {id: 'visao', label: 'Apresentação', desc: 'Visão geral e contexto', icon: Info, color: 'from-blue-500 to-indigo-600'},
  {id: 'dados', label: 'Dados oficiais', desc: 'Contrato, valor e vigência', icon: FileText, color: 'from-indigo-500 to-purple-600'},
  {id: 'metas', label: 'Metas', desc: 'Cronograma e escopo', icon: Target, color: 'from-purple-500 to-pink-600'},
  {id: 'financeiro', label: 'Orçamento', desc: 'Rubricas previstas', icon: WalletCards, color: 'from-pink-500 to-rose-600'},
  {id: 'documentos', label: 'Documentos', desc: 'Comprovação pública', icon: Download, color: 'from-rose-500 to-orange-600'},
  {id: 'pesquisa', label: 'Pesquisa', desc: 'Levantamento exploratório', icon: Database, color: 'from-orange-500 to-amber-600'},
  {id: 'equipe', label: 'Equipe', desc: 'Participantes públicos', icon: Users, color: 'from-amber-500 to-yellow-600'},
  {id: 'atualizacoes', label: 'Atualizações', desc: 'Linha do tempo', icon: Clock, color: 'from-emerald-500 to-teal-700'},
];

const topLinks = [
  {label: 'Acesso à informação', href: 'https://www.gov.br/acessoainformacao/pt-br'},
  {label: 'Participe', href: 'https://www.gov.br/pt-br/participacao-social'},
  {label: 'Legislação', href: 'https://www.gov.br/governodigital/pt-br/legislacao'},
  {label: 'Órgãos do Governo', href: 'https://www.gov.br/pt-br/orgaos-do-governo'},
];

export default function App() {
  const [activeSection, setActiveSection] = useState('visao');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [teamFilter, setTeamFilter] = useState('');

  useEffect(() => {
    if (window.location.hash) {
      setActiveSection(window.location.hash.substring(1));
    }
  }, []);

  const filteredTeam = useMemo(() => {
    const query = teamFilter.toLowerCase();
    return equipe.filter((person) => person.nome.toLowerCase().includes(query) || person.funcao.toLowerCase().includes(query));
  }, [teamFilter]);

  const goTo = (id: string) => {
    setActiveSection(id);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} goTo={goTo} activeSection={activeSection} />
      <AnimatePresence>
        {isMenuOpen && <MobileMenu activeSection={activeSection} goTo={goTo} />}
      </AnimatePresence>

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Hero />
        <div className="flex flex-col lg:flex-row gap-8 items-start mt-12">
          <SideNav activeSection={activeSection} goTo={goTo} />
          <div className="flex-1 space-y-10 min-w-0">
            <VisaoGeral />
            <DadosOficiais />
            <Metas />
            <Financeiro />
            <Documentos />
            <Pesquisa />
            <Equipe filteredTeam={filteredTeam} teamFilter={teamFilter} setTeamFilter={setTeamFilter} />
            <Atualizacoes />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Header({
  isMenuOpen,
  setIsMenuOpen,
  activeSection,
  goTo,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  activeSection: string;
  goTo: (id: string) => void;
}) {
  return (
    <header className="w-full sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
      <div className="bg-gradient-to-r from-[#003399] to-[#0044CC] text-white py-1.5 px-4 text-[10px] sm:text-xs font-semibold tracking-wide">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="uppercase tracking-wider">Brasil</span>
            {topLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="font-normal opacity-75 hidden sm:inline hover:opacity-100 transition-opacity">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="#visao" onClick={() => goTo('visao')} className="group flex items-center gap-4 no-underline">
            <img src={portal.logoGovernoCabecalho} alt={portal.textosAlternativos.logoGoverno} className="h-12 md:h-14 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
            <div className="flex flex-col border-l border-slate-200 pl-4">
              <h1 className="text-[#003399] text-xl md:text-2xl font-bold tracking-tight group-hover:text-[#0044CC] transition-colors leading-none">Portal IBICT</h1>
              <p className="text-slate-500 text-[10px] md:text-xs font-medium tracking-tight uppercase mt-1">Transparência ativa do projeto</p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {sections.slice(0, 5).map((item) => {
              const selected = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => goTo(item.id)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 no-underline ${selected ? 'text-[#003399] bg-blue-50' : 'text-slate-600 hover:text-[#003399] hover:bg-slate-50'}`}
                >
                  {item.label}
                  {selected && <motion.span layoutId="nav-pill" className="absolute inset-0 bg-blue-100/50 rounded-full -z-10" transition={{type: 'spring', bounce: 0.2, duration: 0.6}} />}
                </a>
              );
            })}
          </nav>

          <button className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Abrir menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function MobileMenu({activeSection, goTo}: {activeSection: string; goTo: (id: string) => void}) {
  return (
    <motion.div initial={{height: 0, opacity: 0}} animate={{height: 'auto', opacity: 1}} exit={{height: 0, opacity: 0}} className="md:hidden bg-white border-b border-slate-200 overflow-hidden sticky top-[101px] z-40">
      <div className="px-4 py-4 space-y-1">
        {sections.map((item) => (
          <a key={item.id} href={`#${item.id}`} onClick={() => goTo(item.id)} className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors no-underline ${activeSection === item.id ? 'bg-blue-50 text-[#003399]' : 'text-slate-600 hover:bg-slate-50 hover:text-[#003399]'}`}>
            {item.label}
          </a>
        ))}
      </div>
    </motion.div>
  );
}

function Hero() {
  const heroStats = [
    {label: 'Contrato', value: portal.projeto.contrato},
    {label: 'Valor', value: portal.projeto.valor},
    {label: 'Vigência', value: portal.projeto.vigencia},
  ];

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#003399] via-[#002266] to-[#001133] text-white p-8 md:p-16 shadow-2xl ring-1 ring-white/10">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,.14)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="relative z-10 grid lg:grid-cols-[1.5fr_.8fr] gap-10 items-end">
        <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.8, ease: 'easeOut'}}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-300 animate-pulse" />
            {portal.selo}
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200">
            {portal.projeto.nome}
          </h2>
          <p className="text-blue-100/90 text-lg md:text-2xl leading-relaxed max-w-3xl font-light">{portal.apresentacao.destaque}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#dados" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-[#003399] font-bold text-sm no-underline hover:bg-blue-50 transition-colors">
              Ver dados oficiais <ChevronRight size={17} />
            </a>
            <a href="#documentos" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/25 text-white font-bold text-sm no-underline hover:bg-white/10 transition-colors">
              Documentos <Download size={17} />
            </a>
          </div>
        </motion.div>
        <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.8, delay: 0.15, ease: 'easeOut'}} className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-5">
          <p className="text-xs uppercase tracking-widest font-bold text-blue-100/70 mb-4">Resumo público</p>
          <div className="space-y-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="flex items-center justify-between gap-4 rounded-2xl bg-white/10 px-4 py-3">
                <span className="text-sm text-blue-100/75">{stat.label}</span>
                <strong className="text-sm text-white text-right">{stat.value}</strong>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SideNav({activeSection, goTo}: {activeSection: string; goTo: (id: string) => void}) {
  return (
    <aside className="w-full lg:w-80 shrink-0 sticky top-28 z-30">
      <nav className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 px-1 lg:px-0 bg-slate-50/80 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none py-4 lg:py-0 rounded-2xl lg:rounded-none border lg:border-none border-slate-200/50">
        {sections.map((item) => {
          const Icon = item.icon;
          const selected = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => goTo(item.id)}
              className={`group relative flex-shrink-0 flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300 overflow-hidden min-w-[260px] lg:w-full no-underline ${
                selected ? 'bg-white shadow-lg shadow-blue-900/5 ring-1 ring-blue-100' : 'hover:bg-white hover:shadow-md'
              }`}
            >
              <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} text-white shadow-sm`}>
                <Icon size={20} />
              </div>
              <div>
                <div className={`font-bold text-sm ${selected ? 'text-[#003399]' : 'text-slate-800'}`}>{item.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
              </div>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}

function Panel({id, icon: Icon, title, kicker, children}: {id: string; icon: LucideIcon; title: string; kicker: string; children: React.ReactNode}) {
  return (
    <motion.section id={id} initial={{opacity: 0, y: 18}} whileInView={{opacity: 1, y: 0}} viewport={{once: true, margin: '-80px'}} className="scroll-mt-32 bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6 md:p-8">
      <div className="flex items-start gap-4 mb-8">
        <div className="p-3 rounded-2xl bg-blue-50 text-[#003399]">
          <Icon size={24} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{kicker}</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mt-1">{title}</h2>
        </div>
      </div>
      {children}
    </motion.section>
  );
}

function VisaoGeral() {
  const evidence = [
    {label: 'Metas do plano', value: metas.length.toString(), icon: Target},
    {label: 'Documentos mapeados', value: documentos.length.toString(), icon: FileText},
    {label: 'Rubricas previstas', value: orcamento.length.toString(), icon: WalletCards},
  ];

  return (
    <Panel id="visao" icon={Info} title="Apresentação do projeto" kicker="Contexto">
      <div className="space-y-6">
        <div className="grid sm:grid-cols-3 gap-4">
          {evidence.map((item) => (
            <MetricCard key={item.label} label={item.label} value={item.value} icon={item.icon} />
          ))}
        </div>
        {portal.apresentacao.paragrafos.map((paragraph) => (
          <p key={paragraph} className="text-slate-600 leading-relaxed text-lg border-l-4 border-slate-100 pl-4">
            {paragraph}
          </p>
        ))}
        <div className="grid md:grid-cols-2 gap-4">
          {portal.apresentacao.cards.map((card) => (
            <div key={card.titulo} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                {card.icone === 'dados' ? <Database size={18} className="text-[#003399]" /> : <Layers size={18} className="text-[#003399]" />}
                {card.titulo}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">{card.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function DadosOficiais() {
  const officialData = [
    {label: 'Contrato', value: portal.projeto.contrato},
    {label: 'Valor total', value: portal.projeto.valor},
    {label: 'Vigência', value: portal.projeto.vigencia},
    {label: 'Status', value: portal.projeto.status},
    {label: 'Processo SEI', value: portal.projeto.processoSei},
    {label: 'UASG', value: portal.projeto.uasg},
    {label: 'Base legal', value: portal.projeto.baseLegal},
    {label: 'Publicação', value: portal.projeto.publicacao},
  ];

  return (
    <Panel id="dados" icon={FileText} title="Dados oficiais" kicker="Contrato e governança">
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {officialData.map((item) => (
          <DataTile key={item.label} label={item.label} value={item.value} />
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <GovernanceItem label="Contratante" value={portal.projeto.instituicao} icon={ShieldCheck} />
        <GovernanceItem label="Fundação de apoio" value={portal.projeto.gestora} icon={Users} />
        <GovernanceItem label="Coordenação" value={portal.projeto.coordenador} icon={BookOpen} />
      </div>
    </Panel>
  );
}

function GovernanceItem({label, value, icon: Icon}: {label: string; value: string; icon: LucideIcon}) {
  return (
    <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#003399] text-white">
      <div className="p-3 rounded-xl bg-white/10">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-[10px] uppercase font-black tracking-widest text-blue-100/70">{label}</p>
        <p className="text-sm font-bold leading-tight">{value}</p>
      </div>
    </div>
  );
}

function Metas() {
  const currentMeta = metas.find((meta) => meta.status === 'Em Execução') ?? metas[0];

  return (
    <Panel id="metas" icon={Target} title="Metas e cronograma" kicker="Execução física">
      <p className="text-slate-600 leading-relaxed text-lg border-l-4 border-slate-100 pl-4 mb-8">{portal.objetivoGeral}</p>
      <div className="grid xl:grid-cols-[.8fr_1.2fr] gap-6">
        <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-6">
          <p className="text-xs uppercase tracking-widest font-black text-blue-500 mb-3">Meta em destaque</p>
          <h3 className="text-2xl font-bold text-slate-900">{currentMeta.titulo}</h3>
          <p className="text-sm text-slate-500 mt-2">{currentMeta.periodo}</p>
          <div className="mt-6 space-y-3">
            {currentMeta.detalhes.slice(0, 3).map((detail) => (
              <div key={detail} className="flex gap-3 text-sm text-slate-700">
                <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          {metas.map((meta) => (
            <div key={meta.id} className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-black shadow-sm">{meta.id}</div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">{meta.titulo}</h3>
                    <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mt-1">{meta.periodo}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${statusClass(meta.status)}`}>{meta.status}</span>
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                {meta.detalhes.slice(0, 2).map((detail) => (
                  <div key={detail} className="flex gap-2 text-xs text-slate-600">
                    <CheckCircle2 size={14} className="text-blue-600 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function Financeiro() {
  const total = orcamento.reduce((sum, item) => sum + item.valor, 0);
  const largest = [...orcamento].sort((a, b) => b.valor - a.valor)[0];

  return (
    <Panel id="financeiro" icon={WalletCards} title="Orçamento previsto" kicker="Execução financeira">
      <div className="grid xl:grid-cols-[.75fr_1.25fr] gap-8">
        <div className="rounded-3xl bg-slate-900 text-white p-6">
          <p className="text-xs uppercase tracking-widest font-black text-blue-200/70">Total previsto</p>
          <p className="text-4xl font-black mt-3">{formatCurrency(total)}</p>
          <div className="mt-6 rounded-2xl bg-white/10 p-4">
            <p className="text-xs text-slate-300">Maior rubrica</p>
            <p className="font-bold mt-1">{largest.rubrica}</p>
            <p className="text-blue-100 text-sm mt-1">{formatCurrency(largest.valor)}</p>
          </div>
        </div>
        <div>
          <p className="text-slate-600 leading-relaxed mb-6">{portal.financeiro.texto}</p>
          <div className="space-y-5">
            {orcamento.map((item) => {
              const percentage = Math.round((item.valor / total) * 100);
              return (
                <div key={item.rubrica}>
                  <div className="flex justify-between gap-4 text-sm font-bold mb-2">
                    <span className="text-slate-800">{item.rubrica}</span>
                    <span className="text-[#003399]">{formatCurrency(item.valor)}</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#003399] to-[#0044CC]" style={{width: `${percentage}%`}} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <p className="mt-6 p-4 rounded-2xl bg-blue-50 border border-blue-100 text-sm text-[#003399] font-medium leading-relaxed">{portal.financeiro.observacao}</p>
    </Panel>
  );
}

function Documentos() {
  return (
    <Panel id="documentos" icon={Download} title="Documentos do projeto" kicker="Evidências">
      <div className="grid lg:grid-cols-3 gap-4">
        {documentos.map((doc) => (
          <a key={doc.titulo} href={doc.caminho || '#documentos'} className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all duration-300 no-underline">
            <div className="flex flex-col h-full justify-between gap-4">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#003399] flex items-center justify-center mb-4">
                  <FileText size={18} />
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#003399] transition-colors">{doc.titulo}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{doc.descricao}</p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                {doc.caminho ? <span className="inline-flex items-center gap-2 text-xs font-bold text-[#003399]">Abrir documento <ExternalLink size={14} /></span> : <span className="text-[10px] font-black text-slate-400 uppercase whitespace-nowrap">A publicar</span>}
              </div>
            </div>
          </a>
        ))}
      </div>
    </Panel>
  );
}

function Pesquisa() {
  return (
    <Panel id="pesquisa" icon={Database} title="Levantamento exploratório" kicker="Pesquisa aplicada">
      <p className="text-slate-600 leading-relaxed text-lg border-l-4 border-slate-100 pl-4 mb-8">{levantamento.descricao}</p>
      <div className="grid md:grid-cols-2 gap-4">
        {levantamento.eixos.map((eixo) => (
          <div key={eixo.titulo} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Filter size={17} className="text-[#003399]" />
              {eixo.titulo}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">{eixo.descricao}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function Equipe({
  filteredTeam,
  teamFilter,
  setTeamFilter,
}: {
  filteredTeam: typeof equipe;
  teamFilter: string;
  setTeamFilter: (value: string) => void;
}) {
  return (
    <Panel id="equipe" icon={Users} title="Equipe" kicker="Participação institucional">
      <p className="text-slate-600 leading-relaxed mb-6">{portal.equipeObservacao}</p>
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
          placeholder="Filtrar equipe..."
          value={teamFilter}
          onChange={(event) => setTeamFilter(event.target.value)}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {filteredTeam.map((member) => {
          const lattes = (member as {lattes?: string}).lattes;
          return (
            <div key={member.nome} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex justify-between gap-4">
                <div>
                  <h3 className="font-bold text-slate-900">{member.nome}</h3>
                  <p className="text-sm text-slate-500 mt-1">{member.funcao}</p>
                </div>
                {lattes && (
                  <a href={lattes} target="_blank" rel="noreferrer" className="text-[10px] font-black uppercase tracking-widest text-[#003399] hover:text-blue-700 no-underline">
                    Lattes
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

function Atualizacoes() {
  return (
    <Panel id="atualizacoes" icon={Clock} title="Atualizações" kicker="Acompanhamento público">
      <div className="space-y-5">
        {atualizacoes.map((item) => (
          <div key={`${item.data}-${item.titulo}`} className="relative pl-8 pb-6 border-l border-slate-200 last:pb-0">
            <div className="absolute -left-2 top-1 w-4 h-4 rounded-full bg-[#003399] ring-4 ring-blue-50" />
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">{item.data}</p>
            <h3 className="font-bold text-slate-900 mt-1">{item.titulo}</h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">{item.descricao}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <img src={portal.logoGovernoRodape} alt={portal.textosAlternativos.logoGoverno} className="h-14 w-auto object-contain" referrerPolicy="no-referrer" />
            <h2 className="text-white font-bold text-xl tracking-tight">{portal.rodape.orgao}</h2>
            <p className="text-sm leading-relaxed text-slate-400">{portal.rodape.descricao}</p>
          </div>
          <FooterList title="Navegação" items={sections.slice(0, 4).map((item) => ({label: item.label, href: `#${item.id}`}))} />
          <FooterList
            title="Institucional"
            items={[
              {label: 'Ministério da Ciência, Tecnologia e Inovação', href: 'https://www.gov.br/mcti'},
              {label: 'IBICT Oficial', href: 'https://www.ibict.br'},
              {label: 'Portal da Transparência', href: 'https://portaldatransparencia.gov.br/'},
            ]}
          />
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Contato</h3>
            <address className="text-sm not-italic text-slate-400 leading-relaxed">{portal.rodape.endereco}</address>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-xs text-slate-500 flex flex-col md:flex-row justify-between gap-4">
          <span>{portal.rodape.copyright}</span>
          <span>Atualizado em {portal.projeto.ultimaAtualizacao}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterList({title, items}: {title: string; items: Array<{label: string; href: string}>}) {
  return (
    <div>
      <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">{title}</h3>
      <ul className="space-y-3 text-sm">
        {items.map((item) => (
          <li key={item.label}>
            <a href={item.href} className="hover:text-white transition-colors no-underline" target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function statusClass(status: string) {
  if (status === 'Concluído') return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100';
  if (status === 'Em Execução') return 'bg-blue-50 text-blue-700 ring-1 ring-blue-100';
  return 'bg-slate-100 text-slate-500 ring-1 ring-slate-200';
}

function MetricCard({label, value, icon: Icon}: {label: string; value: string; icon: LucideIcon}) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
          <p className="text-3xl font-black text-[#003399] mt-2">{value}</p>
        </div>
        <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#003399] flex items-center justify-center">
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

function DataTile({label, value}: {label: string; value: string}) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:bg-white hover:shadow-sm transition-all">
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
      <p className="mt-2 text-base font-bold text-slate-900 leading-tight">{value}</p>
    </div>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(value);
}
