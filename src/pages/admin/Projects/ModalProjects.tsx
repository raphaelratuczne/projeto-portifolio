import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useProjectsContext } from "../../../contexts/projectsContext";

const ModalProjects = () => {
  const { saveProject, getListProjects } = useProjectsContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [github, setGithub] = useState("");
  const [demo, setDemo] = useState("");
  // const [image, setImage] = useState("");
  const validated = false;
  const [saving, setSaving] = useState(false);
  const [show, setShow] = useState(false);

  function clearForm() {
    setTitle("");
    setDescription("");
    setGithub("");
    setDemo("");
    // setImage("");
  }

  const handleClose = () => {
    clearForm();
    setShow(false);
  };
  const handleShow = () => setShow(true);

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
      await getListProjects();
      setSaving(false);
      handleClose();
    }, 1000);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Adicionar Projeto
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Projeto</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicTitle">
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
              className="mb-3 mt-3"
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

            <Form.Group className="mb-3 mt-3" controlId="formBasicGithub">
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

            <Form.Group className="mb-3 mt-3" controlId="formBasicDemo">
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

            <Form.Group className="mt-3" controlId="formFileImage">
              <Form.Label>Selecione uma imagem</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              disabled={saving}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? "Salvando" : "Salvar conteúdo"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalProjects;
