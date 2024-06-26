import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Profile from "./pages/Profile.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VotingPage from "./pages/VotingPage.jsx";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import UpdateCandidatePage from "./pages/UpdateCandidatePage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer style={{ padding: "1rem" }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/voting" element={<VotingPage />} />
        <Route
          path="/update-candidate/:candidateId"
          element={<UpdateCandidatePage />}
        />
        <Route path="/update-profile" element={<UpdateProfile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
