import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(true);

    const toggleTheme = () => {
        setIsDark((prev) => !prev);
    };

    const theme = {
        isDark,
        colors: isDark ? {
            background: '#0f0f1a',
            surface: 'rgba(20, 20, 35, 0.4)',
            surfaceSolid: 'rgba(20, 20, 35, 0.95)',
            text: '#ffffff',
            textMuted: '#b8b0d8',
            primary: '#a78bfa',
            primarySolid: '#7c3aed',
            border: 'rgba(255, 255, 255, 0.1)',
            orb1: '#7c3aed',
            orb2: '#3b82f6',
            orb3: '#10b981',
            orb4: '#f59e0b',
            orb5: '#ef4444',
            bgFilter: 'rgba(15, 15, 26, 0.4)'
        } : {
            background: '#f8f9ff',
            surface: 'rgba(255, 255, 255, 0.7)',
            surfaceSolid: 'rgba(255, 255, 255, 0.95)',
            text: '#1e1b4b',
            textMuted: '#6b7280',
            primary: '#7c3aed',
            primarySolid: '#7c3aed',
            border: 'rgba(124, 58, 237, 0.1)',
            orb1: '#d8b4fe',
            orb2: '#93c5fd',
            orb3: '#6ee7b7',
            orb4: '#fcd34d',
            orb5: '#fca5a5',
            bgFilter: 'rgba(248, 249, 255, 0.2)'
        }
    };

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};
