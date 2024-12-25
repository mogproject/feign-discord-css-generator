import React from "react";

import { Container, Form, Nav, Navbar } from "react-bootstrap";
import { APP_VERSION } from "../models/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faGithub } from "@fortawesome/free-brands-svg-icons";

function Header() {
  return (
    <header>
      <Navbar fixed="top" bg="light" data-bs-theme="light" className="border-bottom">
        <Container>
          <Navbar.Brand href='#'>Feign-Discord CSS Generator</Navbar.Brand>

          <Nav className="me-auto">
            <Nav.Link href="#features">特徴</Nav.Link>
            <Nav.Link href="#settings">設定</Nav.Link>
            <Nav.Link href="#preview">プレビュー</Nav.Link>
            <Nav.Link href="#obs">OBS 設定</Nav.Link>
          </Nav>

          <Form className="form-inline">
            <Container className="d-flex">
              <small className="text-muted mt-2 me-3">v{APP_VERSION}</small>
              <a className="nav-link me-3" href="https://www.youtube.com/@mogproject" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faYoutube} size="2x" />
              </a>
              <a className="nav-link" href="https://github.com/mogproject/feign-discord-css-generator/" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faGithub} size="2x" />
              </a>
            </Container>
          </Form>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
