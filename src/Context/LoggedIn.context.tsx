import React, { createContext, ReactNode, useEffect, useState } from 'react';

interface ILoggedIn {
    loggedIn: boolean;
    handleLogin: (valid: boolean) => void; // Corrigir o tipo do parâmetro
}

const LoggedIn = createContext<ILoggedIn | undefined>(undefined);

const LoggedInProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = (valid: boolean) => {
        setLoggedIn(valid);
    };

    useEffect(() => {
        console.log(loggedIn)  
    }, [loggedIn])

    return (
        <LoggedIn.Provider value={{ loggedIn, handleLogin }}>
            {children}
        </LoggedIn.Provider>
    );
};

export { LoggedIn, LoggedInProvider };
