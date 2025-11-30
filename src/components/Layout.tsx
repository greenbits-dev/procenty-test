import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Team } from '../data/curriculum';
import { Trophy, BookOpen, PenTool, Home as HomeIcon } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentTeam, setTeam } = useTheme();
  const location = useLocation();

  const teams: Team[] = ['Barcelona', 'Arsenal', 'Legia'];

  const isActive = (path: string) => location.pathname === path;

  const getBackgroundImage = () => {
    switch (currentTeam) {
      case 'Barcelona':
        return '/assets/bg-barcelona.png';
      case 'Arsenal':
        return '/assets/bg-arsenal.png';
      case 'Legia':
        return '/assets/bg-legia.png';
      default:
        return '/assets/bg-barcelona.png';
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
      <header className="p-4 border-b border-white/10 glass-dark sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2 text-[var(--color-primary)]">
            <Trophy className="w-8 h-8" />
            <span>Procenty</span>
          </Link>
          
          <div className="flex gap-2">
            {teams.map(team => (
              <button
                key={team}
                onClick={() => setTeam(team)}
                className={`px-3 py-1 text-xs rounded-full border transition-all ${
                  currentTeam === team 
                    ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white shadow-lg' 
                    : 'bg-transparent border-white/20 hover:border-white/50'
                }`}
              >
                {team}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto p-4 pb-24 md:pb-4">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-dark border-t border-white/10 md:hidden z-20">
        <div className="flex justify-around items-center h-16 max-w-5xl mx-auto">
          <Link 
            to="/" 
            className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
              isActive('/') ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'
            }`}
          >
            <HomeIcon size={24} />
            <span className="text-xs">Główna</span>
          </Link>
          <Link 
            to="/tutorial" 
            className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
              isActive('/tutorial') ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'
            }`}
          >
            <BookOpen size={24} />
            <span className="text-xs">Nauka</span>
          </Link>
          <Link 
            to="/practice" 
            className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
              isActive('/practice') ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'
            }`}
          >
            <PenTool size={24} />
            <span className="text-xs">Trening</span>
          </Link>
          <Link 
            to="/test" 
            className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
              isActive('/test') ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'
            }`}
          >
            <Trophy size={24} />
            <span className="text-xs">Mecz</span>
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
