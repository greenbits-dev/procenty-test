import React, { useState, useEffect } from 'react';
import { practiceProblems, Problem } from '../data/curriculum';
import { Timer, Trophy, RefreshCw, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Test: React.FC = () => {
  const { addPoints, incrementMatches, updateAccuracy } = useProgress();
  const [status, setStatus] = useState<'intro' | 'active' | 'finished'>('intro');
  const [questions, setQuestions] = useState<Problem[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    if (status === 'active' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && status === 'active') {
      finishTest();
    }
  }, [status, timeLeft]);

  const startTest = () => {
    const shuffled = [...practiceProblems].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 10));
    setStatus('active');
    setTimeLeft(15 * 60);
    setAnswers({});
    setCurrentQuestionIndex(0);
  };

  const finishTest = () => {
    setStatus('finished');
    incrementMatches();
    
    let score = 0;
    questions.forEach(q => {
      const ans = answers[q.id]?.trim().replace(',', '.');
      if (!ans) {
        updateAccuracy(false);
        return;
      }
      const isCorrect = 
        parseFloat(ans) === parseFloat(q.answer.toString()) ||
        ans.toLowerCase() === q.answer.toString().toLowerCase();
      
      updateAccuracy(isCorrect);
      if (isCorrect) {
        score++;
        addPoints(10);
      }
    });
  };

  const handleAnswer = (val: string) => {
    const q = questions[currentQuestionIndex];
    setAnswers(prev => ({ ...prev, [q.id]: val }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      const ans = answers[q.id]?.trim().replace(',', '.');
      if (!ans) return;
      const isCorrect = 
        parseFloat(ans) === parseFloat(q.answer.toString()) ||
        ans.toLowerCase() === q.answer.toString().toLowerCase();
      if (isCorrect) score++;
    });
    return score;
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (status === 'intro') {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white mb-8 shadow-2xl"
        >
          <Trophy size={64} />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Wielki Mecz
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-[var(--color-text-muted)] mb-8 leading-relaxed"
        >
          Masz <span className="text-[var(--color-accent)] font-bold">15 minut</span> na <span className="text-[var(--color-accent)] font-bold">10 pytań</span>.<br />
          Brak podpowiedzi. Wynik końcowy zadecyduje o mistrzostwie.
        </motion.p>
        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startTest}
          className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white text-lg px-10 py-4 rounded-xl hover:brightness-110 transition-all shadow-xl font-bold"
        >
          Rozpocznij Mecz ⚽
        </motion.button>
      </div>
    );
  }

  if (status === 'finished') {
    const score = calculateScore();
    const percentage = (score / 10) * 100;
    
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Koniec Meczu!
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-7xl font-black my-8 bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)]"
        >
          {score} : {10 - score}
        </motion.div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl mb-8"
        >
          Twój wynik: <span className="font-bold text-[var(--color-accent)]">{score}/10</span> ({percentage}%)
        </motion.p>
        
        <div className="grid gap-3 mb-8 text-left max-h-96 overflow-y-auto">
          {questions.map((q, idx) => {
            const ans = answers[q.id];
            const isCorrect = 
              parseFloat(ans?.replace(',', '.') || '') === parseFloat(q.answer.toString()) ||
              ans?.toLowerCase() === q.answer.toString().toLowerCase();
            
            return (
              <motion.div 
                key={q.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`p-4 rounded-lg border ${isCorrect ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'}`}
              >
                <div className="font-bold mb-1 flex items-center gap-2">
                  <span className="text-[var(--color-text-muted)]">#{idx + 1}</span>
                  {isCorrect ? '✅' : '❌'}
                </div>
                <div className="mb-2 text-sm">{q.question}</div>
                <div className="text-sm flex flex-wrap gap-2">
                  <span>Twoja: <span className="font-mono font-bold">{ans || '(brak)'}</span></span>
                  {!isCorrect && <span className="opacity-75">Poprawna: <span className="font-mono font-bold">{q.answer}</span></span>}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={startTest}
            className="flex items-center justify-center gap-2 glass border border-white/20 px-6 py-3 rounded-lg hover:bg-white/5"
          >
            <RefreshCw size={20} /> Rewanż
          </button>
          <Link 
            to="/"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white px-6 py-3 rounded-lg hover:brightness-110 font-bold"
          >
            Wróć do Szatni
          </Link>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIndex];
  const timePercentage = (timeLeft / (15 * 60)) * 100;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Timer Bar */}
      <div className="mb-6 glass p-4 rounded-xl border border-white/10">
        <div className="flex justify-between items-center mb-2">
          <div className="font-mono text-xl flex items-center gap-2">
            <Clock className={timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-[var(--color-accent)]'} />
            {formatTime(timeLeft)}
          </div>
          <div className="font-bold text-[var(--color-text-muted)]">
            Pytanie {currentQuestionIndex + 1} / 10
          </div>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className={`h-full ${timeLeft < 60 ? 'bg-red-500' : 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]'}`}
            initial={{ width: '100%' }}
            animate={{ width: `${timePercentage}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="card py-8 px-6 mb-6"
        >
          <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full mb-4 text-white">
            {currentQ.team}
          </span>
          <h2 className="text-xl md:text-2xl font-medium mb-8 leading-relaxed">{currentQ.question}</h2>

          {currentQ.options ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQ.options.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className={`p-4 rounded-lg border text-left text-base md:text-lg transition-all ${
                    answers[currentQ.id] === opt
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/20'
                      : 'border-white/10 hover:bg-white/5'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <input
              type="text"
              autoFocus
              placeholder="Wpisz wynik..."
              value={answers[currentQ.id] || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              className="w-full glass-dark border border-white/10 rounded-lg px-6 py-4 text-xl focus:border-[var(--color-primary)] outline-none transition-colors"
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Poprzednie
        </button>
        
        {currentQuestionIndex < 9 ? (
          <button
            onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
            className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white px-6 py-3 rounded-lg hover:brightness-110 font-bold"
          >
            Następne
          </button>
        ) : (
          <button
            onClick={finishTest}
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:brightness-110 font-bold shadow-lg"
          >
            Zakończ Mecz
          </button>
        )}
      </div>
    </div>
  );
};
