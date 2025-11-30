import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProgressContextType {
    points: number;
    addPoints: (amount: number) => void;
    matchesPlayed: number;
    incrementMatches: () => void;
    accuracy: number;
    updateAccuracy: (isCorrect: boolean) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [points, setPoints] = useState(() => parseInt(localStorage.getItem('procenty_points') || '0'));
    const [matchesPlayed, setMatchesPlayed] = useState(() => parseInt(localStorage.getItem('procenty_matches') || '0'));
    const [totalQuestions, setTotalQuestions] = useState(() => parseInt(localStorage.getItem('procenty_total_q') || '0'));
    const [correctQuestions, setCorrectQuestions] = useState(() => parseInt(localStorage.getItem('procenty_correct_q') || '0'));

    useEffect(() => {
        localStorage.setItem('procenty_points', points.toString());
        localStorage.setItem('procenty_matches', matchesPlayed.toString());
        localStorage.setItem('procenty_total_q', totalQuestions.toString());
        localStorage.setItem('procenty_correct_q', correctQuestions.toString());
    }, [points, matchesPlayed, totalQuestions, correctQuestions]);

    const addPoints = (amount: number) => setPoints(p => p + amount);
    const incrementMatches = () => setMatchesPlayed(m => m + 1);

    const updateAccuracy = (isCorrect: boolean) => {
        setTotalQuestions(t => t + 1);
        if (isCorrect) setCorrectQuestions(c => c + 1);
    };

    const accuracy = totalQuestions === 0 ? 0 : Math.round((correctQuestions / totalQuestions) * 100);

    return (
        <ProgressContext.Provider value={{ points, addPoints, matchesPlayed, incrementMatches, accuracy, updateAccuracy }}>
            {children}
        </ProgressContext.Provider>
    );
};

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (context === undefined) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
};
