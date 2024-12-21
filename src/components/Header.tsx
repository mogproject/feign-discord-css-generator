import React from "react";

import { Container, Navbar } from "react-bootstrap";

function Header() {
  return (
    <header>
      <Navbar bg="light" data-bs-theme="light" className="border-bottom">
        <Container>
          <Navbar.Brand>Feign-Discord CSS Generator</Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
