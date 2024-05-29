import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<any>(null);

  useEffect(() => {
    const _auth = getAuth();
    setAuth(_auth);

    onAuthStateChanged(_auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, []);

  return (
    <div className="Dashboard">
      <p>Dashboard</p>
    </div>
  );
};

export default Dashboard;
