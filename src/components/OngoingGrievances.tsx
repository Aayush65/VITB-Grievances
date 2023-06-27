import { useEffect } from "react";
import { getAccessToken } from "../utils/getAccessToken";


const OngoingGrievances = () => {
    // const [ complaints, setComplaints ] = useState([]);
    const regNo = localStorage.getItem('regNo');
    
    useEffect(() => {
        async function fetchData() {
            try {
                const headers = {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-type': 'application/json; charset=UTF-8',
                }
                const response = await fetch(`http://localhost:3000/grievances/${regNo}`, { method: 'GET', headers})
                const data = await response.json();
                if (data.message && data.message === "Unauthorised Access") {
                    if (await getAccessToken())
                        fetchData();
                    return;
                } else if (data) {
                    // setcomplaints
                }
            } catch(err) {
                console.error(err);
            };
        }
        fetchData();
    }, []);


    const complaints = [
        { 
            subject: "Subject",
            status: "Status",
            content: "Content",
        },
        { 
            subject: "Lorem ipsum dolor sit amet.",
            status: "Pending",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisi in varius faucibus, nisl nisl egestas nunc, eu ullamcorper nisi nisl eu nisl. Sed id nisl nec eros ultr",
        }
    ];

    return (
        <div className="w-screen min-h-screen p-20 flex flex-col justify-center items-center">
            <h1 className="p-10 text-2xl font-semibold">Your complaints</h1>
            <div className="md:w-4/5 lg:w-2/3">
                {complaints.map((complaint, index) => (
                    <div key={index} className={`flex ${index ? "": "font-bold"}`}>
                        <div className="border-black border-2 w-[5%] text-center">{index ? index: ""}</div>
                        <div className="border-black border-2 w-[30%]">{complaint.subject}</div>
                        <div className="border-black border-2 w-[50%]">{complaint.content}</div>
                        <div className="border-black border-2 w-[10%]">{complaint.status}</div>
                    </div>
                ))}
            </div>
            <div className="">

            </div>
        </div>
    )
}

export default OngoingGrievances;