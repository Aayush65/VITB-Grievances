import { Navbar } from ".";
import { error404 } from "../assets";

const NonExistant = () => {
    return (
        <div className="">
            <Navbar />
            <div className="min-h-screen flex flex-col justify-center items-center">
                <div className="flex text-xl md:text-3xl items-center justify-center"> Sorry! This page doesn't exists</div> 
                <img src={error404} alt="not found" className="w-72 h-72 md:w-96 md:h-96"/>     
            </div>
        </div>
    )
}

export default NonExistant;