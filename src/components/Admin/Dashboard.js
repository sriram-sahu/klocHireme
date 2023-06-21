import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/notFound");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <div>dashboard</div>
    </div>
  );
};

export default Dashboard;
