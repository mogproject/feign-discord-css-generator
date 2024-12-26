import React from "react";
import Header from "./components/Header";
import { Container, Accordion } from "react-bootstrap";
import { FeiSettings, AvatarSettings, UsernameSettings, ViewSettings } from './models/ViewSettings';
import { DiscordUser, ConfContext, defaultConf, retrieveChannelIDs, players2array } from "./models/Context";
import { DiscordUsers } from "./components/sections/DiscordUsers";
import { FeignPlayers } from "./components/sections/FeignPlayers";
import { Preview } from "./components/sections/Preview";
import { buildCSS } from "./models/CSSBuilder";
import { buildFeignImageCSS } from "./models/FeignImageCSS";
import { OBSSettings } from "./components/sections/OBSSettings";
import { DiscordVoiceChannel } from "./components/sections/DiscordVoiceChannel";
import { ViewSettingsPane } from "./components/sections/ViewSettingsPane";
import Footer from "./components/Footer";
import SaveLoad from "./components/sections/SaveLoad";

export default function App() {
  // Voice channel.
  const initialVoiceChannelURL: string = localStorage.getItem("voice_channel_url") || "";
  const [voiceChannelURL, setVoiceChannelURL] = React.useState(initialVoiceChannelURL);
  const [serverID, channelID] = retrieveChannelIDs(voiceChannelURL);

  function updateVoiceChannelURL(newURL: string) {
    localStorage.setItem("voice_channel_url", newURL);
    setVoiceChannelURL(newURL);
  }

  // Discord users.
  const initialDiscordUsers: DiscordUser[] = JSON.parse(localStorage.getItem("discord_users") || "[]");
  const [discordUsers, setDiscordUsers] = React.useState(initialDiscordUsers);
  const [discordUserEditing, setDiscordUserEditing] = React.useState(
    { index: discordUsers.length, name: '', id: '' }
  );

  function updateDiscordUsers(newDiscordUsers: DiscordUser[]) {
    setDiscordUsers(newDiscordUsers);
    localStorage.setItem("discord_users", JSON.stringify(newDiscordUsers));
    setDiscordUserEditing({ index: newDiscordUsers.length, name: '', id: '' });  // refresh editing user
  }

  function updateDiscordUserEditing(newEditIndex: number, newName: string, newId: string) {
    setDiscordUserEditing({ index: newEditIndex, name: newName, id: newId });
  }

  // Feign players.
  const initialFeignPlayers: string[] = JSON.parse(localStorage.getItem("feign_players") || '["' + '","'.repeat(12) + '"]');
  const [feignPlayers, setFeignPlayers] = React.useState(initialFeignPlayers);

  function updateFeignPlayers(newFeignPlayers: string[]) {
    setFeignPlayers(newFeignPlayers);
    localStorage.setItem("feign_players", JSON.stringify(newFeignPlayers));
  }

  function cleanDiscordId(id: string) {
    if (feignPlayers.includes(id)) {
      updateFeignPlayers(feignPlayers.map((userId) => id === userId ? '' : userId));
    }
  }

  // Settings.
  const initialFeiSettings = { ...defaultConf.viewSettings.fei, ...JSON.parse(localStorage.getItem("view_fei") || "{}") };
  const initialAvatarSettings = { ...defaultConf.viewSettings.avatar, ...JSON.parse(localStorage.getItem("view_avatar") || "{}") };
  const initialUsernameSettings = { ...defaultConf.viewSettings.username, ...JSON.parse(localStorage.getItem("view_username") || "{}") };

  const [feiSettings, setFeiSettings] = React.useState(initialFeiSettings);
  const [avatarSettings, setAvatarSettings] = React.useState(initialAvatarSettings);
  const [usernameSettings, setUsernameSettings] = React.useState(initialUsernameSettings);

  function updateFeiSettings(newSettings: FeiSettings) {
    setFeiSettings(newSettings);
    localStorage.setItem("view_fei", JSON.stringify(newSettings));
  }

  function updateAvatarSettings(newSettings: AvatarSettings) {
    setAvatarSettings(newSettings);
    localStorage.setItem("view_avatar", JSON.stringify(newSettings));
  }

  function updateUsernameSettings(newSettings: UsernameSettings) {
    setUsernameSettings(newSettings);
    localStorage.setItem("view_username", JSON.stringify(newSettings));
  }

  // Preview
  const [isSpeaking, setIsSpeaking] = React.useState(players2array(feignPlayers));

  const viewSettings = new ViewSettings(feiSettings, avatarSettings, usernameSettings);

  return (
    <>
      <Header />
      <ConfContext.Provider
        value={{
          channelURL: voiceChannelURL,
          serverID: serverID,
          channelID: channelID,
          updateVoiceChannelURL: updateVoiceChannelURL,
          discordUsers: discordUsers,
          discordUserEditing: discordUserEditing,
          updateDiscordUsers: updateDiscordUsers,
          cleanDiscordId: cleanDiscordId,
          updateDiscordUserEditing: updateDiscordUserEditing,
          feignPlayers: feignPlayers,
          updateFeignPlayers: updateFeignPlayers,
          viewSettings: viewSettings,
          updateFeiSettings: updateFeiSettings,
          updateAvatarSettings: updateAvatarSettings,
          updateUsernameSettings: updateUsernameSettings,
          isSpeaking: isSpeaking,
          updateIsSpeaking: setIsSpeaking,
        }}
      >
        <Container style={{ marginTop: "60px", paddingTop: "5px" }}>
          <p>
            <small>全ての設定は、お使いのブラウザにのみ保存されます。設定内容が外部に送信されることはありません。</small>
          </p>
          <h2 id='features'>特徴</h2>
          <ul>
            <li>単一の CSS で Discord アイコンと Feign のキャラクターを同時に表示します。</li>
            <li>CSS 内部に画像情報を保存しているため、外部依存を減らすことができます。</li>
            <li>簡易的なユーザー管理により、過去の情報を再利用できます。</li>
          </ul>
          <h2 id='settings'>設定</h2>
          <SaveLoad />

          <Accordion defaultActiveKey={["0", "1", "2", "3"]} alwaysOpen className="mb-4">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Discord ボイスチャンネル</Accordion.Header>
              <Accordion.Body>
                <DiscordVoiceChannel />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Discord ユーザー管理</Accordion.Header>
              <Accordion.Body>
                <DiscordUsers />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Feign プレイヤー設定</Accordion.Header>
              <Accordion.Body>
                <FeignPlayers />
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>オーバーレイ詳細設定</Accordion.Header>
              <Accordion.Body>
                <ViewSettingsPane />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <h2 id='preview'>プレビュー</h2>
          <Preview />
          <h2 id='obs'>OBS 設定</h2>
          <OBSSettings />
        </Container>
      </ConfContext.Provider>
      <style>{buildCSS(feignPlayers, viewSettings)}</style>
      <style>{buildFeignImageCSS()}</style>
      <hr />
      <Footer />
    </>
  );
}
