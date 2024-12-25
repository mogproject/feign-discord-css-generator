import React from "react";
import { Button, Modal, Row, Col, Container } from "react-bootstrap";

const piLink = 'https://piyonyuxu.fanbox.cc/posts/4943228';
const alfeLink = 'https://obs-discord-icon.alfebelow.com/';
const komiLink = 'https://koumi-hashiba.fanbox.cc/posts/7790890'

function Footer() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState({ title: '', body: <></> })
  const handleModalClose = () => setModalOpen(false);

  const createLink = (title: string, link: string) =>
    <a href={link} target="_blank" rel="noreferrer">{title}</a>;

  const createItem = (author: string, title: string, link: string) =>
    <li>{author}<ul><li>{createLink(title, link)}</li></ul> </li>;

  const supportedBrowsersContent = (<>
    <p>This website was tested on the following browsers.</p>
    <ul>
      <li>{createLink('Google Chrome', 'https://google.com/chrome')} (Recommended)
        <ul><li>Version 131.0.6778.205 (Official Build) (arm64)</li></ul>
      </li>
      <li>{createLink('Mozilla Firefox', 'https://mozilla.org/firefox')}</li>
    </ul>
    <p>Mobile screens are not supported.</p>
  </>);

  const specialThanksContent = (<>
    <p>This work was heavily inspired by the following awesome creators.</p>
    <ul>
      {createItem('ぴよんゆぅ', 'pixivFANBOX', piLink)}
      {createItem('alfe_below', 'OBSのDiscordアイコン外観変更ジェネレーター', alfeLink)}
      {createItem('羽柴紅魅', 'pixivFANBOX', komiLink)}
    </ul>
  </>);

  return (<>
    <Container>
      <Row><Col className='col-md-6 text-begin'>
        <p>
          <small className="text-muted">
            <span className="link-like" onClick={() => {
              setModalContent({ title: 'Supported Browsers', body: supportedBrowsersContent });
              setModalOpen(true);
            }}>Supported Browsers</span>
          </small>
        </p>
      </Col>
        <Col className='col-md-6 text-end'>
          <p>
            <small className="text-muted">
              <span className="link-like" onClick={() => {
                setModalContent({ title: 'Special Thanks', body: specialThanksContent });
                setModalOpen(true);
              }}>Special Thanks</span>
              &nbsp;-
              Feign-Discord CSS Generator &copy; 2024 &nbsp;
              <a href="https://mogproject.com" target="_blank" rel="noreferrer" className="link-like">mogproject</a>
            </small>
          </p>
        </Col>
      </Row>
    </Container>

    <Modal show={modalOpen} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalContent.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalContent.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>OK</Button>
      </Modal.Footer>
    </Modal>
  </>)
};


export default Footer;
