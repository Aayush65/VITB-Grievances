import { ReactNode, createContext, useState } from 'react';

interface ContextData {
    currPortal: string,
    setCurrPortal: (portal: string) => void
}

const context = createContext<ContextData>({ 
    currPortal: "", 
    setCurrPortal: () => {}
});

const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [currPortal, setCurrPortal] = useState<string>("Ongoing Grievances");
  
    const contextValue = { currPortal, setCurrPortal };
  
    return (
        <context.Provider value={contextValue}>
          {children}
        </context.Provider>
    );
};

export { context, ContextProvider };