import { useContext, useEffect } from "react";
import { AnonymousComplaint, AdminNavbar, Navbar, OngoingGrievances, SubmitGrievance, Grievances, ModifyAdmins } from "./components";
import { context } from "./components/context";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "./utils/getAccessToken";


const MainSite = () => {
    const { currPortal, currAdminPortal } = useContext(context);

    useEffect(() => {
        if (!localStorage.length)
            return;
        getAccessToken();
    }, [])

    return !localStorage.getItem("accessToken") ? (
        <Navigate to='/login' />
    ) : localStorage.getItem("isSuperUser") ? (
        <div className='w-full min-h-screen bg-[#EEEEEE]'>
            <AdminNavbar />
            { !currAdminPortal || currAdminPortal === "All Grievances" ? <Grievances /> : <ModifyAdmins /> }
        </div>
    ) : (
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
    )
}

export default MainSite