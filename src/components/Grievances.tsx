import { useEffect, useState } from "react";
import { getAccessToken } from "../utils/getAccessToken";


const Grievances = () => {
    const [ complaints, setComplaints ] = useState([{ regNo: "RegNo", subject: "Subject", status: "Status", complaint: "Complaint", relatedDepts: ["Depts"] }]);
    
    useEffect(() => {
        async function fetchData() {
            try {
                const headers = {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-type': 'application/json; charset=UTF-8',
                }
                const response = await fetch(`http://localhost:3000/grievances`, { method: 'GET', headers});
                const data = await response.json();
                if (data.message && data.message === "Unauthorised Access") {
                    if (await getAccessToken())
                        fetchData();
                    return;
                } else if (data) {
                    setComplaints([{ regNo: "RegNo", subject: "Subject", status: "Status", complaint: "Complaint", relatedDepts: ["Depts"] }, ...data]);
                }
            } catch(err) {
                console.error(err);
            };
        }
        fetchData();
    }, []);


    return (
        <div className="w-screen min-h-screen p-20 flex flex-col justify-center items-center">
            <h1 className="p-5 md:p-10 text-xl md:text-2xl font-semibold">Your complaints</h1>
            <div className="md:w-4/5 lg:w-2/3">
                {complaints.map((complaint, index) => (
                    <div key={index} className={`flex ${index ? "": "font-bold"}`}>
                        <div className="border-black border-2 w-[5%] text-center">{index ? index: ""}</div>
                        <div className="border-black border-2 w-[30%]">{complaint.regNo || "Anonymous"}</div>
                        <div className="border-black border-2 w-[30%]">{complaint.subject}</div>
                        <div className="border-black border-2 w-[50%]">{complaint.complaint}</div>
                        <div className="border-black border-2 w-[50%]">{String(complaint.relatedDepts)}</div>
                        <div className="border-black border-2 w-[10%]">{complaint.status}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Grievances;