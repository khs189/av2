import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import PhoneAuth from "./tabs/phoneAuth";
import Home from "./tabs/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/phone-auth" element={<PhoneAuth />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-blue-500 text-white">
      <h1 className="text-6xl font-bold mb-6">HG 전자투표</h1>
      <button
        onClick={() => navigate("/phone-auth")}
        className="bg-yellow-300 text-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition"
      >
        시작하기
      </button>
    </div>
  );
}

export default App;
