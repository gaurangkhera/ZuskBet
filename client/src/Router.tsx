import { BrowserRouter,  Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Home from "./pages/Home";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import Bet from "./pages/Betting/Bet";
import Wallet from "./pages/Betting/Wallet";

const Router = () => {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bet" element={<Bet />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;