import { BrowserRouter,  Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Home from "./pages/Home";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";

const Router = () => {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;