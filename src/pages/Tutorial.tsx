import React, { useState } from 'react';
import { tutorialSteps } from '../data/curriculum';
import { ChevronRight, ChevronLeft, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Tutorial: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, number | null>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  const step = tutorialSteps[currentStepIndex];
  const isLastStep = currentStepIndex === tutorialSteps.length - 1;
  const isFirstStep = currentStepIndex === 0;

  const handleAnswer = (questionIndex: number, optionIndex: number) => {
    const key = `${step.id}-${questionIndex}`;
    setPracticeAnswers(prev => ({ ...prev, [key]: optionIndex }));
    setShowExplanation(prev => ({ ...prev, [key]: true }));
  };

  const nextStep = () => {
    if (!isLastStep) setCurrentStepIndex(prev => prev + 1);
  };

  const prevStep = () => {
    if (!isFirstStep) setCurrentStepIndex(prev => prev - 1);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Krok {currentStepIndex + 1} z {tutorialSteps.length}</span>
          <span className="text-xs text-[var(--color-text-muted)]">{Math.round(((currentStepIndex + 1) / tutorialSteps.length) * 100)}%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStepIndex + 1) / tutorialSteps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStepIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Title */}
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shrink-0">
              {currentStepIndex + 1}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">{step.title}</h1>
          </div>

          {/* Concept Card */}
          <div className="card border-l-4 border-l-[var(--color-primary)]">
            <h2 className="text-lg font-bold text-[var(--color-accent)] mb-3">{step.concept}</h2>
            <p className="text-lg leading-relaxed">{step.explanation}</p>
          </div>

          {/* Example Card */}
          <div className="glass p-6 rounded-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-4 flex items-center gap-2">
              <span className="text-2xl">⚽</span> Przykład z Boiska
            </h3>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 text-center md:text-left">
                <div className="text-xl font-bold mb-2">{step.example.context}</div>
                <div className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-2">{step.example.value}</div>
              </div>
              <div className="flex-1 glass-dark p-4 rounded-lg border border-white/10 w-full">
                <code className="text-[var(--color-accent)] font-mono text-base md:text-lg block">
                  {step.example.visual}
                </code>
              </div>
            </div>
          </div>

          {/* Practice Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="text-2xl">🎯</span> Szybki Trening
            </h3>
            
            {step.practice.map((q, qIdx) => {
              const key = `${step.id}-${qIdx}`;
              const selected = practiceAnswers[key];
              const isAnswered = selected !== undefined && selected !== null;
              const isCorrect = selected === q.correctIndex;

              return (
                <motion.div 
                  key={qIdx} 
                  className="card p-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: qIdx * 0.1 }}
                >
                  <p className="font-medium mb-4 text-lg">{q.question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {q.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleAnswer(qIdx, optIdx)}
                        disabled={isAnswered}
                        className={`
                          text-left p-4 rounded-lg border transition-all text-base
                          ${isAnswered && optIdx === q.correctIndex 
                            ? 'bg-green-500/20 border-green-500 text-green-200' 
                            : ''}
                          ${isAnswered && selected === optIdx && optIdx !== q.correctIndex 
                            ? 'bg-red-500/20 border-red-500 text-red-200' 
                            : ''}
                          ${!isAnswered 
                            ? 'hover:bg-[var(--color-primary)]/20 hover:border-[var(--color-primary)] border-white/10' 
                            : ''}
                          disabled:cursor-not-allowed
                        `}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  
                  <AnimatePresence>
                    {showExplanation[key] && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`p-4 rounded-lg flex items-start gap-3 overflow-hidden ${isCorrect ? 'bg-green-900/20 text-green-200' : 'bg-red-900/20 text-red-200'}`}
                      >
                        {isCorrect ? <CheckCircle className="shrink-0" size={24} /> : <XCircle className="shrink-0" size={24} />}
                        <div>
                          <div className="font-bold mb-1 text-lg">{isCorrect ? '⚽ GOL!' : '❌ Pudło!'}</div>
                          <div className="text-sm opacity-90">{q.explanation}</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
        <button
          onClick={prevStep}
          disabled={isFirstStep}
          className="flex items-center gap-2 px-6 py-3 disabled:opacity-30 disabled:cursor-not-allowed glass hover:bg-white/10"
        >
          <ChevronLeft size={20} /> Poprzedni
        </button>
        
        <button
          onClick={nextStep}
          disabled={isLastStep}
          className="flex items-center gap-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white px-6 py-3 hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Następny <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
