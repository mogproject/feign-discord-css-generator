import React from "react";
import { Button, Container, Overlay, Row, Col, Tooltip } from "react-bootstrap";
import { ConfContext } from "./Context";
import { buildCSS } from "./CSSBuilder";
import { buildFeignImageCSS } from "./FeignImageCSS";

export function OBSSettings() {
  const { feignPlayers, serverID, channelID } = React.useContext(ConfContext);

  const content = buildCSS(feignPlayers) + "\n" + buildFeignImageCSS();

  const [tooltipMessage, setTooltipMessage] = React.useState("");
  const [tooltipShown, setTooltipShown] = React.useState(true);
  const [clipboardButtonDisabled, setClipboardButtonDisabled] = React.useState(false);
  const [downloadButtonDisabled, setDownloadButtonDisabled] = React.useState(false);
  const target = React.useRef(null);

  function copyToClipboard() {
    setClipboardButtonDisabled(true);
    navigator.clipboard
      .writeText(content)
      .then(
        () => {
          setTooltipMessage("コピー完了"); //success
        },
        () => {
          setTooltipMessage("コピーに失敗しました"); //failure
        }
      )
      .then(() => {
        setTooltipShown(true);
        setTimeout(() => {
          setTooltipShown(false);
          setClipboardButtonDisabled(false);
        }, 1000);
      });
  }

  function download() {
    setDownloadButtonDisabled(true);
    const file = new Blob([content], { type: "text/plain" });
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = "feign.css";

    document.body.appendChild(element);
    element.click();
    setTimeout(() => {
      setDownloadButtonDisabled(false);
    }, 1000);
  }

  return (
    <Container className="mb-4">
      <Row className="mb-3">「ソース」 → 「ブラウザ」 のプロパティ画面にて、以下の内容を設定してください。</Row>
      <Row>
        <Col className="col-md-5">
          <img width="100%" src="assets/img/obs.png"></img>
        </Col>
        <Col>
          <h4>URL</h4>
          {`https://streamkit.discord.com/overlay/voice/${serverID}/${channelID}`}
          <h4>幅</h4>
          1800
          <h4>高さ</h4>
          260
          <h4>カスタム CSS</h4>
          <Row>
            <Col className="col-md-5">
              <Button onClick={copyToClipboard} className="btn-success" ref={target} disabled={clipboardButtonDisabled}>
                クリップボードに
                <br />
                コピー
              </Button>
              <Overlay target={target.current} show={tooltipShown} placement="bottom">
                {(props) => <Tooltip {...props}>{tooltipMessage}</Tooltip>}
              </Overlay>
            </Col>
            <Col className="col-md-5">
              <Button onClick={download} value="download" disabled={downloadButtonDisabled}>
                ファイルとして
                <br />
                保存
              </Button>
            </Col>
            <Col className="col-md-2 col-hidden-xs"></Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
