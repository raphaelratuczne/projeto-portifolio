import { Button, Nav } from "react-bootstrap";
import { useAuthContext } from "../contexts/authContext";

const Sidebar = () => {
  const { logout } = useAuthContext();
  return (
    <div className="sidebar" style={{ marginTop: "100px" }}>
      <Nav defaultActiveKey="/dashboard" className="flex-row">
        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
        <Nav.Link href="/about-form">About</Nav.Link>
        <Nav.Link href="/projects-adm">Projects</Nav.Link>
        <Nav.Link href="/resume-form">Resume</Nav.Link>
      </Nav>
      <Button variant="primary" type="button" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default Sidebar;
