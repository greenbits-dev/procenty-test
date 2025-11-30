import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Team } from '../data/curriculum';
import { Trophy, BookOpen, PenTool, Home as HomeIcon } from 'lucide-react';
import bgBarcelona from '../assets/bg-barcelona.png';
import bgArsenal from '../assets/bg-arsenal.png';
import bgLegia from '../assets/bg-legia.png';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentTeam, setTeam } = useTheme();
  const location = useLocation();

  const teams: Team[] = ['Barcelona', 'Arsenal', 'Legia'];

  const isActive = (path: string) => location.pathname === path;

  const getBackgroundImage = () => {
    switch (currentTeam) {
      case 'Barcelona':
        return bgBarcelona;
      case 'Arsenal':
        return bgArsenal;
      case 'Legia':
        return bgLegia;
      default:
        return bgBarcelona;
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full relative">
      {/* Background Image */}
      <div 
        className="bg-overlay"
        style={{ backgroundImage: `url(${getBackgroundImage()})` }}
      />

      {/* Header */}
      <header className="p-3 md:p-4 border-b border-white/10 glass-dark sticky top-0 z-10">
        <div className="max-w-5xl mx-auto">
          {/* Mobile: Stacked layout */}
          <div className="flex md:hidden flex-col gap-3">
            <Link to="/" className="text-xl font-bold flex items-center gap-2 text-[var(--color-primary)] self-start">
              <Trophy className="w-6 h-6" />
              <span>Procenty</span>
            </Link>
            <div className="flex gap-2 w-full">
              {teams.map(team => (
                <button
                  key={team}
                  onClick={() => setTeam(team)}
                  className={`flex-1 px-4 py-2 text-sm font-bold rounded-lg border-2 transition-all ${
                    currentTeam === team 
                      ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-lg scale-105' 
                      : 'bg-white/10 border-white/30 text-white hover:border-white/60'
                  }`}
                >
                  {team}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop: Horizontal layout */}
          <div className="hidden md:flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold flex items-center gap-2 text-[var(--color-primary)]">
              <Trophy className="w-8 h-8" />
              <span>Procenty</span>
            </Link>
            
            <div className="flex gap-2">
              {teams.map(team => (
                <button
                  key={team}
                  onClick={() => setTeam(team)}
                  className={`px-4 py-2 text-sm font-bold rounded-lg border-2 transition-all ${
                    currentTeam === team 
                      ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-lg' 
                      : 'bg-white/10 border-white/30 text-white hover:border-white/60'
                  }`}
                >
                  {team}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto p-4 pb-24 md:pb-4">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-dark border-t border-white/10 md:hidden z-20 safe-area-inset-bottom">
        <div className="flex justify-around items-center h-16 max-w-5xl mx-auto px-2">
          <Link 
            to="/" 
            className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors min-w-0 ${
              isActive('/') ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'
            }`}
          >
            <HomeIcon size={22} />
            <span className="text-xs font-medium">Główna</span>
          </Link>
          <Link 
            to="/tutorial" 
            className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors min-w-0 ${
              isActive('/tutorial') ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'
            }`}
          >
            <BookOpen size={22} />
            <span className="text-xs font-medium">Nauka</span>
          </Link>
          <Link 
            to="/practice" 
            className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors min-w-0 ${
              isActive('/practice') ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'
            }`}
          >
            <PenTool size={22} />
            <span className="text-xs font-medium">Trening</span>
          </Link>
          <Link 
            to="/test" 
            className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors min-w-0 ${
              isActive('/test') ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'
            }`}
          >
            <Trophy size={22} />
            <span className="text-xs font-medium">Mecz</span>
          </Link>
        </div>
      </nav>

      {/* Desktop Footer */}
      <footer className="p-4 text-center text-sm text-[var(--color-text-muted)] hidden md:block">
        <p>Matematyka dla Kibica • Klasa 7</p>
      </footer>
    </div>
  );
};
