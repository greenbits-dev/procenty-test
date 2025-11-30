import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Team } from '../data/curriculum';
import { Trophy, BookOpen, PenTool, LayoutDashboard } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { currentTeam, setTeam } = useTheme();
    const location = useLocation();

    const teams: Team[] = ['Barcelona', 'Arsenal', 'Legia'];

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen flex flex-col w-full">
            <header className="p-4 border-b border-white/10 bg-[var(--color-surface)] sticky top-0 z-10">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <Link to="/" className="text-2xl font-bold flex items-center gap-2 text-[var(--color-primary)]">
                        <Trophy className="w-8 h-8" />
                        <span>Procenty</span>
                    </Link>

                    <nav className="flex items-center gap-2 bg-black/20 p-1 rounded-lg">
                        <Link
                            to="/"
                            className={`px-3 py-2 rounded-md transition-colors ${isActive('/') ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-white/5'}`}
                        >
                            <LayoutDashboard size={20} />
                        </Link>
                        <Link
                            to="/tutorial"
                            className={`px-3 py-2 rounded-md transition-colors ${isActive('/tutorial') ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-white/5'}`}
                        >
                            <BookOpen size={20} />
                        </Link>
                        <Link
                            to="/practice"
                            className={`px-3 py-2 rounded-md transition-colors ${isActive('/practice') ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-white/5'}`}
                        >
                            <PenTool size={20} />
                        </Link>
                        <Link
                            to="/test"
                            className={`px-3 py-2 rounded-md transition-colors ${isActive('/test') ? 'bg-[var(--color-primary)] text-white' : 'hover:bg-white/5'}`}
                        >
                            <Trophy size={20} />
                        </Link>
                    </nav>

                    <div className="flex gap-2">
                        {teams.map(team => (
                            <button
                                key={team}
                                onClick={() => setTeam(team)}
                                className={`px-3 py-1 text-xs rounded-full border transition-all ${currentTeam === team
                                        ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white'
                                        : 'bg-transparent border-white/20 hover:border-white/50'
                                    }`}
                            >
                                {team}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full max-w-5xl mx-auto p-4">
                {children}
            </main>

            <footer className="p-4 text-center text-sm text-[var(--color-text-muted)]">
                <p>Matematyka dla Kibica • Klasa 7</p>
            </footer>
        </div>
    );
};
