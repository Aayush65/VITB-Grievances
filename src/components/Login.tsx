import { FormEvent, useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Login = () => {
    const [pass, setPass] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
    const [regNo, setRegNo] = useState("");
    const navigate = useNavigate();

    // sending the login details for authentication and setting the jwt token
    useEffect(() => {
        if (!isSubmit)
            return;
        fetch("http://localhost:3000/login", {
            method: 'POST',
            body: JSON.stringify({ regNo, pass }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message && data.message === "Unauthorised Access") {
                    localStorage.removeItem("accessToken");
                    handleReset();
                } else if (data) {
                    localStorage.setItem("refreshToken", data.refreshToken);
                    localStorage.setItem("accessToken", data.accessToken);
                    localStorage.setItem("name", data.name);
                    localStorage.setItem("regNo", data.regNo);
                    localStorage.setItem("year", data.year);
                    localStorage.setItem("email", data.email);
                    navigate('/');
                }
            })
            .catch((err) => {
                console.log("Error: " + err.message);
                handleReset();
            })
        setIsSubmit(false);
    }, [isSubmit])

    const loginDetails = [
        { name: "Registration Number", value: regNo, funct: setRegNo, placeholder: "Enter your Registration No" },
        { name: "Password", value: pass, funct: setPass, placeholder: "Enter your Password" },
    ];

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!regNo || !pass)
            return;
        setIsSubmit(true);
    }

    function handleReset() {
        setRegNo('');
        setPass('');
        setIsSubmit(false);
    }

    return !localStorage.getItem("accessToken") ? (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#EEEEEE] p-3">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center bg-[#3A98B9] py-10 px-7 md:p-10 md:pb-7 gap-5 text-[#FFF1DC] rounded-3xl w-full md:w-auto">
                {loginDetails.map((detail, index) => (
                    <label key={index} className="flex flex-col gap-1 md:text-lg w-full">
                        {detail.name}
                        <input required className="p-2 rounded-xl placeholder:text-gray-400 md:w-[400px] text-black" onChange={(e) => detail.funct(e.target.value)} type={detail.name.toLowerCase()} placeholder={detail.placeholder} />
                        <div className="flex justify-between">
                            <Link to="/register" className={`hover:underline self-end text-[13px] md:text-base ${detail.name === "Password" ? "": "hidden"}`}>Forgot Password?</Link>
                            <Link to="/register" className={`hover:underline self-start text-[13px] md:text-base ${detail.name === "Password" ? "": "hidden"}`}>Register Here</Link>
                        </div>
                    </label>
                ))}
                <button type="submit" className="bg-gray-700 p-3 px-4 rounded-xl md:text-lg">Submit</button>
            </form>
        </div>
    ) : <Navigate to="/" />
}

export default Login;