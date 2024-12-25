import React from "react";
import { Container, InputGroup, Form } from "react-bootstrap";
import { ConfContext, isValidVoiceChannelURL } from "../../models/Context";

export function DiscordVoiceChannel() {
  const { channelURL, updateVoiceChannelURL } = React.useContext(ConfContext);
  const isEmpty = channelURL === '';
  const isValid = isValidVoiceChannelURL(channelURL);
  const feedback = 'https://discord.com/channels/ で始まる URL を入力してください';

  return (
    <Container>
      <p>Discord を起動し、対象のボイスチャンネルを右クリック → 「リンクをコピー」を選択。以下のフォームに貼り付けてください。</p>
      <InputGroup size="sm" hasValidation>
        <InputGroup.Text id="voice-channel-url">URL</InputGroup.Text>
        <Form.Control
          area-label="voice-channel-url-label"
          aria-describedby="voice-channel-url"
          value={channelURL}
          isValid={isValid}
          isInvalid={!isEmpty && !isValid}
          onChange={(e) => updateVoiceChannelURL(e.target.value)}
          style={{ maxWidth: "540px" }}
        />
        <div className={'invalid-tooltip'}>{feedback}</div>
      </InputGroup>
    </Container>
  );
}
