import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../../components/Particle";
import { useProfileContext } from "../../contexts/profileContext";
import Home2 from "./Home2";
import Type from "./Type";

// interface IHomeProps {}

function Home() {
  const { greetings, iAm, name, jobs, loadValues } = useProfileContext();
  const [arrayJobs, setArrayJobs] = useState<string[]>([]);

  useEffect(() => {
    loadValues();
  }, []);

  useEffect(() => {
    if (jobs) {
      setArrayJobs(jobs.split("\n"));
    }
  }, [jobs]);

  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                {greetings}!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                {iAm}
                <strong className="main-name"> {name}</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type arrayValues={arrayJobs} />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;
