import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PenTool, Trophy, ChevronRight, Target, Award, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../context/ProgressContext';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  const { currentTeam } = useTheme();
  const { points, matchesPlayed, accuracy } = useProgress();

  const teamGreeting = {
    Barcelona: 'Visca Barça!',
    Arsenal: 'Come on you Gunners!',
    Legia: 'Legia to potęga!'
  };

  return (
    <div className="flex flex-col gap-8 py-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="text-sm uppercase tracking-wider text-[var(--color-accent)] font-bold">
          {teamGreeting[currentTeam]}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)]">
          Witaj w Klubie!
        </h1>
        <p className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto">
          Trenuj procenty jak profesjonalista. Przygotuj się do wielkiego meczu!
        </p>
      </motion.div>

      {/* Stats Dashboard */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="glass p-6 rounded-2xl border border-white/10"
      >
        <h3 className="text-lg font-bold mb-6 flex items-center gap-2 justify-center">
          <Trophy className="text-[var(--color-accent)]" size={24} />
          Statystyki Sezonu
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center p-4 rounded-xl bg-white/5"
          >
            <Target className="text-[var(--color-primary)] mb-2" size={28} />
            <div className="text-3xl font-bold text-[var(--color-accent)]">{matchesPlayed}</div>
            <div className="text-xs text-[var(--color-text-muted)] text-center">Mecze</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center p-4 rounded-xl bg-white/5"
          >
            <Zap className="text-[var(--color-primary)] mb-2" size={28} />
            <div className="text-3xl font-bold text-[var(--color-accent)]">{accuracy}%</div>
            <div className="text-xs text-[var(--color-text-muted)] text-center">Celność</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center p-4 rounded-xl bg-white/5"
          >
            <Award className="text-[var(--color-primary)] mb-2" size={28} />
            <div className="text-3xl font-bold text-[var(--color-accent)]">{points}</div>
            <div className="text-xs text-[var(--color-text-muted)] text-center">Punkty</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Mode Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/tutorial" className="block group">
            <div className="card group-hover:border-[var(--color-primary)] transition-all group-hover:-translate-y-2 h-full">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform mx-auto">
                <BookOpen size={32} />
              </div>
              <h2 className="text-xl font-bold mb-2 text-center">Samouczek</h2>
              <p className="text-[var(--color-text-muted)] text-sm mb-4 text-center">
                Poznaj podstawy: definicje, obliczenia, przykłady z boiska.
              </p>
              <div className="flex items-center justify-center text-[var(--color-primary)] text-sm font-medium">
                Rozpocznij <ChevronRight size={16} />
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/practice" className="block group">
            <div className="card group-hover:border-[var(--color-primary)] transition-all group-hover:-translate-y-2 h-full">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform mx-auto">
                <PenTool size={32} />
              </div>
              <h2 className="text-xl font-bold mb-2 text-center">Trening</h2>
              <p className="text-[var(--color-text-muted)] text-sm mb-4 text-center">
                20 zadań o różnej trudności. Zdobywaj punkty!
              </p>
              <div className="flex items-center justify-center text-[var(--color-primary)] text-sm font-medium">
                Na boisko <ChevronRight size={16} />
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/test" className="block group">
            <div className="card group-hover:border-[var(--color-primary)] transition-all group-hover:-translate-y-2 h-full">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform mx-auto">
                <Trophy size={32} />
              </div>
              <h2 className="text-xl font-bold mb-2 text-center">Sprawdzian</h2>
              <p className="text-[var(--color-text-muted)] text-sm mb-4 text-center">
                Mecz o wszystko. 10 pytań, 15 minut. Pokaż klasę!
              </p>
              <div className="flex items-center justify-center text-[var(--color-primary)] text-sm font-medium">
                Graj mecz <ChevronRight size={16} />
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
