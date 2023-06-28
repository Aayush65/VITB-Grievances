import { ReactNode, createContext, useState } from 'react';

interface ContextData {
    currPortal: string,
    setCurrPortal: (newPortal: string) => void
}

const context = createContext<ContextData>({ 
    currPortal: "", 
    setCurrPortal: () => {}
});

const ContextProvider = ({ children }: { children: ReactNode }) => {
    
    const [currPortal, setCurrPortal] = useState<string>("");
  
    const contextValue = { currPortal, setCurrPortal };
  
    return (
        <context.Provider value={contextValue}>
          {children}
        </context.Provider>
    );
};

export { context, ContextProvider };