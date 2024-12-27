import React from "react";
import { Alert, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { ConfContext, DiscordUser } from "../../models/Context";

export function Preview() {
  const { t: translate } = useTranslation('translation', { keyPrefix: 'preview' });
  const t = translate as ((s: string, o?: Record<string, string | boolean>) => string);
  const tt = (k: string) => { return t(k, { keyPrefix: '' }) };

  const { discordUsers, feignPlayers, viewSettings, isSpeaking, updateIsSpeaking } = React.useContext(ConfContext);

  const activeIDs: string[] = feignPlayers.filter((id: string) => id !== "");
  const activeUsers: DiscordUser[] = discordUsers.filter((user: DiscordUser) => activeIDs.includes(user.id));
  const isValid = activeIDs.length > 0;

  function PreviewUser(index: number) {
    return (
      <li
        key={`preview-${index}`}
        className={`Voice_voiceState__aaaaa ${isSpeaking[index] ? "wrapper_speaking" : "self_mute"} is_widget_owner voice_state`}
        data-userid={activeUsers[index].id}
        onClick={() => updateIsSpeaking([...isSpeaking.slice(0, index), !isSpeaking[index], ...isSpeaking.slice(index + 1)])}
      >
        <img
          className={`Voice_avatar__aaaaa ${isSpeaking[index] ? "Voice_avatarSpeaking__aaaaa" : ""} voice_avatar`}
          src={`assets/img/discord-${index % 6}.png`}
          alt=""
        ></img>
        <div className="Voice_user_aaaaa voice_username">
          <span
            className="Voice_name__aaaaa"
            // Discord's default values.
            style={{ color: "rgb(255,255,255)", fontSize: "14px", backgroundColor: "rgba(30,33,36,0.95)" }}
          >
            {activeUsers[index].name}
          </span>
        </div>
      </li>
    );
  }

  const paneHeight = viewSettings.getHeight() + 16;  // add height of scroll bar

  return (<>
    <Container className={`mb-4${isValid ? ' d-none' : ''}`}>
      <Alert className="alert-warning">{tt('add_feign_player')}</Alert>
    </Container>
    <Container className={`mb-4${isValid ? '' : ' d-none'}`}>
      <p>{t('description')}</p>
      <div className="discord_preview user-select-none" style={{ overflowX: "scroll", backgroundColor: "#cccccc", height: paneHeight }}>
        <div className="Voice_voiceContainer__aaaaa voice_container">
          <ul className="Voice_voiceStates__aaaaa voice_states">
            {Array(activeUsers.length)
              .fill(0)
              .map((_, i) => PreviewUser(i))}
          </ul>
        </div>
      </div>
    </Container>
  </>
  );
}
