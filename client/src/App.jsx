import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Jobs from "./pages/Jobs";
import Navbar from "./components/shared/Navbar";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/job" element={<Jobs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
