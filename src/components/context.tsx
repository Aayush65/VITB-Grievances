import { ReactNode, createContext, useEffect, useState } from 'react';

interface ContextData {
    name: string,
    setName: (newName: string) => void,
    regNo: string,
    setRegNo: (newRegNo: string) => void,
    email: string,
    setEmail: (newEmail: string) => void,
    year: number,
    setYear: (newYear: number) => void,
    isLoggedIn: boolean,
    setIsLoggedIn: (newIsLoggedIn: boolean) => void,
    currPortal: string,
    setCurrPortal: (newPortal: string) => void
}

const context = createContext<ContextData>({ 
    name: "",
    setName: () => {},
    regNo: "",
    setRegNo: () => {},
    email: "",
    setEmail: () => {},
    year: 0,
    setYear: () => {},
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    currPortal: "", 
    setCurrPortal: () => {}
});

const ContextProvider = ({ children }: { children: ReactNode }) => {
    
    const [name, setName] = useState<string>("");
    const [regNo, setRegNo] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [year, setYear] = useState<number>(0);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [currPortal, setCurrPortal] = useState<string>("Ongoing Grievances");
    
    useEffect(() => {
        fetch("http://localhost:3000/accesstoken", {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('refreshToken')
            }
        })
    }, [])
    
    const contextValue = { name, setName, regNo, setRegNo, email, setEmail, year, setYear, isLoggedIn, setIsLoggedIn, currPortal, setCurrPortal };
  
    return (
        <context.Provider value={contextValue}>
          {children}
        </context.Provider>
    );
};

export { context, ContextProvider };