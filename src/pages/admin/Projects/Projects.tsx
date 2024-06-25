import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "../../../components/Sidebar";
import ModalProjects from "./ModalProjects";

const Projects = () => {
  return (
    <section>
      <Container fluid className="login-section" id="projects">
        <Container className="mt-5">
          <Sidebar />
          <Row className="justify-content-md-center">
            <Col md={4} className="login-col">
              <h2>Conteudo Projects</h2>

              <ModalProjects />
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
};

export default Projects;
