import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainSite from "./MainSite";
import { Login, Register } from "./components";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainSite />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes> 
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes> 
    </Router>
  )
}

export default App