import React from "react";
import { Container, Row, Col, InputGroup, Form, Alert } from "react-bootstrap";
import { ConfContext } from "./Context";
import { buildCSS } from "./CSSBuilder";
import { buildFeignImageCSS } from "./FeignImageCSS";
import { CopyButton } from "./buttons/CopyButton";
import SaveFileButton from "./buttons/SaveFileButton";

export function OBSSettings() {
  const { feignPlayers, serverID, channelID, viewSettings } = React.useContext(ConfContext);

  const content = buildCSS(feignPlayers, viewSettings) + "\n" + buildFeignImageCSS();

  const obsURL = `https://streamkit.discord.com/overlay/voice/${serverID}/${channelID}`;
  const obsWidth = 1772 + viewSettings.fei.interval * 12;  // should support up to 13 users
  const obsHeight = 260 + Math.max(0, viewSettings.avatar.offsetY) + Math.max(0, viewSettings.username.offsetY);

  return (
    <Container className="mb-4">
      <p className="mb-3">「ソース」 → 「ブラウザ」 のプロパティ画面にて、以下の内容を設定してください。</p>
      <Row>
        <Col className="col-md-5">
          <img width="100%" src="assets/img/obs.png" alt=""></img>
        </Col>
        <Col>
          <Row className="mb-4">
            <InputGroup size="sm">
              <InputGroup.Text id="obs-url">URL</InputGroup.Text>
              <Form.Control
                area-label="obs-url-label"
                aria-describedby="obs-url"
                value={channelID === "" ? "ボイスチャンネル URL が正しく設定されていません" : obsURL}
                readOnly={true}
              />
              {CopyButton(obsURL, "", channelID === "")}
            </InputGroup>
          </Row>

          <Row className="mb-2">
            <Col>
              <InputGroup size="sm">
                <InputGroup.Text id="obs-width">幅</InputGroup.Text>
                <Form.Control area-label="obs-width-label" aria-describedby="obs-width" value={obsWidth} readOnly={true} />
                {CopyButton(obsWidth.toString())}
              </InputGroup>
            </Col>

            <Col>
              <InputGroup size="sm">
                <InputGroup.Text id="obs-height">高さ</InputGroup.Text>
                <Form.Control area-label="obs-height-label" aria-describedby="obs-height" value={obsHeight} readOnly={true} />
                {CopyButton(obsHeight.toString())}
              </InputGroup>
            </Col>
          </Row>
          <Row className="'mb-4">
            <Col>
              <Alert className="alert-dark pt-1 pb-1 small">これらより大きい値を入力しても、動作に影響はありません。</Alert>
            </Col>
          </Row>

          <Row className="mb-4">
            <InputGroup>
              <InputGroup.Text id="obs-css">カスタム CSS</InputGroup.Text>
              {CopyButton(content, "クリップボードにコピー")}
              {SaveFileButton(content, "ファイルとして保存", "feign.css", "outline-secondary")}
            </InputGroup>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
