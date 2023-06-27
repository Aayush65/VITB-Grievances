import { useContext } from "react";
import { AnonymousComplaint, Navbar, OngoingGrievances, SubmitGrievance } from "./components";
import { context } from "./components/context";
import { Navigate } from "react-router-dom";

const MainSite = () => {
    const { currPortal, isLoggedIn } = useContext(context);
    const accessAllowed = localStorage.getItem("accessToken") ? true: false;

    return accessAllowed ? (
        <div className='w-full min-h-screen bg-[#EEEEEE]'>
            <Navbar />
            {
                currPortal === "Ongoing Grievances" ? 
                <OngoingGrievances /> : 
                currPortal === "Submit a Grievance" ?
                <SubmitGrievance /> :
                <AnonymousComplaint />
            }

        </div>
    ) : <Navigate to='./login' />
}

export default MainSite