import React from "react";
import { Accordion, Button, Col, Container, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { AnimationSettings, AvatarShape } from '../../models/ViewSettings'
import { ConfContext, defaultConf } from "../../models/Context";
import { RadioButtonGroup } from "../buttons/RadioButtonGroup";
import { ColorPicker } from "../buttons/ColorPicker";
import { AnimationSettingButtonGroup } from "../buttons/AnimationSettingButtonGroup";
import { useTranslation } from "react-i18next";

export function ViewSettingsPane() {
  const { t: translate } = useTranslation('translation', { keyPrefix: 'settings.overlay' });
  const t = translate as ((s: string, o?: Record<string, string | boolean>) => string);
  const tt = (k: string) => { return t(k, { keyPrefix: '' }) };

  const { viewSettings, updateFeiSettings, updateAvatarSettings, updateUsernameSettings, updateStreamerSettings } = React.useContext(ConfContext);
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalClose = () => setModalOpen(false);
  const handleInitialize = () => {
    updateFeiSettings(defaultConf.viewSettings.fei);
    updateAvatarSettings(defaultConf.viewSettings.avatar);
    updateUsernameSettings(defaultConf.viewSettings.username);
    updateStreamerSettings(defaultConf.viewSettings.streamer);
    setModalOpen(false);
  };

  return (
    <Container>
      <Button className="btn-secondary mb-3" onClick={() => setModalOpen(true)}>
        {t('initialize')}
      </Button>

      <Modal show={modalOpen} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('initialization')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('initialization_description')}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            {tt('cancel')}
          </Button>
          <Button variant="primary" onClick={handleInitialize}>
            {t('initialize')}
          </Button>
        </Modal.Footer>
      </Modal>
      {/*
      --------------------------------------------------------------------------
       */}
      <Container>
        <Row className="mb-3">
          <Col className="col-6 col-md-2 mb-2 mb-md-0">{t('show_my_avatar_first')}</Col>
          <Col className="col-6 col-md-3">
            <Form.Check className="form-switch">
              <Form.Check.Input
                type="checkbox"
                role="switch"
                checked={viewSettings.streamer.showStreamerFirst}
                onChange={() => updateStreamerSettings({ ...viewSettings.streamer, showStreamerFirst: !viewSettings.streamer.showStreamerFirst })}
              />
            </Form.Check>
          </Col>
        </Row>
      </Container>
      <div className="view-settings">
        <Accordion defaultActiveKey={["0", "1", "2"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>{t('feign_characters')}</Accordion.Header>
            <Accordion.Body>
              <Row className="mb-2">
                <Col className="col-6 col-md-2 my-auto">{t('facing')}</Col>
                <Col className="col-6 col-md-4 mb-2 mb-md-0">
                  {RadioButtonGroup([t('facing_left'), t('facing_right')], viewSettings.fei.mirror ? 0 : 1, (index: number) => {
                    updateFeiSettings({ ...viewSettings.fei, mirror: index === 0 });
                  })}
                </Col>
                <Col className="col-6 offset-md-1 col-md-3 text-md-end my-auto">{t('interval')}</Col>
                <Col className="col-6 col-md-2">
                  <Form.Control
                    type="number"
                    value={viewSettings.fei.interval}
                    min="0"
                    max="50"
                    style={{ width: "80px" }}
                    onChange={(e) => {
                      updateFeiSettings({ ...viewSettings.fei, interval: parseInt(e.target.value) });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="col-12 col-md-2 my-auto">{t('speaking_behavior')}</Col>
                <Col className="col-12 col-md-9">
                  {AnimationSettingButtonGroup("fei-speaking", viewSettings.fei.speaking, false, (setting: AnimationSettings) =>
                    updateFeiSettings({ ...viewSettings.fei, speaking: setting })
                  )}
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>{t('discord_avatar')}</Accordion.Header>
            <Accordion.Body>
              <Row className="mb-2">
                <Col className="col-6 col-md-2 mb-2 mb-md-0">{tt('show')}</Col>
                <Col className="col-6 col-md-3">
                  <Form.Check className="form-switch">
                    <Form.Check.Input
                      type="checkbox"
                      role="switch"
                      checked={viewSettings.avatar.show}
                      onChange={() => updateAvatarSettings({ ...viewSettings.avatar, show: !viewSettings.avatar.show })}
                    />
                  </Form.Check>
                </Col>

                <Col className="col-6 offset-md-2 col-md-3 text-md-end">{t('show_front')}</Col>
                <Col className="col-6 col-md-2">
                  <Form.Check className="form-switch">
                    <Form.Check.Input
                      type='checkbox'
                      role='switch'
                      checked={viewSettings.avatar.front}
                      onChange={() => updateAvatarSettings({ ...viewSettings.avatar, front: !viewSettings.avatar.front })}
                    />
                  </Form.Check>
                </Col>
              </Row>

              <Row className="mb-2">
                <Col className="col-12 col-md-2 my-auto">{t('shape')}</Col>

                <Col className="col-12 col-md-5  mb-2 mb-md-0">
                  {RadioButtonGroup([t('circle'), t('rounded_rectangle'), t('rectangle')], viewSettings.avatar.shape.valueOf(), (index) => {
                    updateAvatarSettings({
                      ...viewSettings.avatar,
                      shape: [AvatarShape.Circle, AvatarShape.RoundedRectangle, AvatarShape.Rectangle][index],
                    });
                  })}
                </Col>

                <Col className="col-md-3 text-md-end my-auto">{t('vertical_offset')}</Col>
                <Col className="col-6 col-md-2">
                  <Form.Control
                    type="number"
                    value={viewSettings.avatar.offsetY}
                    min="-300"
                    max="300"
                    style={{ width: "80px" }}
                    onChange={(e) => {
                      updateAvatarSettings({ ...viewSettings.avatar, offsetY: parseInt(e.target.value) });
                    }}
                  />
                </Col>
              </Row>

              <Row>
                <Col className="col-12 col-md-2 my-auto">{t('speaking_behavior')}</Col>
                <Col className="col-12 col-md-9">
                  {AnimationSettingButtonGroup("avatar-speaking", viewSettings.avatar.speaking, true, (setting: AnimationSettings) =>
                    updateAvatarSettings({ ...viewSettings.avatar, speaking: setting })
                  )}
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>{t('username')}</Accordion.Header>
            <Accordion.Body>
              <Row className="mb-2">
                <Col className="col-6 col-md-2">{tt('show')}</Col>
                <Col className="col-6 col-md-3 mb-2 mb-md-0">
                  <Form.Check className="form-switch">
                    <Form.Check.Input
                      type="checkbox"
                      role="switch"
                      checked={viewSettings.username.show}
                      onChange={() => updateUsernameSettings({ ...viewSettings.username, show: !viewSettings.username.show })}
                    />
                  </Form.Check>
                </Col>

                <Col className="col-6 col-md-5 text-md-end my-auto">{t('vertical_offset')}</Col>
                <Col className="col-6 col-md-2">
                  <Form.Control
                    type="number"
                    value={viewSettings.username.offsetY}
                    min="-300"
                    max="300"
                    style={{ width: "80px" }}
                    onChange={(e) => {
                      updateUsernameSettings({ ...viewSettings.username, offsetY: parseInt(e.target.value) });
                    }}
                  />
                </Col>
              </Row>

              <Row>
                <Col className="col-6 col-md-2 my-auto">{t('font')}</Col>
                <Col className="col-12 col-md-10 col-lg-6">
                  <InputGroup>
                    <InputGroup.Text>{t('size')}</InputGroup.Text>
                    <Form.Control
                      type="number"
                      value={viewSettings.username.fontSize}
                      min="10"
                      max="50"
                      style={{ maxWidth: "80px" }}
                      onChange={(e) => {
                        updateUsernameSettings({ ...viewSettings.username, fontSize: parseInt(e.target.value) });
                      }}
                    />
                    <InputGroup.Text>{tt('color')}</InputGroup.Text>
                    {ColorPicker(t('font_color'), viewSettings.username.fontColor, (color) =>
                      updateUsernameSettings({ ...viewSettings.username, fontColor: color })
                    )}
                    <InputGroup.Text>{t('background')}</InputGroup.Text>
                    {ColorPicker(t('background_color'), viewSettings.username.backgroundColor, (color) =>
                      updateUsernameSettings({ ...viewSettings.username, backgroundColor: color })
                    )}
                  </InputGroup>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </Container>
  );
}
