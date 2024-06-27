import { useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import Sidebar from "../../../components/Sidebar";
import { useProjectsContext } from "../../../contexts/projectsContext";
import ModalProjects from "./ModalProjects";

const Projects = () => {
  const { projects, getListProjects } = useProjectsContext();

  useEffect(() => {
    getListProjects();
  }, []);

  useEffect(() => {
    console.log("projects", projects);
  }, [projects]);

  return (
    <section>
      <Container fluid className="login-section" id="projects">
        <Container className="mt-5">
          <Sidebar />
          <Row className="" style={{ marginLeft: "50px" }}>
            <Col md={4} className="login-col">
              <h2>Conteudo Projects</h2>

              <ModalProjects />

              <Table striped bordered hover style={{ width: "800px" }}>
                <thead>
                  <tr>
                    <th>Titulo</th>
                    <th>Descrição</th>
                    <th>demo</th>
                    <th>github</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p) => (
                    <tr key={p.id}>
                      <td>{p.title}</td>
                      <td
                        style={{
                          maxWidth: "200px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {p.description}
                      </td>
                      <td
                        style={{
                          maxWidth: "100px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {p.demo}
                      </td>
                      <td
                        style={{
                          maxWidth: "100px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {p.github}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
};

export default Projects;
