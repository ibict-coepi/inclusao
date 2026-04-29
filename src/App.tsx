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
