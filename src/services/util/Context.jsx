import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [screen, setScreen] = useState({
        login: false,
        signup: false
    });

    const [loggedIn, setLoggedIn] = useState(false);

    const value = {
      screen,
      setScreen,
      loggedIn,
      setLoggedIn
    };

  return (
    <AppContext.Provider value={ value }>
        {children}
    </AppContext.Provider>
  );
};