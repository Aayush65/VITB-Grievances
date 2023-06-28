import { useContext, useState, useEffect } from "react";
import { context } from "./context"
import { close, menu, user } from "../assets";
import { useNavigate } from "react-router-dom";


const UserIcon = (props: { isUserMenuShowing: boolean, setIsUserMenuShowing: (menuStatus: boolean) => void }) => {
    const { isUserMenuShowing, setIsUserMenuShowing } = props;
    const navigate = useNavigate();
    
    function handleSignOut() {
        localStorage.clear();
        navigate("/login");
    }

    return (
        <div className="flex items-end justify-end right-5 md:right-7 lg:right-10 fixed bg-[#3A98B9] hover:cursor-pointer select-none" onClick={() => setIsUserMenuShowing(!isUserMenuShowing)}>
            <div className="bg-white flex items-end justify-center w-8 h-8 md:w-10 md:h-10 rounded-full overflow-clip">
                <img className="w-7 h-7 md:w-9 md:h-9 pointer-events-none" src={user} alt="user" />
            </div>
            <div className={`${isUserMenuShowing ? "": "hidden"} rounded-xl p-5 md:px-8 md:py-10 bg-[#22667f] absolute top-11 flex flex-col justify-center items-start gap-2 md:gap-4 md:text-lg text-[#FFF1DC]`}>
                <div className="" onClick={() => navigate("/profile")}>Profile</div>
                <div className="whitespace-nowrap" onClick={() => navigate("/change-password")}>Change Password</div>
                <div className="" onClick={handleSignOut}>Signout</div>
            </div>
        </div>
    )
}


const Navbar = () => {
    const [ isMenuShowing, setIsMenuShowing ] = useState(false);
    const [ isUserMenuShowing, setIsUserMenuShowing ] = useState(false);

    const { currPortal, setCurrPortal } = useContext(context);
    const navigate = useNavigate();

    const navLinks = ["Ongoing Grievances", "Submit a Grievance", "Anonymous Complaints/Suggestions"]

    useEffect(() => {
        if (isMenuShowing && isUserMenuShowing) 
            setIsUserMenuShowing(false);
    }, [isMenuShowing])

    useEffect(() => {
        if (isUserMenuShowing && isMenuShowing) 
            setIsMenuShowing(false);
    }, [isUserMenuShowing])

    function handleLinkChange(navLink: string) {
        if (window.location.pathname !== '/') 
            navigate('/');
        setCurrPortal(navLink)
    }

    return (
        <div className="w-full">
            <div className="hidden md:flex justify-evenly items-center w-full fixed py-5 pl-5 pr-16 bg-[#3A98B9]">
                {navLinks.map((navLink, index) => (
                    <div key={index} onClick={() => handleLinkChange(navLink)} className={`${currPortal === navLink ? "font-semibold" : ""} text-[#FFF1DC] text-xl hover:cursor-pointer w-1/3 text-center`}>{navLink}</div>
                ))}
                <UserIcon isUserMenuShowing={isUserMenuShowing} setIsUserMenuShowing={setIsUserMenuShowing} />
            </div>
            <div className="md:hidden flex justify-start items-center w-full fixed py-5 pl-5 bg-[#3A98B9]">
                <img src={isMenuShowing ? close : menu} alt="menu icon" className="w-5 h-5" onClick={() => setIsMenuShowing(!isMenuShowing)}/>
                <div className={`${isMenuShowing ? "flex" : "hidden"} rounded-xl p-5 bg-[#22667f] absolute top-11 flex flex-col justify-center items-start gap-2 text-[#FFF1DC] w-2/3`}>
                    {navLinks.map((navLink, index) => (
                        <div key={index} onClick={() => handleLinkChange(navLink)} className={`${currPortal === navLink ? "font-semibold" : ""} text-[#FFF1DC] whitespace-nowrap hover:cursor-pointer w-1/3 text-center`}>{navLink !== "Anonymous Complaints/Suggestions" ? navLink : "Anonymous Complaints"}</div>
                    ))}
                </div>
                <UserIcon isUserMenuShowing={isUserMenuShowing} setIsUserMenuShowing={setIsUserMenuShowing} />
            </div>
        </div>
    )
}

export default Navbar