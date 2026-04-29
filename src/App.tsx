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
