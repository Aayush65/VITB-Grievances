import { useContext } from "react";
import { context } from "./context"
import { user } from "../assets";

const Navbar = () => {
    const { currPortal, setCurrPortal } = useContext(context);

    const navLinks = ["Ongoing Grievances", "Submit a Grievance", "Anonymous Complaints/Suggestions"]

    return (
        <div className="flex justify-evenly items-center w-full fixed py-5 pl-5 pr-16 bg-[#3A98B9]">
            {navLinks.map((navLink, index) => (
                <div key={index} onClick={() => setCurrPortal(navLink)} className={`${currPortal === navLink ? "font-semibold" : ""} text-[#FFF1DC] text-xl hover:cursor-pointer w-1/3 text-center`}>{navLink}</div>
            ))}
            <div className="flex items-end justify-center right-5 md:right-7 lg:right-10 overflow-hidden fixed rounded-full w-10 h-10 bg-[#EEEEEE] hover:cursor-pointer">
                <img className="w-9 h-9" src={user} alt="user"/>
            </div>
        </div>
    )
}

export default Navbar