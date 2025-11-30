import React, { useState } from 'react';
import { practiceProblems, Problem } from '../data/curriculum';
import { CheckCircle, XCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../context/ProgressContext';

export const Practice: React.FC = () => {
    const { currentTeam } = useTheme();
    const { addPoints, updateAccuracy, markPracticeProblemComplete, isPracticeProblemComplete } = useProgress();
    const [activeDifficulty, setActiveDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [results, setResults] = useState<Record<string, 'correct' | 'incorrect' | null>>({});
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const filteredProblems = practiceProblems.filter(p => p.difficulty === activeDifficulty);

    // Calculate progress for each difficulty
    const getProgressForDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
        const problems = practiceProblems.filter(p => p.difficulty === difficulty);
        const completed = problems.filter(p => isPracticeProblemComplete(p.id)).length;
        return { total: problems.length, completed };
    };

    const checkAnswer = (problem: Problem) => {
        const userAnswer = answers[problem.id]?.trim().replace(',', '.');
        if (!userAnswer) return;

        // Simple numeric check or string match
        const isCorrect =
            parseFloat(userAnswer) === parseFloat(problem.answer.toString()) ||
            userAnswer.toLowerCase() === problem.answer.toString().toLowerCase();

        if (results[problem.id] === undefined) {
            // Only update stats on first attempt
            updateAccuracy(isCorrect);
            if (isCorrect) {
                addPoints(3);
                markPracticeProblemComplete(problem.id);
            }
        }

        setResults(prev => ({ ...prev, [problem.id]: isCorrect ? 'correct' : 'incorrect' }));
        if (isCorrect) {
            setExpanded(prev => ({ ...prev, [problem.id]: true }));
        }
    };

    const toggleExpand = (id: string) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold">Trening</h1>

                <div className="flex bg-[var(--color-surface)] p-1 rounded-lg border border-white/10">
                    {(['easy', 'medium', 'hard'] as const).map((diff) => {
                        const progress = getProgressForDifficulty(diff);
                        return (
                            <button
                                key={diff}
                                onClick={() => setActiveDifficulty(diff)}
                                className={`px-4 py-2 rounded-md capitalize transition-all ${activeDifficulty === diff
                                    ? 'bg-[var(--color-primary)] text-white shadow-lg'
                                    : 'text-[var(--color-text-muted)] hover:text-white'
                                    }`}
                            >
                                <div>{diff === 'easy' ? 'Rozgrzewka' : diff === 'medium' ? 'Mecz' : 'Liga Mistrzów'}</div>
                                <div className="text-xs opacity-75">
                                    {progress.completed}/{progress.total}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-4">
                {filteredProblems.map((problem) => {
                    const result = results[problem.id];
                    const isExpanded = expanded[problem.id];
                    const isCompleted = isPracticeProblemComplete(problem.id);

                    return (
                        <div key={problem.id} className={`card p-0 overflow-hidden border-l-4 ${isCompleted ? 'border-l-green-500' : 'border-l-[var(--color-accent)]'}`}>
                            <div className="p-6">
                                <div className="flex justify-between items-start gap-4 mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="inline-block px-2 py-1 text-xs font-bold uppercase tracking-wider bg-white/10 rounded text-[var(--color-text-muted)]">
                                                {problem.team}
                                            </span>
                                            {isCompleted && (
                                                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold uppercase tracking-wider bg-green-500/20 text-green-400 rounded">
                                                    <CheckCircle size={12} /> Ukończono
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-lg font-medium">{problem.question}</h3>
                                    </div>
                                    {result === 'correct' && <CheckCircle className="text-green-500 shrink-0" />}
                                    {result === 'incorrect' && <XCircle className="text-red-500 shrink-0" />}
                                </div>

                                {problem.options ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {problem.options.map((opt) => (
                                            <button
                                                key={opt}
                                                onClick={() => {
                                                    if (result === 'correct') return;
                                                    setAnswers(prev => ({ ...prev, [problem.id]: opt }));
                                                    // Auto check for options
                                                    const isCorrect = opt === problem.answer;

                                                    if (results[problem.id] === undefined) {
                                                        updateAccuracy(isCorrect);
                                                        if (isCorrect) {
                                                            addPoints(3);
                                                            markPracticeProblemComplete(problem.id);
                                                        }
                                                    }

                                                    setResults(prev => ({ ...prev, [problem.id]: isCorrect ? 'correct' : 'incorrect' }));
                                                    if (isCorrect) setExpanded(prev => ({ ...prev, [problem.id]: true }));
                                                }}
                                                className={`p-3 rounded border text-left transition-colors ${answers[problem.id] === opt
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
                                            className="flex-1 bg-black/20 border border-white/10 rounded px-4 py-2 focus:border-[var(--color-primary)] outline-none transition-colors"
                                        />
                                        <button
                                            onClick={() => checkAnswer(problem)}
                                            disabled={!answers[problem.id] || result === 'correct'}
                                            className="bg-[var(--color-primary)] text-white px-6 py-2 rounded hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Sprawdź
                                        </button>
                                    </div>
                                )}
                            </div>

                            {(result || isExpanded) && (
                                <div className={`border-t border-white/10 bg-black/20 transition-all ${isExpanded ? 'block' : 'hidden'}`}>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 font-bold mb-2 text-[var(--color-accent)]">
                                            <HelpCircle size={18} /> Wyjaśnienie Trenera
                                        </div>
                                        <p className="text-[var(--color-text-muted)]">{problem.explanation}</p>
                                        <div className="mt-4 font-mono text-sm bg-black/40 p-3 rounded border border-white/5">
                                            Odpowiedź: {problem.answer} {problem.unit}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {result && !isExpanded && (
                                <button
                                    onClick={() => toggleExpand(problem.id)}
                                    className="w-full py-2 text-xs text-center text-[var(--color-text-muted)] hover:bg-white/5 transition-colors flex items-center justify-center gap-1"
                                >
                                    Pokaż wyjaśnienie <ChevronDown size={14} />
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
