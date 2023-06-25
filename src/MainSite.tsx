import {  useContext } from "react";
import { AnonymousComplaint, Navbar, OngoingGrievances, SubmitGrievance } from "./components";
import { context } from "./components/context";

const MainSite = () => {
    const { currPortal } = useContext(context);

    return (
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
    )
}

export default MainSite