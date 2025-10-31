import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import SignUp from "./Components/SignUp";
import Dashboard from "./Components/Dashboard";

function App() {
const token = localStorage.getItem("token");

return ( <Router> <Routes>
{/* Redirect to dashboard if already logged in */}
<Route path="/" element={token ? <Navigate to="/dashboard" /> : <Home />} />
<Route path="/signup" element={<SignUp />} />
<Route path="/dashboard" element={<Dashboard />} /> </Routes> </Router>
);
}

export default App;
