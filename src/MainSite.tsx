import { useContext, useEffect } from "react";
import { AnonymousComplaint, Navbar, OngoingGrievances, SubmitGrievance } from "./components";
import { context } from "./components/context";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "./utils/getAccessToken";

const MainSite = () => {
    const { currPortal } = useContext(context);

    useEffect(() => {
        if (!localStorage.length)
            return;
        getAccessToken();
    }, [])

    return localStorage.getItem("accessToken") ? (
        <div className='w-full min-h-screen bg-[#EEEEEE]'>
            <Navbar />
            {
                !currPortal || currPortal === "Ongoing Grievances" ? 
                <OngoingGrievances /> : 
                currPortal === "Submit a Grievance" ?
                <SubmitGrievance /> :
                <AnonymousComplaint />
            }

        </div>
    ) : <Navigate to='/login' />
}

export default MainSite