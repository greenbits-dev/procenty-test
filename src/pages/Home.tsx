import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PenTool, Trophy, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useProgress } from '../context/ProgressContext';
import { tutorialSteps, practiceProblems } from '../data/curriculum';

export const Home: React.FC = () => {
    const { currentTeam } = useTheme();
    const { points, matchesPlayed, accuracy, completedTutorialSteps, completedPracticeProblems } = useProgress();

    // Calculate completion stats
    const tutorialProgress = {
        completed: completedTutorialSteps.length,
        total: tutorialSteps.length
    };

    const practiceProgress = {
        completed: completedPracticeProblems.length,
        total: practiceProblems.length
    };

    const overallProgress = Math.round(
        ((tutorialProgress.completed + practiceProgress.completed) /
        (tutorialProgress.total + practiceProgress.total)) * 100
    );

    return (
        <div className="flex flex-col gap-8 py-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">
                    Witaj w Klubie, Kibicu!
                </h1>
                <p className="text-xl text-[var(--color-text-muted)]">
                    Trenuj procenty z {currentTeam === 'Legia' ? 'Legią' : currentTeam}.
                    Przygotuj się do meczu (sprawdzianu)!
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <Link to="/tutorial" className="card group hover:border-[var(--color-primary)] transition-all hover:-translate-y-1">
                    <div className="h-12 w-12 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] mb-4 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                        <BookOpen size={24} />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Samouczek</h2>
                    <p className="text-[var(--color-text-muted)] text-sm mb-4">
                        Naucz się podstaw: definicje, zamiana ułamków, obliczenia.
                    </p>
                    <div className="mb-3">
                        <div className="flex justify-between text-xs text-[var(--color-text-muted)] mb-1">
                            <span>Postęp</span>
                            <span>{tutorialProgress.completed}/{tutorialProgress.total}</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] transition-all"
                                style={{ width: `${(tutorialProgress.completed / tutorialProgress.total) * 100}%` }}
                            />
                        </div>
                    </div>
                    <div className="flex items-center text-[var(--color-primary)] text-sm font-medium">
                        {tutorialProgress.completed === 0 ? 'Rozpocznij trening' : tutorialProgress.completed === tutorialProgress.total ? 'Przeglądaj ponownie' : 'Kontynuuj'} <ChevronRight size={16} />
                    </div>
                </Link>

                <Link to="/practice" className="card group hover:border-[var(--color-primary)] transition-all hover:-translate-y-1">
                    <div className="h-12 w-12 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] mb-4 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                        <PenTool size={24} />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Ćwiczenia</h2>
                    <p className="text-[var(--color-text-muted)] text-sm mb-4">
                        20 zadań o różnym poziomie trudności. Zbieraj punkty ligowe!
                    </p>
                    <div className="mb-3">
                        <div className="flex justify-between text-xs text-[var(--color-text-muted)] mb-1">
                            <span>Postęp</span>
                            <span>{practiceProgress.completed}/{practiceProgress.total}</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] transition-all"
                                style={{ width: `${(practiceProgress.completed / practiceProgress.total) * 100}%` }}
                            />
                        </div>
                    </div>
                    <div className="flex items-center text-[var(--color-primary)] text-sm font-medium">
                        {practiceProgress.completed === 0 ? 'Wejdź na boisko' : practiceProgress.completed === practiceProgress.total ? 'Ćwicz ponownie' : 'Kontynuuj'} <ChevronRight size={16} />
                    </div>
                </Link>

                <Link to="/test" className="card group hover:border-[var(--color-primary)] transition-all hover:-translate-y-1">
                    <div className="h-12 w-12 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] mb-4 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                        <Trophy size={24} />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Sprawdzian</h2>
                    <p className="text-[var(--color-text-muted)] text-sm mb-4">
                        Mecz o wszystko. 10 pytań, 15 minut. Pokaż co potrafisz!
                    </p>
                    <div className="flex items-center text-[var(--color-primary)] text-sm font-medium">
                        Zagraj mecz <ChevronRight size={16} />
                    </div>
                </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="card bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-bg)] border-[var(--color-primary)]/20">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <span className="text-2xl">⚽</span> Statystyki Sezonu
                    </h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-[var(--color-accent)]">{matchesPlayed}</div>
                            <div className="text-xs text-[var(--color-text-muted)]">Rozegrane Mecze</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-[var(--color-accent)]">{accuracy}%</div>
                            <div className="text-xs text-[var(--color-text-muted)]">Skuteczność</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-[var(--color-accent)]">{points}</div>
                            <div className="text-xs text-[var(--color-text-muted)]">Punkty</div>
                        </div>
                    </div>
                </div>

                <div className="card bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-bg)] border-[var(--color-primary)]/20">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <span className="text-2xl">📊</span> Postęp w Nauce
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-[var(--color-text-muted)]">Postęp Ogólny</span>
                                <span className="font-bold text-[var(--color-accent)]">{overallProgress}%</span>
                            </div>
                            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] transition-all"
                                    style={{ width: `${overallProgress}%` }}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-[var(--color-text-muted)]">Samouczek:</span>
                                <span className="font-medium">{tutorialProgress.completed}/{tutorialProgress.total}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-[var(--color-text-muted)]">Ćwiczenia:</span>
                                <span className="font-medium">{practiceProgress.completed}/{practiceProgress.total}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
