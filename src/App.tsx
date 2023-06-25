import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainSite from "./MainSite";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainSite />} />
      </Routes>
    </Router>
  )
}

export default App