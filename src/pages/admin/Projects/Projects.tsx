import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Sidebar from "../../../components/Sidebar";
import { useProjectsContext } from "../../../contexts/projectsContext";

const Projects = () => {
  const { saveProject } = useProjectsContext();

  const validated = false;
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [github, setGithub] = useState("");
  const [demo, setDemo] = useState("");
  // const [image, setImage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(async () => {
      await saveProject({
        title,
        description,
        github,
        demo,
      });
      setSaving(false);
      setTitle("");
      setDescription("");
      setGithub("");
      setDemo("");
      // setImage("");
    }, 1000);
  };

  return (
    <section>
      <Container fluid className="login-section" id="projects">
        <Container className="mt-5">
          <Sidebar />
          <Row className="justify-content-md-center">
            <Col md={4} className="login-col">
              <h2>Conteudo Projects</h2>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicTitle">
                  <Form.Label>Titulo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite o nome do projeto"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    disabled={saving}
                  />
                  <Form.Control.Feedback type="invalid">
                    Digite o nome
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlDescription"
                >
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control
                    name="description"
                    as="textarea"
                    rows={3}
                    required
                    disabled={saving}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Digite a descrição do projeto
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicGithub">
                  <Form.Label>Link Github</Form.Label>
                  <Form.Control
                    type="text"
                    name="github"
                    placeholder="Digite o link do github"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    disabled={saving}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicDemo">
                  <Form.Label>Link Demo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite o link para a demo"
                    name="demo"
                    value={demo}
                    onChange={(e) => setDemo(e.target.value)}
                    disabled={saving}
                  />
                </Form.Group>

                <Form.Group controlId="formFileImage" className="mb-3">
                  <Form.Label>Selecione uma imagem</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>

                <br />
                <br />
                <br />

                <Button variant="primary" type="submit" disabled={saving}>
                  {saving ? "Salvando" : "Salvar conteúdo"}
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
};

export default Projects;
