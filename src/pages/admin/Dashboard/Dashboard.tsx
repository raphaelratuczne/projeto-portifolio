import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import useForm from "../../../utils/hooks/useForm";

const Dashboard = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<any>(null);

  const [form, setForm] = useForm({
    greetings: "",
    iAm: "",
    name: "",
  });

  useEffect(() => {
    const _auth = getAuth();
    setAuth(_auth);

    onAuthStateChanged(_auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });
  }, []);

  function logout() {
    signOut(auth);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log("enviou");
  };

  return (
    <section>
      <Container fluid className="login-section" id="home">
        <Container className="mt-5">
          <Sidebar />
          <Row className="justify-content-md-center">
            <Col md={4} className="login-col">
              <Button variant="primary" type="button" onClick={logout}>
                Logout
              </Button>

              <h2>Conteudo Home</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicTitle">
                  <Form.Label>Saudação</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite a saudação"
                    name="greetings"
                    value={form.greetings}
                    onChange={setForm}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Digite a saudação
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicBody">
                  <Form.Label>Eu Sou</Form.Label>
                  <Form.Control
                    type="text"
                    name="iAm"
                    placeholder="Digite o conteúdo"
                    value={form.iAm}
                    onChange={setForm}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Digite quem é você
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicBody">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite o nome"
                    name="name"
                    value={form.name}
                    onChange={setForm}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Digite seu nome
                  </Form.Control.Feedback>
                </Form.Group>

                <br />
                <br />
                <br />

                <Button variant="primary" type="submit">
                  Cadastrar conteúdo
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
};

export default Dashboard;
