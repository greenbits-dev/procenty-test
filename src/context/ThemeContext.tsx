import React, { createContext, useContext, useState, useEffect } from 'react';
import { Team } from '../data/curriculum';

interface ThemeContextType {
    currentTeam: Team;
    setTeam: (team: Team) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentTeam, setCurrentTeam] = useState<Team>('Barcelona');

    useEffect(() => {
        const root = document.documentElement;
        root.className = ''; // Clear classes
        root.classList.add(`team-${currentTeam.toLowerCase()}`);
    }, [currentTeam]);

    return (
        <ThemeContext.Provider value={{ currentTeam, setTeam: setCurrentTeam }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
