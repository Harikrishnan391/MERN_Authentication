import SignUp from "../src/component/SignUp";
import SignIn from "../src/component/SignIn";
import { Routes, Route } from "react-router-dom";
import Home from "../src/component/Home";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default Routers;
