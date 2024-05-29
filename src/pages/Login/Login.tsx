import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useState<any>(null);

  useEffect(() => {
    const _auth = getAuth();
    setAuth(_auth);

    onAuthStateChanged(_auth, (user) => {
      if (user) {
        navigate("/dashboard");
      }
    });
  }, []);

  const handleLogin = (e: Event) => {
    e.preventDefault();
    setLoading(true);
    // Aqui você pode adicionar a lógica de autenticação, como enviar os dados para um servidor
    console.log(`Email: ${email}, Password: ${password}`);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("user", user);
        navigate("/dashboard");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode", errorCode, "errorMessage", errorMessage);
        // ..
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section>
      <Container fluid className="login-section" id="home">
        <Container className="mt-5">
          <Row className="justify-content-md-center">
            <Col md={4} className="login-col">
              <br />
              <br />
              <br />
              <h2 className="text-center">Login</h2>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </Form.Group>

                <br />
                <br />
                <br />
                <Button variant="primary" type="submit" disabled={loading}>
                  Entrar
                </Button>
                <br />
                <br />
                <br />
                <br />
                <br />
              </Form>
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
};

export default Login;
