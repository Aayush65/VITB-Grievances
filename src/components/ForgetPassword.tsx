// import { FormEvent, useContext, useEffect, useState } from "react";
// import { AdminNavbar, Navbar } from ".";
// import { getAccessToken } from "../utils/getAccessToken";
// import { context } from "../context";


const ForgetPassword = () => {
    // const [userNum, setUserNum] = useState<string>("")
    // const [alert, setAlert] = useState<[string, boolean]>(["", false]);
    // const [isOTPGenerated, setIsOTPGenerated] = useState<boolean>(false);
    // const [otpHash, setOtpHash] = useState<string>('');
    // const [enteredOTP, setEnteredOTP] = useState<string>('');
    // const [isOTPCorrect, setIsOTPCorrect] = useState<boolean>(false);

    // const { empNo, setName, setEmpNo, setRegNo, setIsSuperUser } = useContext(context);
    // // sending the regNo and getting the generated otpHash
    // useEffect(() => {
    //     async function gettingOTP() {
    //         try {
    //             const headers = {
    //                 'Content-type': 'application/json; charset=UTF-8',
    //             }
    //             const response = await fetch(`http://localhost:3000/forget-password/${userNum}`, { method: 'GET', headers })
    //             const data = await response.json();
    //             if (data.message === "Unauthorised Access") {
    //                 const values = await getAccessToken();
    //                 if (values) {
    //                     setName(values.name);
    //                     setEmpNo(values.empNo);
    //                     setRegNo(values.regNo);
    //                     setIsSuperUser(values.isSuperUser);
    //                     gettingOTP();
    //                 }
    //                 return; 
    //             } else if (data) {
    //                 setOtpHash(data.otpHash);
    //             } else {
    //                 handleReset();
    //             }
    //         } catch(err) {
    //             console.error(err);
    //             handleReset();
    //         };
    //     }
    //     if (!isOTPGenerated)
    //         return;
    //     gettingOTP();
    // }, [isOTPGenerated])

    // // setTimeout for the alert message
    // useEffect(() => {
    //     if (!alert[0])
    //         return;
    //     setTimeout(() => setAlert(['', false]), alert[0].length * 100);
    // }, [alert])

    // function handleSubmit(e: FormEvent) {
    //     e.preventDefault();
    //     setIsOTPGenerated(true);
    // }
    
    // function handleReset() {
    //     setUserNum('');
    //     setIsOTPGenerated(false);
    // }

    return (
        <div className="">
            {/* {!localStorage.getItem("accessToken") ? null : empNo ? <AdminNavbar /> : <Navbar />}
            <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#EEEEEE] p-3">
                <div className={`${alert[0] ? "": "hidden"} fixed ${alert[1] ? "bg-green-500" : "bg-red-500"} text-white p-4 text-lg rounded-lg top-0 mx-auto flex gap-5`}>
                    {alert[0]}
                    <button className="font-black z-10" onClick={() => setAlert(['', false])}>x</button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center bg-[#3A98B9] py-10 px-7 md:p-10 md:pb-7 gap-5 text-[#FFF1DC] rounded-3xl w-full md:w-auto">
                    <label className={`${otpHash ? "hidden" : ""} flex flex-col gap-1 md:text-lg w-full`}>
                        Registration/Employee Number
                        <input type="text" placeholder="Enter your Registration/Employee Number" value={userNum} className="p-2 rounded-xl placeholder:text-gray-400 md:w-[400px] text-black" onChange={(e) => setUserNum(e.target.value)} />
                    </label>
                    <label className={`${otpHash ? "" : "hidden"} flex flex-col gap-1 md:text-lg w-full`}>
                        OTP
                        <input type="text" placeholder="Enter your OTP" value={userNum} className="p-2 rounded-xl placeholder:text-gray-400 md:w-[400px] text-black" onChange={(e) => setEnteredOTP(e.target.value)} />
                    </label>
                    <label className={`${otpHash ? "" : "hidden"} flex flex-col gap-1 md:text-lg w-full`}>
                        New Password
                        <input type="text" placeholder="Enter your OTP" value={userNum} className="p-2 rounded-xl placeholder:text-gray-400 md:w-[400px] text-black" onChange={(e) => setEnteredOTP(e.target.value)} />
                    </label>
                    <button type="submit" className="bg-gray-700 p-3 px-4 rounded-xl md:text-lg active:scale-105">Submit</button>
                </form>
            </div> */}
        </div>
    )
}

export default ForgetPassword;