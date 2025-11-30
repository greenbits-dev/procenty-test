import React, { useState, useEffect } from 'react';
import { practiceProblems, Problem } from '../data/curriculum';
import { Timer, AlertCircle, Trophy, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';

export const Test: React.FC = () => {
    const { addPoints, incrementMatches, updateAccuracy } = useProgress();
    const [status, setStatus] = useState<'intro' | 'active' | 'finished'>('intro');
    const [questions, setQuestions] = useState<Problem[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

    useEffect(() => {
        if (status === 'active' && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && status === 'active') {
            finishTest();
        }
    }, [status, timeLeft]);

    const startTest = () => {
        // Shuffle and pick 10
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

        // Calculate and award points
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
                addPoints(10); // 10 points per correct answer in test
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
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary)] mb-6">
                    <Trophy size={48} />
                </div>
                <h1 className="text-4xl font-bold mb-4">Wielki Mecz (Sprawdzian)</h1>
                <p className="text-xl text-[var(--color-text-muted)] mb-8">
                    Masz 15 minut na 10 pytań. Brak podpowiedzi. Wynik końcowy zadecyduje o mistrzostwie.
                </p>
                <button
                    onClick={startTest}
                    className="bg-[var(--color-primary)] text-white text-lg px-8 py-3 rounded-lg hover:brightness-110 transition-all transform hover:scale-105"
                >
                    Rozpocznij Mecz
                </button>
            </div>
        );
    }

    if (status === 'finished') {
        const score = calculateScore();
        const percentage = (score / 10) * 100;

        return (
            <div className="max-w-2xl mx-auto text-center py-12">
                <h1 className="text-4xl font-bold mb-2">Koniec Meczu!</h1>
                <div className="text-6xl font-black my-8 text-[var(--color-accent)]">
                    {score} : {10 - score}
                </div>
                <p className="text-xl mb-8">
                    Twój wynik: {score}/10 ({percentage}%)
                </p>

                <div className="grid gap-4 mb-8 text-left">
                    {questions.map((q, idx) => {
                        const ans = answers[q.id];
                        const isCorrect =
                            parseFloat(ans?.replace(',', '.') || '') === parseFloat(q.answer.toString()) ||
                            ans?.toLowerCase() === q.answer.toString().toLowerCase();

                        return (
                            <div key={q.id} className={`p-4 rounded border ${isCorrect ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'}`}>
                                <div className="font-bold mb-1">Pytanie {idx + 1}</div>
                                <div className="mb-2">{q.question}</div>
                                <div className="text-sm">
                                    Twoja odpowiedź: <span className="font-mono">{ans || '(brak)'}</span>
                                    {!isCorrect && <span className="ml-4 opacity-75">Poprawna: {q.answer}</span>}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={startTest}
                        className="flex items-center gap-2 bg-[var(--color-surface)] border border-white/20 px-6 py-2 rounded hover:bg-white/5"
                    >
                        <RefreshCw size={20} /> Rewanż
                    </button>
                    <Link
                        to="/"
                        className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-2 rounded hover:brightness-110"
                    >
                        Wróć do Szatni
                    </Link>
                </div>
            </div>
        );
    }

    const currentQ = questions[currentQuestionIndex];

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6 p-4 bg-[var(--color-surface)] rounded-lg border border-white/10">
                <div className="font-mono text-xl flex items-center gap-2">
                    <Timer className={timeLeft < 60 ? 'text-red-500 animate-pulse' : ''} />
                    {formatTime(timeLeft)}
                </div>
                <div className="font-bold text-[var(--color-text-muted)]">
                    Pytanie {currentQuestionIndex + 1} / 10
                </div>
            </div>

            <div className="card py-8 px-6 mb-6">
                <span className="inline-block px-2 py-1 text-xs font-bold uppercase tracking-wider bg-white/10 rounded mb-4 text-[var(--color-text-muted)]">
                    {currentQ.team}
                </span>
                <h2 className="text-2xl font-medium mb-8">{currentQ.question}</h2>

                {currentQ.options ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {currentQ.options.map(opt => (
                            <button
                                key={opt}
                                onClick={() => handleAnswer(opt)}
                                className={`p-4 rounded-lg border text-left text-lg transition-all ${answers[currentQ.id] === opt
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
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-6 py-4 text-xl focus:border-[var(--color-primary)] outline-none transition-colors"
                    />
                )}
            </div>

            <div className="flex justify-between">
                <button
                    onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentQuestionIndex === 0}
                    className="px-6 py-2 rounded border border-white/10 hover:bg-white/5 disabled:opacity-50"
                >
                    Poprzednie
                </button>

                {currentQuestionIndex < 9 ? (
                    <button
                        onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                        className="bg-[var(--color-primary)] text-white px-6 py-2 rounded hover:brightness-110"
                    >
                        Następne
                    </button>
                ) : (
                    <button
                        onClick={finishTest}
                        className="bg-green-600 text-white px-8 py-2 rounded hover:brightness-110 font-bold"
                    >
                        Zakończ Mecz
                    </button>
                )}
            </div>
        </div>
    );
};
