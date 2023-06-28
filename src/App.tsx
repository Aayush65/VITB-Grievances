import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainSite from "./MainSite";
import { Login, Register, ServerError, NonExistant } from "./components";
import { useState, useEffect } from "react";

function App() {
	const [isServerActive, setIsServerActive] = useState(false);

	useEffect(() => {
		fetch("http://localhost:3000/ping", { method: 'get'})
			.then(() => setIsServerActive(true))
			.catch(() => setIsServerActive(false));
	}, [])

	return isServerActive ? (
		<Router>
			<Routes>
				<Route path="/" element={<MainSite />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/*" element={<NonExistant />} />
			</Routes>
		</Router>
	) : <ServerError />
}

export default App