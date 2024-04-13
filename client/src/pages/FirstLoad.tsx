import { LoadingSpinner } from "../components"
import { firstLoadComment } from "../constants"

const FirstLoad = () => {

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center p-5 md:p-10 gap-3 md:gap-5">
			<div className="flex text-xl md:text-2xl font-semibold gap-3"><LoadingSpinner />Loading...</div>
			<p className="italic text-md md:text-xl text-center">{firstLoadComment}</p>
		</div>
    )
}

export default FirstLoad