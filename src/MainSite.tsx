import { useContext, useEffect } from "react";
import { AnonymousComplaint, AdminNavbar, Navbar, OngoingGrievances, SubmitGrievance, Grievances, ModifyAdmins } from "./components";
import { context } from "./context";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "./utils/getAccessToken";


const MainSite = () => {
    const { empNo, currPortal, currAdminPortal, setName, setEmpNo, setRegNo, setIsSuperUser } = useContext(context);

    useEffect(() => {
        if (!localStorage.length)
            return;
        async function fetchToken() {
            const values = await getAccessToken();
            if (values) {
                setName(values.name);
                setEmpNo(values.empNo);
                setRegNo(values.regNo);
                setIsSuperUser(values.isSuperUser);
            }

        }
            
        fetchToken()
    }, [])

    return !localStorage.getItem("accessToken") ? (
        <Navigate to='/login' />
    ) : empNo ? (
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