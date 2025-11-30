import React, { useState } from 'react';
import { practiceProblems, Problem } from '../data/curriculum';
import { CheckCircle, XCircle, HelpCircle, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../context/ProgressContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Practice: React.FC = () => {
  const { currentTeam } = useTheme();
  const { addPoints, updateAccuracy } = useProgress();
  const [activeDifficulty, setActiveDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<Record<string, 'correct' | 'incorrect' | null>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const filteredProblems = practiceProblems.filter(p => p.difficulty === activeDifficulty);

  const checkAnswer = (problem: Problem) => {
    const userAnswer = answers[problem.id]?.trim().replace(',', '.');
    if (!userAnswer) return;

    const isCorrect = 
      parseFloat(userAnswer) === parseFloat(problem.answer.toString()) ||
      userAnswer.toLowerCase() === problem.answer.toString().toLowerCase();

    if (results[problem.id] === undefined) {
      updateAccuracy(isCorrect);
      if (isCorrect) addPoints(3);
    }

    setResults(prev => ({ ...prev, [problem.id]: isCorrect ? 'correct' : 'incorrect' }));
    if (isCorrect) {
      setExpanded(prev => ({ ...prev, [problem.id]: true }));
    }
  };

  const toggleExpand = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const difficultyLabels = {
    easy: 'Rozgrzewka',
    medium: 'Mecz Ligowy',
    hard: 'Liga Mistrzów'
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold">Trening</h1>
        
        <div className="flex glass p-1 rounded-xl border border-white/10 w-full md:w-auto">
          {(['easy', 'medium', 'hard'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => setActiveDifficulty(diff)}
              className={`px-4 py-2 rounded-lg capitalize transition-all text-sm md:text-base whitespace-nowrap flex-1 md:flex-none ${
                activeDifficulty === diff 
                  ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white shadow-lg' 
                  : 'text-[var(--color-text-muted)] hover:text-white'
              }`}
            >
              {difficultyLabels[diff]}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {filteredProblems.map((problem, idx) => {
            const result = results[problem.id];
            const isExpanded = expanded[problem.id];

            return (
              <motion.div 
                key={problem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="card p-0 overflow-hidden border-l-4 border-l-[var(--color-accent)]"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full mb-3 text-white">
                        {problem.team}
                      </span>
                      <h3 className="text-lg font-medium leading-relaxed">{problem.question}</h3>
                    </div>
                    {result === 'correct' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="shrink-0"
                      >
                        <CheckCircle className="text-green-500" size={28} />
                      </motion.div>
                    )}
                    {result === 'incorrect' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="shrink-0"
                      >
                        <XCircle className="text-red-500" size={28} />
                      </motion.div>
                    )}
                  </div>

                  {problem.options ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {problem.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            if (result === 'correct') return;
                            setAnswers(prev => ({ ...prev, [problem.id]: opt }));
                            const isCorrect = opt === problem.answer;
                            
                            if (results[problem.id] === undefined) {
                              updateAccuracy(isCorrect);
                              if (isCorrect) addPoints(3);
                            }

                            setResults(prev => ({ ...prev, [problem.id]: isCorrect ? 'correct' : 'incorrect' }));
                            if (isCorrect) setExpanded(prev => ({ ...prev, [problem.id]: true }));
                          }}
                          className={`p-4 rounded-lg border text-left transition-all ${
                            answers[problem.id] === opt 
                              ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10' 
                              : 'border-white/10 hover:bg-white/5'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Twoja odpowiedź..."
                        value={answers[problem.id] || ''}
                        onChange={(e) => setAnswers(prev => ({ ...prev, [problem.id]: e.target.value }))}
                        onKeyDown={(e) => e.key === 'Enter' && checkAnswer(problem)}
                        disabled={result === 'correct'}
                        className="flex-1 glass-dark border border-white/10 rounded-lg px-4 py-3 focus:border-[var(--color-primary)] outline-none transition-colors text-lg"
                      />
                      <button
                        onClick={() => checkAnswer(problem)}
                        disabled={!answers[problem.id] || result === 'correct'}
                        className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white px-6 py-3 rounded-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                      >
                        Sprawdź
                      </button>
                    </div>
                  )}
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/10 glass-dark overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="flex items-center gap-2 font-bold mb-3 text-[var(--color-accent)] text-lg">
                          <HelpCircle size={20} /> Wyjaśnienie Trenera
                        </div>
                        <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">{problem.explanation}</p>
                        <div className="font-mono text-sm glass p-4 rounded-lg border border-white/5">
                          <span className="text-[var(--color-text-muted)]">Odpowiedź:</span> <span className="text-[var(--color-accent)] font-bold">{problem.answer} {problem.unit}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              
                {result && !isExpanded && (
                  <button 
                    onClick={() => toggleExpand(problem.id)}
                    className="w-full py-3 text-xs text-center text-[var(--color-text-muted)] hover:bg-white/5 transition-colors flex items-center justify-center gap-1 border-t border-white/10"
                  >
                    Pokaż wyjaśnienie <ChevronDown size={14} />
                  </button>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
