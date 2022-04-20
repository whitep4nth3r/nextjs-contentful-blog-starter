import { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export function AppWrapper({ children }) {
    
    const [countList, setCountList] = useState(null)
    
    const value = {
        countList,
        setCountList
      };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}