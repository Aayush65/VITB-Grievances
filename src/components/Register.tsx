import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState<string>("");
    const [regNo, setRegNo] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [repeatPass, setRepeatPass] = useState<string>("");

    const registerDetails = [
        { name: "Name", value: name, type: "text", funct: setName, placeholder: "Enter your Name" },
        { name: "Registration Number", value: regNo, type: "text", funct: setRegNo, placeholder: "Enter your Reg. No." },
        { name: "Email", value: email, type: "email", funct: setEmail, placeholder: "Enter your Email" },
        { name: "Password", value: pass, type: "password", funct: setPass, placeholder: "Enter your Password" },
        { name: "Repeat Password", value: repeatPass, type: "password", funct: setRepeatPass, placeholder: "Repeat your Password" }
    ];

    function handleSubmit() {
        if (!email || !pass || !repeatPass || !name || !regNo ) {
            alert("Please fill all the fields");
            return;
        }
        if (pass !== repeatPass) {
            // handleReset();
            alert("Passwords do not match");
            setPass('');
            setRepeatPass('');
            return;
        }
        handleReset();
    }
    
    function handleReset() {
        setEmail("");
        setPass("");
        setRepeatPass("");
        setName("");
        setRegNo("");
    }

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#EEEEEE] p-3">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center bg-[#3A98B9] py-10 px-7 md:p-10 md:pb-7 gap-5 text-[#FFF1DC] rounded-3xl w-full md:w-auto">
                {registerDetails.map((detail, index) => (
                    <label key={index} className="flex flex-col gap-1 md:text-lg w-full">
                        {detail.name}
                        <input className="p-2 rounded-xl placeholder:text-gray-400 md:w-[400px] text-black" onChange={(e) => detail.funct(e.target.value)} type={detail.type} placeholder={detail.placeholder} />
                        <Link to="/login" className={`${detail.name === "Repeat Password" ? "" : "hidden"} hover:underline self-end text-[13px] md:text-base`}>Already a User?</Link>
                    </label>
                ))}
                <button type="submit" className="bg-gray-700 p-3 px-4 rounded-xl md:text-lg">Submit</button>
            </form>
        </div>
    )
}

export default Register;