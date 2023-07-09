import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ForgetPassword = () => {

    const [ userNum, setUserNum ] = useState<string>("");
    const [ isUserNumSubmitted, setIsUserNumSubmitted ] = useState<boolean>(false);
    const [ isOTPSent, setIsOTPSent ] = useState<boolean>(false);
    
    const [ otp, setOtp ] = useState<string>("");
    const [ newPass, setNewPass ] = useState<string>("");
    const [ repeatNewPass, setRepeatNewPass ] = useState<string>("");
    const [ isOTPSubmitted, setIsOTPSubmitted ] = useState<boolean>(false);

    const [ alert, setAlert ] = useState<[string, boolean]>(["", false]);
    const navigate = useNavigate();
    
    // sends regNo or empNo to the backend for otp generation
    useEffect(() => {
        async function sendOTP() {
            const headers = {
                'Content-type': 'application/json; charset=UTF-8',
            }
            const response = await fetch(`https://grievance-server.aayush65.com/forget-password/${userNum}`, { method: 'GET', headers })
            const data = await response.json();
            if (data.message === "OTP Sent Successfully"){
                setAlert([data.message, true]);
                setIsOTPSent(true);
            } else if (data.message === "OTP Already Sent") {
                setAlert([data.message, false]);
                setIsOTPSent(true);
            } else {
                setAlert([data.message, false]);
                handleReset()
            }
        }

        if (!isUserNumSubmitted)
            return;
        sendOTP();
    }, [isUserNumSubmitted])

    // checks if otp is correct
    useEffect(() => {
        async function sendOTP() {
            const headers = {
                'Content-type': 'application/json; charset=UTF-8',
            }
            const body = JSON.stringify({ otp, userNum, newPass })
            const response = await fetch(`https://grievance-server.aayush65.com/otp-check/`, { method: 'POST', headers, body })
            const data = await response.json();
            if (data.message === "Password Changed Successfully"){
                setAlert([data.message, true]);
                setTimeout(() => navigate('/'), 3000);
            } else if (data.message === "Not Found") {
                setAlert([data.message, false]);
                handleReset();
            } else {
                setAlert([data.message, false]);
                setOtp('');
            }
        }
        if (!isOTPSubmitted)
            return;
        sendOTP();
    }, [isOTPSubmitted])

    // setTimeout for the alert message
    useEffect(() => {
        if (!alert[0])
            return;
        setTimeout(() => setAlert(['', false]), alert[0].length * 100);
    }, [alert])

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        // regex check
        if (isUserNumSubmitted) {
            if (!newPass || !repeatNewPass) {
                setAlert(["Please fill all the fields", false]);
                return;
            }
            if (newPass !== repeatNewPass) {
                setAlert(["Passwords do not match", false]);
                return;
            }
            setIsOTPSubmitted(true);
        } else {
            setUserNum(userNum.toUpperCase());
            setIsUserNumSubmitted(true);
        }
    }
    
    function handleReset() {
        setIsOTPSent(false);
        setIsUserNumSubmitted(false);
        setNewPass('');
        setRepeatNewPass('');
    }

    return (
        <div className="">
            <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#EEEEEE] p-3">
                <div className={`${alert[0] ? "": "hidden"} fixed ${alert[1] ? "bg-green-500" : "bg-red-500"} text-white p-4 text-lg rounded-lg top-0 mx-auto flex gap-5`}>
                    {alert[0]}
                    <button className="font-black z-10" onClick={() => setAlert(['', false])}>x</button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center bg-[#3A98B9] py-10 px-7 md:p-10 md:pb-7 gap-5 text-[#FFF1DC] rounded-3xl w-full md:w-auto">
                    <label className={`${isOTPSent ? "hidden" : ""} flex flex-col gap-1 md:text-lg w-full`}>
                        Registration/Employee Number
                        <input type="text" placeholder="Enter your Registration/Employee Number" value={userNum} className="p-2 rounded-xl placeholder:text-gray-400 md:w-[400px] text-black" onChange={(e) => setUserNum(e.target.value)} />
                    </label>
                    <label className={`${isOTPSent ? "" : "hidden"} flex flex-col gap-1 md:text-lg w-full`}>
                        OTP
                        <input type="text" placeholder="Enter your OTP" value={otp} className="p-2 rounded-xl placeholder:text-gray-400 md:w-[400px] text-black" onChange={(e) => setOtp(e.target.value)} />
                    </label>
                    <label className={`${isOTPSent ? "" : "hidden"} flex flex-col gap-1 md:text-lg w-full`}>
                        New Password
                        <input type="text" placeholder="Enter your OTP" value={newPass} className="p-2 rounded-xl placeholder:text-gray-400 md:w-[400px] text-black" onChange={(e) => setNewPass(e.target.value)}/>
                    </label>
                    <label className={`${isOTPSent ? "" : "hidden"} flex flex-col gap-1 md:text-lg w-full`}>
                        Repeat Password
                        <input type="text" placeholder="Enter your OTP" value={repeatNewPass} className="p-2 rounded-xl placeholder:text-gray-400 md:w-[400px] text-black" onChange={(e) => setRepeatNewPass(e.target.value)}/>
                    </label>
                    <button type="submit" className="bg-gray-700 p-3 px-4 rounded-xl md:text-lg active:scale-105">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword;