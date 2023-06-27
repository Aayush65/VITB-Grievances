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
    pass: string,
    setPass: (newPass: string) => void,
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
    pass: "",
    setPass: () => {},
    isLoggedIn: false,
    setIsLoggedIn: () => {},
    currPortal: "", 
    setCurrPortal: () => {}
});

const ContextProvider = ({ children }: { children: ReactNode }) => {

    // useEffect(() => {
    //     fetch("http://localhost:3000/", {
    //         method: "GET",
    //         headers: {
    //             'Authorization': 'Bearer ' + localStorage.getItem('refreshToken')
    //         }
    //     })
    // }, [])

    const [name, setName] = useState<string>("");
    const [regNo, setRegNo] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [year, setYear] = useState<number>(0);
    const [pass, setPass] = useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [currPortal, setCurrPortal] = useState<string>("Ongoing Grievances");
  
    const contextValue = { name, setName, regNo, setRegNo, email, setEmail, year, setYear, pass, setPass, isLoggedIn, setIsLoggedIn, currPortal, setCurrPortal };
  
    return (
        <context.Provider value={contextValue}>
          {children}
        </context.Provider>
    );
};

export { context, ContextProvider };