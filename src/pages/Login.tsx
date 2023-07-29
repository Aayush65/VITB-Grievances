import { FormEvent, useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { context } from "../context";

const Login = () => {
    const [pass, setPass] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
    const [username, setUsername] = useState("");
    const [isTestLogin, setIsTestLogin] = useState('');

    const [alert, setAlert] = useState<string>("");

    const { setName, setEmpNo, setRegNo, setIsSuperUser } = useContext(context);
    const navigate = useNavigate();

    // sending the login details for authentication and setting the jwt token
    useEffect(() => {
        if (!isSubmit)
            return;
        fetch("https://grievance-server.aayush65.com/login", {
            method: 'POST',
            body: username.toLowerCase() === username.toUpperCase() ? JSON.stringify({ empNo: username, pass }) : JSON.stringify({ regNo: username, pass }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message && data.message === "Wrong Credentials") {
                    setAlert("Incorrect Email or Password");
                    localStorage.removeItem("accessToken");
                    handleReset();
                } else if (data) {
                    localStorage.clear();
                    localStorage.setItem("refreshToken", data.refreshToken);
                    localStorage.setItem("accessToken", data.accessToken);
                    setName(data.name);
                    if (username.toLowerCase() === username.toUpperCase()) {
                        setEmpNo(data.empNo);
                        setIsSuperUser(data.isSuperUser);
                    } else {
                        setRegNo(data.regNo);
                    }
                    navigate('/');
                }
            })
            .catch(() => {
                handleReset();
            })
        setIsSubmit(false);
    }, [isSubmit])

    // setTimeout for the alert message
    useEffect(() => {
        if (!alert.length)
            return;
        setTimeout(() => setAlert(''), alert.length * 100);
    }, [alert])

    // setting variables for test login
    useEffect(() => {
        if (!isTestLogin)
            return;
        if (isTestLogin === "user") {
            setUsername("20BCE00000");
            setPass("testuserpass");
        } else if (isTestLogin === "admin") {
            setUsername("100000");
            setPass("testadminpass");
        }
    }, [isTestLogin])

    // confirming test variables
    useEffect(() => {
        if (!isTestLogin)
            return;
        if (username !== "20BCE00000" && username !== "100000")
            return;
        if (pass !== "testuserpass" && pass !== "testadminpass")
            return;
        setIsSubmit(true);
    }, [username, pass])

    const loginDetails = [
        { name: " Registration/Employee Number", value: username, funct: setUsername, placeholder: "Enter your Registration/Employee No" },
        { name: "Password", value: pass, funct: setPass, placeholder: "Enter your Password" },
    ];

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!username || !pass){
            setAlert("Please fill all the fields");
            return;
        }
        setIsSubmit(true);
    }

    function handleReset() {
        setUsername('');
        setPass('');
    }

    return !localStorage.getItem("accessToken") ? (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#EEEEEE] p-3">
            <div className={`${alert ? "": "hidden"} fixed bg-red-500 text-white p-4 text-lg rounded-lg top-0 mx-auto flex gap-5`}>
                {alert}
                <button className="font-black z-10" onClick={() => setAlert('')}>x</button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center bg-[#3A98B9] py-10 px-7 md:p-10 md:pb-7 gap-5 text-[#FFF1DC] rounded-3xl w-full md:w-auto">
                {loginDetails.map((detail, index) => (
                    <label key={index} className="flex flex-col gap-1 md:text-lg w-full">
                        {detail.name}
                        <input className="p-2 rounded-xl placeholder:text-gray-400 md:w-[400px] text-black" onChange={(e) => detail.funct(e.target.value)} type={detail.name.toLowerCase()} placeholder={detail.placeholder} value={detail.value} />
                        <div className="flex justify-between">
                            <Link to="/forget-password" className={`hover:underline self-end text-[13px] md:text-base ${detail.name === "Password" ? "": "hidden"}`}>Forgot Password?</Link>
                            <Link to="/register" className={`hover:underline self-start text-[13px] md:text-base ${index === loginDetails.length - 1 ? "": "hidden"}`}>Register Here</Link>
                        </div>
                    </label>
                ))}
                <div className="flex flex-col justify-start gap-1 self-start">
                    <button onClick={() => setIsTestLogin("user")} className="text-[13px] md:text-base flex justify-start hover:underline">Test User Login</button>
                    <button onClick={() => setIsTestLogin("admin")} className="text-[13px] md:text-base flex justify-start hover:underline">Test Admin Login</button>
                </div>
                <button type="submit" className="bg-gray-700 p-3 px-4 rounded-xl md:text-lg active:scale-105">Submit</button>
            </form>
        </div>
    ) : <Navigate to="/" />
}

export default Login;