import React, { createContext, useState, useContext, useCallback } from 'react';

// On crée le contexte
const NotificationContext = createContext();

// Le Hook personnalisé
export const useNotification = () => useContext(NotificationContext);

// Le Provider
export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    const notify = useCallback((message) => {
        setNotification(message);

        // Disparaît après 10 secondes
        setTimeout(() => {
            setNotification(null);
        }, 10000);
    }, []);

    return (
        <NotificationContext.Provider value={{ notify }}>
            {children}

            {/* La notification stylisée avec Tailwind */}
            {notification && (
                <div className="fixed top-5 right-5 z-[9999] px-6 py-4 bg-gray-800 text-white rounded-lg shadow-2xl animate-slide-in-right">
                    {notification}
                </div>
            )}
        </NotificationContext.Provider>
    );
};