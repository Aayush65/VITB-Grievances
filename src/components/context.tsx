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
    accessToken: string,
    setAccessToken: (newAccessToken: string) => void,
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
    accessToken: "",
    setAccessToken: () => {},
    currPortal: "", 
    setCurrPortal: () => {}
});

const ContextProvider = ({ children }: { children: ReactNode }) => {
    
    const [name, setName] = useState<string>("");
    const [regNo, setRegNo] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [year, setYear] = useState<number>(0);
    const [accessToken, setAccessToken] = useState<string>('');
    const [currPortal, setCurrPortal] = useState<string>("Ongoing Grievances");

    useEffect(() => {
        async function getAccessToken() {
            fetch("http://localhost:3000/accesstoken", {
                method: "GET",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('refreshToken'),
                    'Content-type': 'application/json; charset=UTF-8'
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    if (data.message && data.message === "Unauthorised Access") {
                        localStorage.removeItem('refreshToken');
                        window.location.replace('/login');
                    } else {
                        localStorage.setItem('refreshToken', data.refreshToken);
                        setAccessToken(data.accessToken);
                        setName(data.name);
                        setRegNo(data.regNo);
                        setEmail(data.email);
                        setYear(data.year);
                    }
                })
                .catch((err) => {
                    setAccessToken('');
                    localStorage.removeItem('refreshToken');
                    console.error(err);
                    window.location.assign('/login');
                });
        }

        getAccessToken();
        setInterval(getAccessToken, 1000 * 60); // 60s
    }, [])
    
    const contextValue = { name, setName, regNo, setRegNo, email, setEmail, year, setYear, accessToken, setAccessToken,currPortal, setCurrPortal };
  
    return (
        <context.Provider value={contextValue}>
          {children}
        </context.Provider>
    );
};

export { context, ContextProvider };