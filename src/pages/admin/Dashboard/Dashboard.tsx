import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Firestore, doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import useForm from "../../../utils/hooks/useForm";

interface IDashboardProps {
  db: Firestore | null;
}

const Dashboard = ({ db }: IDashboardProps) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<any>(null);
  const [validated, setValidated] = useState(false);
  const [saving, setSaving] = useState(false);

  // const [valorInput, setValorInput] = useState("valor inicial");

  const [form, setForm, updateForm] = useForm({
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

  useEffect(() => {
    async function init() {
      const docRef = doc(db!, "portifolio", "home");
      const docSnap = await getDoc(docRef);
      updateForm({
        greetings: docSnap.data()!.greetings,
        iAm: docSnap.data()!["i-am"],
        name: docSnap.data()!.name,
      });
    }
    if (db) {
      init();
    }
  }, [db]);

  function logout() {
    signOut(auth);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const _form = e.currentTarget;
    if (_form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      console.log("enviou");
      setSaving(true);
      await setDoc(doc(db!, "portifolio", "home"), {
        greetings: form.greetings,
        "i-am": form.iAm,
        name: form.name,
      });
      setTimeout(() => {
        setSaving(false);
        setValidated(false);
      }, 2000);
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
