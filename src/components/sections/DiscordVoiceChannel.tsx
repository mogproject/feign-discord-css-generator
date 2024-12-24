import React from "react";
import { Container, InputGroup, Form } from "react-bootstrap";
import { ConfContext } from "../models/Context";

export function DiscordVoiceChannel() {
  const { channelURL, updateVoiceChannelURL } = React.useContext(ConfContext);


  function handleVoiceChannelURL(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    updateVoiceChannelURL(newValue);
  }

  return (
    <Container>
      <p>Discord を起動し、対象のボイスチャンネルを右クリック → 「リンクをコピー」を選択。以下のフォームに貼り付けてください。</p>
      <InputGroup size="sm">
        <InputGroup.Text id="voice-channel-url">URL</InputGroup.Text>
        <Form.Control
          area-label="voice-channel-url-label"
          aria-describedby="voice-channel-url"
          value={channelURL}
          onChange={handleVoiceChannelURL}
          style={{ maxWidth: "540px" }}
        />
      </InputGroup>
    </Container>
  );
}
