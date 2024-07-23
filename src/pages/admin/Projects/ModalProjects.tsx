import { yupResolver } from "@hookform/resolvers/yup";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  IProject,
  useProjectsContext,
} from "../../../contexts/projectsContext";

const schema = yup.object().shape({
  title: yup.string().required("Por favor digite o titulo do projeto"),
  description: yup.string().required("Por favor insira uma descrição"),
  github: yup.string().optional().url("Por favor use uma url válida"),
  demo: yup.string().optional().url("Por favor use uma url válida"),
});

const defaultValues = {
  title: "",
  description: "",
  github: "",
  demo: "",
};

const ModalProjects = forwardRef((_, ref) => {
  const { saveProject, updateProject, getListProjects } = useProjectsContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitSuccessful },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(schema), defaultValues });

  useImperativeHandle(ref, () => {
    return {
      handleOpenAndFillModal,
    };
  });

  const [id, setId] = useState("");
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [github, setGithub] = useState("");
  // const [demo, setDemo] = useState("");
  const [image, setImage] = useState<File | any>(null);
  // const validated = false;
  const [saving, setSaving] = useState(false);
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   console.log("image", image);
  // }, [image]);

  // useEffect(() => {
  //   console.log("errors", errors);
  // }, [errors]);

  function clearForm() {
    setId("");
    //   setTitle("");
    //   setDescription("");
    //   setGithub("");
    //   setDemo("");
    setImage(null);
    reset();
  }

  function handleOpenAndFillModal(project: IProject) {
    setId(project.id!);
    // setTitle(project.title);
    // setDescription(project.description);
    // setGithub(project.github);
    // setDemo(project.demo);
    setValue("title", project.title);
    setValue("description", project.description);
    setValue("github", project.github);
    setValue("demo", project.demo);
    //! setImage(project.image);
    handleShow();
  }

  const handleClose = () => {
    clearForm();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const onSubmitHandler = (data: any) => {
    console.log({ data });
    setSaving(true);
    setTimeout(async () => {
      if (id) {
        await updateProject(id, data, image);
      } else {
        await saveProject(data, image);
      }
      await getListProjects();
      setSaving(false);
      handleClose();
      if (isSubmitSuccessful) {
        clearForm();
      }
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
        <Form
          noValidate
          validated={isSubmitted}
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicTitle">
              <Form.Label>Titulo</Form.Label>
              <Form.Control
                {...register("title")}
                type="text"
                placeholder="Digite o nome do projeto"
                // name="title"
                // value={title}
                // onChange={(e) => setTitle(e.target.value)}
                required
                disabled={saving}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="mb-3 mt-3"
              controlId="exampleForm.ControlDescription"
            >
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                {...register("description")}
                // name="description"
                as="textarea"
                rows={3}
                required
                disabled={saving}
                // value={description}
                // onChange={(e) => setDescription(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 mt-3" controlId="formBasicGithub">
              <Form.Label>Link Github</Form.Label>
              <Form.Control
                {...register("github")}
                type="text"
                // name="github"
                placeholder="Digite o link do github"
                // value={github}
                // onChange={(e) => setGithub(e.target.value)}
                disabled={saving}
                isInvalid={!!errors.github?.message}
              />
              <Form.Control.Feedback type="invalid">
                {errors.github?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 mt-3" controlId="formBasicDemo">
              <Form.Label>Link Demo</Form.Label>
              <Form.Control
                {...register("demo")}
                type="text"
                placeholder="Digite o link para a demo"
                // name="demo"
                // value={demo}
                // onChange={(e) => setDemo(e.target.value)}
                disabled={saving}
                isInvalid={!!errors.demo?.message}
              />
              <Form.Control.Feedback type="invalid">
                {errors.demo?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mt-3" controlId="formFileImage">
              <Form.Label>Selecione uma imagem</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage((e.target as any).files[0])}
              />
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
});

export default ModalProjects;
