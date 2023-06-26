import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bcrypt from "bcrypt";

const Register = () => {
    const [name, setName] = useState<string>("");
    const [regNo, setRegNo] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [year, setYear] = useState<number>(0);
    const [pass, setPass] = useState<string>("");
    const [repeatPass, setRepeatPass] = useState<string>("");
    const [isDataValid, setIsDataValid] = useState<boolean>(false);
    
    const navigate = useNavigate();

    // send user's registration data to the backend if all the data given is valid
    useEffect(() => {
        if (!isDataValid)
            return;
        fetch('http://localhost:3000/register', {
            method: 'POST',
            body: JSON.stringify({ name, regNo, email, year, pass }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((err) => {
                console.log(err.message);
            })
            .finally(() => navigate('/login', { replace: true }));
    }, [isDataValid])

    const registerDetails = [
        { name: "Name", value: name, type: "text", funct: setName, placeholder: "Enter your Full Name" },
        { name: "Registration Number", value: regNo, type: "text", funct: setRegNo, placeholder: "Enter your Reg. No." },
        { name: "Email", value: email, type: "email", funct: setEmail, placeholder: "Enter your Email" },
        { name: "Password", value: pass, type: "password", funct: setPass, placeholder: "Enter your Password" },
        { name: "Repeat Password", value: repeatPass, type: "password", funct: setRepeatPass, placeholder: "Repeat your Password" }
    ];

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!email || !pass || !repeatPass || !name || !regNo ) {
            alert("Please fill all the fields");
            return;
        }
        if (pass !== repeatPass) {
            alert("Passwords do not match");
            setPass('');
            setRepeatPass('');
            return;
        }
        const emailRegex = /^[a-zA-Z]+\.([a-zA-Z]*)?(20\d{2})?@vitbhopal\.ac\.in$/
        if (!emailRegex.test(email)) {
            alert("Please enter a valid VIT Bhopal email");
            handleReset();
            return;
        }
        const newPass = await encrypt(pass)
        setPass(newPass);
        setYear(Number(email.match(emailRegex)![2]));
        setIsDataValid(true);
    }

    // encrypts the password
    async function encrypt(password: string) {
        const salt = bcrypt.genSaltSync(10);
        const newPass = bcrypt.hash(password, salt);
        return newPass;
    }
    
    function handleReset() {
        setEmail("");
        setPass("");
        setRepeatPass("");
        setName("");
        setRegNo("");
    }

    return (
        <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-[#EEEEEE] p-3">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center bg-[#3A98B9] py-10 px-7 md:p-10 md:pb-7 gap-5 text-[#FFF1DC] rounded-3xl w-full md:w-auto">
                {registerDetails.map((detail, index) => (
                    <label key={index} className="flex flex-col gap-1 md:text-lg w-full">
                        {detail.name}
                        <input required className="p-2 rounded-xl placeholder:text-gray-400 md:w-[400px] text-black" onChange={(e) => detail.funct(e.target.value)} type={detail.type} placeholder={detail.placeholder} />
                        <Link to="/login" className={`${detail.name === "Repeat Password" ? "" : "hidden"} hover:underline self-end text-[13px] md:text-base`}>Already a User?</Link>
                    </label>
                ))}
                <button type="submit" className="bg-gray-700 p-3 px-4 rounded-xl md:text-lg">Submit</button>
            </form>
        </div>
    )
}

export default Register;