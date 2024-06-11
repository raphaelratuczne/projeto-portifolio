import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext";

const Login = () => {
  const { login, user } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    // Aqui você pode adicionar a lógica de autenticação, como enviar os dados para um servidor
    console.log(`Email: ${email}, Password: ${password}`);
    await login(email, password);
    setLoading(false);
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
