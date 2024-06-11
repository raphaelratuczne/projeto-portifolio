import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Sidebar from "../../../components/Sidebar";
import { useAuthContext } from "../../../contexts/authContext";
import { useProfileContext } from "../../../contexts/profileContext";
import useForm from "../../../utils/hooks/useForm";

// interface IDashboardProps {}

const Dashboard = () => {
  const { logout } = useAuthContext();
  const [validated, setValidated] = useState(false);
  const { greetings, iAm, name, loadValues, saveValues, saving } =
    useProfileContext();

  // const [valorInput, setValorInput] = useState("valor inicial");

  const [form, setForm, updateForm] = useForm({
    greetings,
    iAm,
    name,
  });

  useEffect(() => {
    if (!greetings) {
      loadValues();
    }
  }, []);

  useEffect(() => {
    updateForm({
      greetings,
      iAm,
      name,
    });
  }, [greetings]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const _form = e.currentTarget;
    if (_form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      console.log("enviou");
      await saveValues(form);
      setValidated(false);
      loadValues();
    }
    setValidated(true);
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
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                {/* <input
                  type="text"
                  value={valorInput}
                  onChange={(e) => setValorInput(e.target.value)}
                /> */}

                <Form.Group controlId="formBasicGreeting">
                  <Form.Label>Saudação</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite a saudação"
                    name="greetings"
                    value={form.greetings}
                    onChange={setForm}
                    required
                    disabled={saving}
                  />
                  <Form.Control.Feedback type="invalid">
                    Digite a saudação
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicIAm">
                  <Form.Label>Eu Sou</Form.Label>
                  <Form.Control
                    type="text"
                    name="iAm"
                    placeholder="Digite o conteúdo"
                    value={form.iAm}
                    onChange={setForm}
                    required
                    disabled={saving}
                  />
                  <Form.Control.Feedback type="invalid">
                    Digite quem é você
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formBasicName">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Digite o nome"
                    name="name"
                    value={form.name}
                    onChange={setForm}
                    required
                    disabled={saving}
                  />
                  <Form.Control.Feedback type="invalid">
                    Digite seu nome
                  </Form.Control.Feedback>
                </Form.Group>

                <br />
                <br />
                <br />

                <Button variant="primary" type="submit" disabled={saving}>
                  {saving ? "Salvando" : "Alterar conteúdo"}
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
