import React from "react";
import { Accordion, Button, Col, Container, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { AnimationSettings, AvatarShape } from '../../models/ViewSettings'
import { ConfContext, defaultConf } from "../../models/Context";
import { RadioButtonGroup } from "../buttons/RadioButtonGroup";
import { ColorPicker } from "../buttons/ColorPicker";
import { AnimationSettingButtonGroup } from "../buttons/AnimationSettingButtonGroup";

export function ViewSettingsPane() {
  const { viewSettings, updateFeiSettings, updateAvatarSettings, updateUsernameSettings } = React.useContext(ConfContext);
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalClose = () => setModalOpen(false);
  const handleInitialize = () => {
    updateFeiSettings(defaultConf.viewSettings.fei);
    updateAvatarSettings(defaultConf.viewSettings.avatar);
    updateUsernameSettings(defaultConf.viewSettings.username);
    setModalOpen(false);
  };

  return (
    <Container>
      <Button className="btn-secondary mb-3" onClick={() => setModalOpen(true)}>
        初期設定に戻す
      </Button>

      <Modal show={modalOpen} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>初期設定に戻す</Modal.Title>
        </Modal.Header>
        <Modal.Body>表示設定を初期状態に戻します。よろしいですか?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            キャンセル
          </Button>
          <Button variant="primary" onClick={handleInitialize}>
            初期設定に戻す
          </Button>
        </Modal.Footer>
      </Modal>
      {/*
      --------------------------------------------------------------------------
       */}
      <div className="view-settings">
        <Accordion defaultActiveKey={["0", "1", "2"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Feign キャラクター</Accordion.Header>
            <Accordion.Body>
              <Row className="mb-2">
                <Col className="col-md-2">顔の向き</Col>
                <Col className="col-md-2">
                  {RadioButtonGroup("fei-mirror", ["左向き", "右向き"], viewSettings.fei.mirror ? 0 : 1, (index: number) => {
                    updateFeiSettings({ ...viewSettings.fei, mirror: index === 0 });
                  })}
                </Col>
                <Col className="offset-md-3 col-md-2 text-end">間隔</Col>
                <Col className="col-md-2">
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
                <Col className="col-md-2">会話中の動作</Col>
                <Col className="col-md-9">
                  {AnimationSettingButtonGroup("fei-speaking", viewSettings.fei.speaking, false, (setting: AnimationSettings) =>
                    updateFeiSettings({ ...viewSettings.fei, speaking: setting })
                  )}
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>Discord アバター</Accordion.Header>
            <Accordion.Body>
              <Row className="mb-2">
                <Col className="col-md-2">表示</Col>
                <Col className="col-md-4">
                  <Form.Check className="form-switch">
                    <Form.Check.Input
                      type="checkbox"
                      role="switch"
                      checked={viewSettings.avatar.show}
                      onChange={() => updateAvatarSettings({ ...viewSettings.avatar, show: !viewSettings.avatar.show })}
                    />
                  </Form.Check>
                </Col>

                <Col className="offset-md-1 col-md-2 text-end">前面に表示</Col>
                <Col className="col-md-2">
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
                <Col className="col-md-2">形状</Col>

                <Col className="col-md-4">
                  {RadioButtonGroup("avatar-shape", ["丸", "角丸四角", "四角"], viewSettings.avatar.shape.valueOf(), (index) => {
                    updateAvatarSettings({
                      ...viewSettings.avatar,
                      shape: [AvatarShape.Circle, AvatarShape.RoundedRectangle, AvatarShape.Rectangle][index],
                    });
                  })}
                </Col>

                <Col className="offset-md-1 col-md-2 text-end">縦位置調整</Col>
                <Col className="col-md-2">
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
                <Col className="col-md-2">会話中の動作</Col>
                <Col className="col-md-9">
                  {AnimationSettingButtonGroup("avatar-speaking", viewSettings.avatar.speaking, true, (setting: AnimationSettings) =>
                    updateAvatarSettings({ ...viewSettings.avatar, speaking: setting })
                  )}
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>ユーザー名</Accordion.Header>
            <Accordion.Body>
              <Row className="mb-2">
                <Col className="col-md-2">表示</Col>
                <Col className="col-md-4">
                  <Form.Check className="form-switch">
                    <Form.Check.Input
                      type="checkbox"
                      role="switch"
                      checked={viewSettings.username.show}
                      onChange={() => updateUsernameSettings({ ...viewSettings.username, show: !viewSettings.username.show })}
                    />
                  </Form.Check>
                </Col>
              </Row>

              <Row>
                <Col className="col-md-2">フォント</Col>
                <Col className="col-md-5">
                  <InputGroup>
                    <InputGroup.Text>サイズ</InputGroup.Text>
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
                    <InputGroup.Text>色</InputGroup.Text>
                    {ColorPicker("フォント色", viewSettings.username.fontColor, (color) =>
                      updateUsernameSettings({ ...viewSettings.username, fontColor: color })
                    )}
                    <InputGroup.Text>背景色</InputGroup.Text>
                    {ColorPicker("背景色", viewSettings.username.backgroundColor, (color) =>
                      updateUsernameSettings({ ...viewSettings.username, backgroundColor: color })
                    )}
                  </InputGroup>
                </Col>

                <Col className="col-md-2 text-end">縦位置調整</Col>
                <Col className="col-md-2">
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
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </Container>
  );
}
