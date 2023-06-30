import { ReactNode, createContext, useState } from 'react';

interface ContextData {
    currPortal: string,
    setCurrPortal: (newPortal: string) => void,
    currAdminPortal: string,
    setCurrAdminPortal: (newPortal: string) => void,
}

const context = createContext<ContextData>({ 
    currPortal: "", 
    setCurrPortal: () => {},
    currAdminPortal: "", 
    setCurrAdminPortal: () => {},
});

const ContextProvider = ({ children }: { children: ReactNode }) => {
    
    const [currPortal, setCurrPortal] = useState<string>("");
    const [currAdminPortal, setCurrAdminPortal] = useState<string>("");
  
    const contextValue = { currPortal, setCurrPortal, currAdminPortal, setCurrAdminPortal };
  
    return (
        <context.Provider value={contextValue}>
          {children}
        </context.Provider>
    );
};

export { context, ContextProvider };