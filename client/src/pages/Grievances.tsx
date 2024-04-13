import { useContext, useEffect, useState } from "react";
import { getAccessToken } from "../utils/getAccessToken";
import { context } from "../context";
import { dropdown } from "../assets";
import { LoadingSpinner } from "../components";


interface ComplaintType {
    _id: string,
    regNo: string,
    subject: string,
    complaint: string,
    relatedDepts: string[],
    status: string,
    remarks: string[][]
}

interface BodyType {
    _id: string;
    status: string;
    remark: string;
}

const Grievances = () => {
    const [ complaints, setComplaints ] = useState<ComplaintType[]>([]);
    const [ activeComplaintIndex, setActiveComplaintIndex ] = useState<number>(-1);
    const [ changeStatus, setChangeStatus ] = useState<boolean>(false);
    const [ complaintToDelete, setComplaintToDelete ] = useState<string>("");
    const [ body, setBody ] = useState<BodyType>({} as BodyType);
    const [ newRemark, setNewRemark ] = useState<string>('');
    const [ showClosed, setShowClosed ] = useState<boolean>(true);

    const { setName, setEmpNo, setRegNo, isSuperUser, setIsSuperUser } = useContext(context);

    useEffect(() => {
        async function fetchData() {
            try {
                const headers = {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-type': 'application/json; charset=UTF-8',
                }
                const response = await fetch(`https://grievance-server.aayush65.com/grievances`, { method: 'GET', headers});
                const data = await response.json();
                if (data.message && data.message === "Unauthorised Access") {
                    const values = await getAccessToken();
                    if (values) {
                        setName(values.name);
                        setEmpNo(values.empNo);
                        setRegNo(values.regNo);
                        setIsSuperUser(values.isSuperUser);
                        fetchData();
                    }
                    return;
                } else if (data) {
                    if (data.length === 0)
                        data.push({_id: '0'});
                    setComplaints(data);
            }
            } catch(err) {
            };
        }
        if (complaints.length) 
            return;
        fetchData();
    }, [complaints]);

    useEffect(() => {
        async function sendChangeStatusRequest() {
            try {
                const headers = {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-type': 'application/json; charset=UTF-8',
                };
                const response = await fetch(`https://grievance-server.aayush65.com/grievances/change-status`, { method: 'POST', headers, body: JSON.stringify(body) });
                const data = await response.json();
                if (data.message && data.message === "Unauthorised Access") {
                    const values = await getAccessToken();
                    if (values) {
                        setName(values.name);
                        setEmpNo(values.empNo);
                        setRegNo(values.regNo);
                        setIsSuperUser(values.isSuperUser);
                        sendChangeStatusRequest();
                    }
                    return;
                }
                handleReset();
            } catch(error) {
            }
        }
        if (!changeStatus)
            return;
        sendChangeStatusRequest();
    }, [changeStatus])

    useEffect(() => {
        async function sendDeleteRequest() {
            try {
                const headers = {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-type': 'application/json; charset=UTF-8',
                };
                const response = await fetch(`https://grievance-server.aayush65.com/grievances/${complaintToDelete}`, { method: 'DELETE', headers });
                const data = await response.json();
                if (data.message && data.message === "Unauthorised Access") {
                    const values = await getAccessToken();
                    if (values) {
                        setName(values.name);
                        setEmpNo(values.empNo);
                        setRegNo(values.regNo);
                        setIsSuperUser(values.isSuperUser);
                        sendDeleteRequest();
                    }
                    return;
                }
                handleReset();
            } catch(error) {
            }
        }
        if (!complaintToDelete)
            return;
        sendDeleteRequest();
    }, [complaintToDelete])

    function handleActiveComplaints(index: number) {
        if (activeComplaintIndex === index)
            setActiveComplaintIndex(-1);
        else {
            setActiveComplaintIndex(index);
            if (complaints[index].status === "pending") {
                handleChangeStatus(complaints[index]._id, "seen");
                return;
            }
        }
        
    }

    function addRemarks(_id: string) {
        if (!newRemark)
            return;
        setBody({ _id, remark: newRemark} as BodyType);
        setChangeStatus(true);
    }

    function handleChangeStatus(_id: string, status: string) {
        setBody({ _id, status } as BodyType);
        setChangeStatus(true);
    }

    function handleReset() {
        setComplaints([]);
        setChangeStatus(false);
        setBody({} as BodyType);
        setNewRemark('');
        setComplaintToDelete('');
    }

    return (
        <div className="max-w-screen min-h-screen px-4 py-20 md:p-20 flex flex-col justify-center items-center">
            <h1 className="mt-5 md:mt-10 mb-3 md:mb-6 p-2 text-xl md:text-2xl font-semibold">{
                complaints.length && complaints[0]._id === '0' ? "You have no complaints" : 
                complaints.length ? "Your complaints" : 
                <div className="flex gap-3"><LoadingSpinner />Loading...</div> 
            }</h1>
            <div className="w-full md:w-4/5 lg:w-2/3 flex justify-end mb-3 md:mb-5">
                <button className={`${complaints.length ? "" : "hidden"} p-2 md:p-3 bg-[#3A98B9] text-[#FFF1DC] rounded-xl hover:scale-105 active:scale-110 text-sm md:text-base`} onClick={() => setShowClosed(!showClosed)} >{showClosed ? "Hide Closed" : "Show Closed"}</button>
            </div>
            <div className="w-full md:w-4/5 lg:w-2/3">
                {complaints.map((complaint, index) => (
                    <div key={index} className={`${complaint.status === "closed" && !showClosed ? "hidden" : ""} flex flex-col`} >
                        <div className={`flex items-center justify-around p-2 md:p-4 border-black border-2 rounded-xl text-sm md:text-base cursor-pointer ${complaint._id === '0' ? "hidden": ""} ${activeComplaintIndex === index ? "bg-[#bbd8e2]": "" }`} onClick={() => handleActiveComplaints(index)} >
                            <div className={`w-[20%] truncate text-ellipsis`}>{complaint._id}</div>
                            <div className={`w-[40%] truncate text-ellipsis`}>{complaint.subject}</div>
                            <div className={`group w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center transition duration-300 ${complaint.status === "pending" ? "bg-red-500" : complaint.status === "seen" ? "bg-orange-500" : complaint.status === "opened" ? 'bg-yellow-500' : `bg-green-500`}`}><span className="hidden bg-gray-600 text-white p-1 rounded-lg md:group-hover:block md:transform md:-translate-y-8">{complaint.status}</span></div>
                            <img src={dropdown} alt="dropdown" className={`w-[5%] ${activeComplaintIndex === index ? "invisible" : ""}`} />
                        </div>
                        <div className={`${activeComplaintIndex === index ? "bg-[#bbd8e2]" : "hidden"} flex flex-col items-start justify-center p-4 md:py-6 md:px-10 border-black border-2 rounded-xl text-sm md:text-base gap-1`}>
                            {[
                                { title: "Complaint Id:", value: complaint._id },
                                { title: "Complainee:", value: complaint.regNo || "Anonymous" },
                                { title: "Status:", value: complaint.status },
                                { title: "Tags:", value: String(complaint.relatedDepts) },
                                { title: "Subject:", value: complaint.subject },
                                { title: "Content:", value: complaint.complaint },
                             ].map((values, index) => (
                                <div key={index} className={`w-full flex items-center ${values.title === "Status:" ? "md:hidden" : "" }`}>
                                    <div className="w-[33%] md:w-[15%] font-bold">{values.title}</div>
                                    <div className="max-w-[67%]">{values.value}</div>
                                </div>
                            ))}
                            {complaint.remarks ? <div className="w-full flex">
                                <div className="w-[33%] md:w-[15%] font-bold">Remarks:</div>
                                <div className="max-w-[67%] flex flex-col">
                                    {complaint.remarks.map((remark, index) => (
                                        <div key={index}>{remark[0] + " - " + remark[1]}</div>
                                    ))}
                                </div>
                            </div> : null}
                            <input type="text" onChange={(e) => setNewRemark(e.target.value)} value={newRemark} className="bg-[#EEEEEE] ml-[15%] w-[40%] rounded-md p-1" placeholder="Add remarks" />
                            <div className="flex items-center justify-center md:justify-end w-full gap-5 text-sm mt-3 md:text-base">
                                <button onClick={() => addRemarks(complaint._id)} className="p-2 md:p-3 bg-[#3A98B9] text-[#FFF1DC] rounded-xl hover:scale-105 active:scale-110">Add Remarks</button>
                                <button onClick={() => handleChangeStatus(complaint._id, "closed")} className="p-2 md:p-3 bg-[#3A98B9] text-[#FFF1DC] rounded-xl hover:scale-105 active:scale-110">Mark as Closed</button>
                                <button onClick={() =>  setComplaintToDelete(complaint._id)} className={`${isSuperUser ? "" : "hidden"} p-2 md:p-3 bg-[#3A98B9] text-[#FFF1DC] rounded-xl hover:scale-105 active:scale-110`}>Delete Complaint</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Grievances;