import React, { useState, useEffect } from 'react';
import { tutorialSteps } from '../data/curriculum';
import { ChevronRight, ChevronLeft, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export const Tutorial: React.FC = () => {
    const { markTutorialStepComplete, isTutorialStepComplete } = useProgress();
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

    // Check if all practice questions are answered correctly and mark step as complete
    useEffect(() => {
        const allAnswered = step.practice.every((q, qIdx) => {
            const key = `${step.id}-${qIdx}`;
            const selected = practiceAnswers[key];
            return selected === q.correctIndex;
        });

        if (allAnswered && !isTutorialStepComplete(step.id)) {
            markTutorialStepComplete(step.id);
        }
    }, [practiceAnswers, step, markTutorialStepComplete, isTutorialStepComplete]);

    const nextStep = () => {
        if (!isLastStep) setCurrentStepIndex(prev => prev + 1);
    };

    const prevStep = () => {
        if (!isFirstStep) setCurrentStepIndex(prev => prev - 1);
    };

    return (
        <div className="max-w-3xl mx-auto">
            {/* Step Progress Indicator */}
            <div className="mb-8">
                <div className="flex items-center justify-between gap-2">
                    {tutorialSteps.map((s, idx) => {
                        const isComplete = isTutorialStepComplete(s.id);
                        const isCurrent = idx === currentStepIndex;

                        return (
                            <div key={s.id} className="flex-1 flex items-center">
                                <div className="flex flex-col items-center flex-1">
                                    <div className={`
                                        w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                                        ${isCurrent ? 'bg-[var(--color-primary)] text-white ring-4 ring-[var(--color-primary)]/30' : ''}
                                        ${isComplete && !isCurrent ? 'bg-green-500 text-white' : ''}
                                        ${!isComplete && !isCurrent ? 'bg-white/10 text-[var(--color-text-muted)]' : ''}
                                    `}>
                                        {isComplete ? '✓' : idx + 1}
                                    </div>
                                    <div className={`text-xs mt-2 text-center ${isCurrent ? 'font-bold' : 'text-[var(--color-text-muted)]'}`}>
                                        {s.title.split(' ').slice(0, 2).join(' ')}
                                    </div>
                                </div>
                                {idx < tutorialSteps.length - 1 && (
                                    <div className={`h-0.5 flex-1 ${isComplete ? 'bg-green-500' : 'bg-white/10'}`} />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <span className="bg-[var(--color-primary)] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                        {currentStepIndex + 1}
                    </span>
                    {step.title}
                </h1>
                <div className="text-sm text-[var(--color-text-muted)]">
                    Krok {currentStepIndex + 1} z {tutorialSteps.length}
                    {isTutorialStepComplete(step.id) && (
                        <span className="ml-2 text-green-500">✓ Ukończono</span>
                    )}
                </div>
            </div>

            <div className="space-y-6">
                {/* Concept Card */}
                <div className="card border-l-4 border-l-[var(--color-primary)]">
                    <h2 className="text-lg font-bold text-[var(--color-accent)] mb-2">{step.concept}</h2>
                    <p className="text-lg leading-relaxed">{step.explanation}</p>
                </div>

                {/* Example Card */}
                <div className="card bg-white/5">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-4">
                        Przykład z Boiska
                    </h3>
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="flex-1">
                            <div className="text-xl font-bold mb-1">{step.example.context}</div>
                            <div className="text-4xl font-bold text-[var(--color-primary)] mb-2">{step.example.value}</div>
                        </div>
                        <div className="flex-1 bg-black/20 p-4 rounded-lg border border-white/10">
                            <code className="text-[var(--color-accent)] font-mono text-lg">
                                {step.example.visual}
                            </code>
                        </div>
                    </div>
                </div>

                {/* Practice Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <span className="text-2xl">⚽</span> Szybki Trening
                    </h3>

                    {step.practice.map((q, qIdx) => {
                        const key = `${step.id}-${qIdx}`;
                        const selected = practiceAnswers[key];
                        const isAnswered = selected !== undefined && selected !== null;
                        const isCorrect = selected === q.correctIndex;

                        return (
                            <div key={qIdx} className="card p-6">
                                <p className="font-medium mb-4">{q.question}</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                    {q.options.map((opt, optIdx) => (
                                        <button
                                            key={optIdx}
                                            onClick={() => handleAnswer(qIdx, optIdx)}
                                            disabled={isAnswered}
                                            className={`
                        text-left p-3 rounded-lg border transition-all
                        ${isAnswered && optIdx === q.correctIndex
                                                    ? 'bg-green-500/20 border-green-500 text-green-200'
                                                    : ''}
                        ${isAnswered && selected === optIdx && optIdx !== q.correctIndex
                                                    ? 'bg-red-500/20 border-red-500 text-red-200'
                                                    : ''}
                        ${!isAnswered
                                                    ? 'hover:bg-[var(--color-primary)] hover:text-white border-white/10'
                                                    : ''}
                      `}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>

                                {showExplanation[key] && (
                                    <div className={`p-4 rounded-lg flex items-start gap-3 ${isCorrect ? 'bg-green-900/20 text-green-200' : 'bg-red-900/20 text-red-200'}`}>
                                        {isCorrect ? <CheckCircle className="shrink-0" /> : <XCircle className="shrink-0" />}
                                        <div>
                                            <div className="font-bold mb-1">{isCorrect ? 'GOL!' : 'Pudło!'}</div>
                                            <div className="text-sm opacity-90">{q.explanation}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex justify-between mt-8 pt-4 border-t border-white/10">
                <button
                    onClick={prevStep}
                    disabled={isFirstStep}
                    className="flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft size={20} /> Poprzedni
                </button>

                <button
                    onClick={nextStep}
                    disabled={isLastStep}
                    className="flex items-center gap-2 bg-[var(--color-primary)] text-white hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Następny <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};
