import { Navbar } from ".";

const NonExistant = () => {
    return (
        <div className="flex min-h-screen justify-center">
            <Navbar />
            <div className="flex flex-col justify-center items-center">
                <div className="flex text-xl items-center justify-center"> Sorry! This page doesn't exists</div> 
                <img src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000" alt="not found" className="w-72 h-72 md:w-96 md:h-96"/>     
            </div>
        </div>
    )
}

export default NonExistant;