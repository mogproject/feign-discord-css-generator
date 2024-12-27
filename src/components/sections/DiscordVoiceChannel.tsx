import React from "react";
import { Container, InputGroup, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ConfContext, isValidVoiceChannelURL } from "../../models/Context";

export function DiscordVoiceChannel() {
  const { t: translate } = useTranslation('translation', { keyPrefix: 'settings.channel' });
  const t = translate as ((s: string) => string);
  const { channelURL, updateVoiceChannelURL } = React.useContext(ConfContext);
  const isEmpty = channelURL === '';
  const isValid = isValidVoiceChannelURL(channelURL);

  return (
    <Container>
      <p>{t('description')}</p>
      <InputGroup size="sm" hasValidation>
        <InputGroup.Text id="voice-channel-url">URL</InputGroup.Text>
        <Form.Control
          area-label="voice-channel-url-label"
          aria-describedby="voice-channel-url"
          required
          placeholder={t('placeholder')}
          value={channelURL}
          isValid={isValid}
          isInvalid={!isEmpty && !isValid}
          onChange={(e) => updateVoiceChannelURL(e.target.value)}
          style={{ maxWidth: "540px" }}
        />
        <Form.Control.Feedback type="invalid" tooltip={true}>{t('feedback')}</Form.Control.Feedback>
      </InputGroup>
    </Container>
  );
}
