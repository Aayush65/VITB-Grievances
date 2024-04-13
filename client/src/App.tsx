import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainSite from "./MainSite";
import { Login, Register, ServerError, NonExistant, ChangePassword, Profile, ForgetPassword, FirstLoad } from "./pages";
import { useState, useEffect } from "react";
import { serverURL } from "./constants";

function App() {
	const [ isServerActive, setIsServerActive ] = useState(false);
	const [ isTimeout, setIsTimeout ] = useState(false);

	useEffect(() => {
		async function ping() {
			try {
				await fetch(`${serverURL}/ping`, { method: 'get' });
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
	) : isTimeout ? <ServerError /> : <FirstLoad />
}

export default App