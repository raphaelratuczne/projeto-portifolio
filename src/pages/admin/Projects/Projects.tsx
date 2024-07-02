import { useEffect, useRef } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { MdEdit, MdOutlineDeleteForever } from "react-icons/md";
import Sidebar from "../../../components/Sidebar";
import {
  IProject,
  useProjectsContext,
} from "../../../contexts/projectsContext";
import ModalProjects from "./ModalProjects";

const Projects = () => {
  const { projects, getListProjects } = useProjectsContext();
  const modalRef = useRef(null);

  useEffect(() => {
    getListProjects();
  }, []);

  useEffect(() => {
    console.log("projects", projects);
  }, [projects]);

  function openModal(proj: IProject) {
    if (modalRef.current) {
      //@ts-ignore
      modalRef.current.handleOpenAndFillModal(proj);
    }
  }

  return (
    <section>
      <Container fluid className="login-section" id="projects">
        <Container className="mt-5">
          <Sidebar />
          <Row className="" style={{ marginLeft: "50px" }}>
            <Col md={4} className="login-col">
              <h2>Conteudo Projects</h2>

              <ModalProjects ref={modalRef} />

              <Table striped bordered hover style={{ width: "800px" }}>
                <thead>
                  <tr>
                    <th>Titulo</th>
                    <th>Descrição</th>
                    <th>demo</th>
                    <th>github</th>
                    <th></th>
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
                      <td>
                        <Button
                          title="Alterar projeto"
                          variant="primary"
                          onClick={() => openModal(p)}
                        >
                          <MdEdit />
                        </Button>
                        <MdOutlineDeleteForever />
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
