import React from "react";

import { Container, Form, Navbar } from "react-bootstrap";
import { APP_VERSION } from "../models/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faGithub } from "@fortawesome/free-brands-svg-icons";

function Header() {
  return (
    <header>
      <Navbar bg="light" data-bs-theme="light" className="border-bottom">
        <Container className="mx-3">
          <Navbar.Brand>Feign-Discord CSS Generator</Navbar.Brand>
        </Container>

        <Form className="form-inline me-3">
          <Container className="d-flex">
            <small className="text-muted mt-2 me-3">v{APP_VERSION}</small>
            <a className="nav-link me-3" href="https://www.youtube.com/@mogproject" target="_blank">
              <FontAwesomeIcon icon={faYoutube} size="2x" />
            </a>
            <a className="nav-link" href="https://github.com/mogproject/feign-discord-css-generator/" target="_blank">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
          </Container>
        </Form>
      </Navbar>
    </header>
  );
}

export default Header;
