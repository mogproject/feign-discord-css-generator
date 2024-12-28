import React from "react";

import { Container, Form, Nav, Navbar } from "react-bootstrap";
import { APP_VERSION } from "../models/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faGithub } from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";

function Header() {
  const { t: translate, i18n } = useTranslation();
  const t = translate as ((s: string) => string);
  const languages = [
    { key: 'ja', nativeName: '日本語' },
    { key: 'en', nativeName: 'English' },
  ];

  return (
    <header>
      <Navbar fixed="top" bg="light" data-bs-theme="light" className="border-bottom">
        <Container>
          <Navbar.Brand href='#'>Feign-Discord CSS Generator</Navbar.Brand>

          <Nav className="me-auto d-none d-xl-flex">
            <Nav.Link href="#features">{t('features.features')}</Nav.Link>
            <Nav.Link href="#settings">{t('settings.settings')}</Nav.Link>
            <Nav.Link href="#preview">{t('preview.preview')}</Nav.Link>
            <Nav.Link href="#obs">{t('obs.obs_settings')}</Nav.Link>
          </Nav>

          <Form className="form-inline">
            <Container className="d-flex">
              <small className="text-muted mt-2 me-3">v{APP_VERSION}</small>
              <Form.Select
                size="sm"
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                value={i18n.resolvedLanguage}
              >
                {languages.map(({ key, nativeName }) => (<option key={key} value={key}>{nativeName}</option>))}
              </Form.Select>

              <a className="nav-link d-none d-md-block ms-3 me-3" href="https://www.youtube.com/@mogproject" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faYoutube} size="2x" />
              </a>
              <a className="nav-link d-none d-md-block" href="https://github.com/mogproject/feign-discord-css-generator/" target="_blank" rel="noreferrer">
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
