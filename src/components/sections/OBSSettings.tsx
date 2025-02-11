import React from "react";
import { Container, Row, Col, InputGroup, Form, Alert, Button } from "react-bootstrap";
import { ConfContext } from "../../models/Context";
import { buildCSS } from "../../models/CSSBuilder";
import { buildFeignImageCss } from "../../models/FeignImageCss";
import { CopyButton } from "../buttons/CopyButton";
import FileSaver from "../../io/FileSaver";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

function createUrl(serverId: string, channelId: string, showStreamerFirst: boolean) {
  let url = new URL(`https://streamkit.discord.com/overlay/voice/${serverId}/${channelId}`);
  if (showStreamerFirst) url.searchParams.append('streamer_avatar_first', 'true');
  return url.toString();
}

export function OBSSettings() {
  const { t: translate } = useTranslation('translation', { keyPrefix: 'obs' });
  const t = translate as ((s: string, o?: Record<string, string | boolean>) => string);
  const tt = (k: string) => { return t(k, { keyPrefix: '' }) };

  const { feignPlayers, serverID, channelID, viewSettings } = React.useContext(ConfContext);
  const isValid = feignPlayers.some((user) => user !== '');

  const content = buildCSS(feignPlayers, viewSettings) + "\n" + buildFeignImageCss();

  const obsURL = createUrl(serverID, channelID, viewSettings.streamer.showStreamerFirst);
  const obsWidth = 1772 + viewSettings.fei.interval * 12;  // should support up to 13 users
  const obsHeight = viewSettings.getHeight();

  const fileSaver = new FileSaver();

  return (<>
    <Container className={`mb-4${isValid ? ' d-none' : ''}`}>
      <Alert className="alert-warning">{tt('add_feign_player')}</Alert>
    </Container>
    <Container className={`mb-4${isValid ? '' : ' d-none'}`}>
      <p className="mb-3">{t('description')}</p>
      <Row>
        <Col className="d-none d-md-block col-md-5">
          <img width="100%" src="assets/img/obs.png" alt=""></img>
        </Col>
        <Col>
          <Row className="mb-4">
            <InputGroup size="sm">
              <InputGroup.Text id="obs-url">URL</InputGroup.Text>
              <Form.Control
                area-label="obs-url-label"
                aria-describedby="obs-url"
                value={channelID === "" ? t('invalid_channel_url') : obsURL}
                readOnly={true}
              />
              {CopyButton(() => obsURL, "", channelID === "")}
            </InputGroup>
          </Row>

          <Row className="mb-2">
            <Col>
              <InputGroup size="sm">
                <InputGroup.Text id="obs-width">{t('width')}</InputGroup.Text>
                <Form.Control area-label="obs-width-label" aria-describedby="obs-width" value={obsWidth} readOnly={true} />
                {CopyButton(() => obsWidth.toString())}
              </InputGroup>
            </Col>

            <Col>
              <InputGroup size="sm">
                <InputGroup.Text id="obs-height">{t('height')}</InputGroup.Text>
                <Form.Control area-label="obs-height-label" aria-describedby="obs-height" value={obsHeight} readOnly={true} />
                {CopyButton(() => obsHeight.toString())}
              </InputGroup>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <small className="text-muted">{t('size_notes')}</small>
            </Col>
          </Row>

          {/* large screen */}
          <Row className="mb-4 d-none d-xl-block">
            <InputGroup>
              <InputGroup.Text>{t('custom_css')}</InputGroup.Text>
              {CopyButton(() => content, t('copy_to_clipboard'))}
              <Button variant="outline-secondary" onClick={() => fileSaver.saveTextToFile(() => content, 'feign.css')}>
                <FontAwesomeIcon icon={faDownload} />
                <span>&nbsp;{t('save_as_file')}</span>
              </Button>
            </InputGroup>
          </Row>

          {/* small screen */}
          <Row className="mb-4 d-xl-none">
            <InputGroup>
              <InputGroup.Text>{t('custom_css')}</InputGroup.Text>
              {CopyButton(() => content, tt('copy'))}
              <Button variant="outline-secondary" onClick={() => fileSaver.saveTextToFile(() => content, 'feign.css')}>
                <FontAwesomeIcon icon={faDownload} />
                <span>&nbsp;{tt('save')}</span>
              </Button>
            </InputGroup>
          </Row>
        </Col>
      </Row>
    </Container>
  </>
  );
}
