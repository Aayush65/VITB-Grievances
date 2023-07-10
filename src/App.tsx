import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainSite from "./MainSite";
import { Login, Register, ServerError, NonExistant, ChangePassword, Profile, ForgetPassword, LoadingSpinner } from "./components";
import { useState, useEffect } from "react";

function App() {
	const [ isServerActive, setIsServerActive ] = useState(false);
	const [ isTimeout, setIsTimeout ] = useState(false);

	useEffect(() => {
		async function ping() {
			try {
				await fetch("https://grievance-server.aayush65.com/ping", { method: 'get' });
				setIsServerActive(true);
				return true;
			} catch (error) {
				setIsServerActive(false);
				return false;
			}	
		}

		ping();
		let i = 0;
		const id = setInterval(async () => {
			const res = await ping();
			if (res || i > 10)
				clearInterval(id);
			if (i > 10)
				setIsTimeout(true);
			i ++;
		}, 500);
		ping();
	}, [])

	return isServerActive ? (
		<Router>
			<Routes>
				<Route path="/" element={<MainSite />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/change-password" element={<ChangePassword />} />
				<Route path="/forget-password" element={<ForgetPassword />} />
				<Route path="/*" element={<NonExistant />} />
			</Routes>
		</Router>
	) : isTimeout ? <ServerError /> : <div className="w-screen h-screen flex justify-center items-center p-5 md:p-10 text-xl md:text-2xl font-semibold gap-3"><LoadingSpinner />Loading...</div>
}

export default App