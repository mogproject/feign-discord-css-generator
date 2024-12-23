import React from "react";
import { useState } from "react";
import Header from "./components/Header";
import { Container, InputGroup, Form, Accordion } from "react-bootstrap";
import { DiscordUser, ConfContext } from "./components/Context";
import { DiscordUsers } from "./components/DiscordUsers";
import { FeignPlayers } from "./components/FeignPlayers";
import { Preview } from "./components/Preview";
import { buildCSS } from "./components/CSSBuilder";
import { buildFeignImageCSS } from "./components/FeignImageCSS";
import { OBSSettings } from "./components/OBSSettings";

function retrieveIDs(voiceChannelURL: string): [string, string] {
  const result = voiceChannelURL.match(/http[s]?:[/][/]discord.com[/]channels[/](\d+)[/](\d+)[/]?/);
  return result ? [result[1], result[2]] : ["", ""];
}

export default function App() {
  const initialVoiceChannelURL: string = localStorage.getItem("voice_channel_url") || "";
  const [voiceChannelURL, setVoiceChannelURL] = useState(initialVoiceChannelURL);
  const [serverID, channelID] = retrieveIDs(voiceChannelURL);

  function handleVoiceChannelURL(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    localStorage.setItem("voice_channel_url", newValue);
    setVoiceChannelURL(newValue);
  }
  const initialDiscordUsers: DiscordUser[] = JSON.parse(localStorage.getItem("discord_users") || "[]");
  const [discordUsers, setDiscordUsers] = React.useState(initialDiscordUsers);

  function updateDiscordUsers(newDiscordUsers: DiscordUser[]) {
    setDiscordUsers(newDiscordUsers);
    localStorage.setItem("discord_users", JSON.stringify(newDiscordUsers));
  }

  const initialFeignPlayers: string[] = JSON.parse(localStorage.getItem("feign_players") || '["' + '","'.repeat(12) + '"]');
  const [feignPlayers, setFeignPlayers] = React.useState(initialFeignPlayers);

  function updateFeignPlayers(newFeignPlayers: string[]) {
    setFeignPlayers(newFeignPlayers);
    localStorage.setItem("feign_players", JSON.stringify(newFeignPlayers));
  }

  return (
    <>
      <Header />
      <ConfContext.Provider
        value={{
          channelURL: voiceChannelURL,
          serverID: serverID,
          channelID: channelID,
          discordUsers: discordUsers,
          updateDiscordUsers: updateDiscordUsers,
          feignPlayers: feignPlayers,
          updateFeignPlayers: updateFeignPlayers,
        }}
      >
        <Container style={{ paddingTop: "5px" }}>
          <p>
            <small>全ての設定は、お使いのブラウザにのみ保存されます。設定内容が外部に送信されることはありません。</small>
          </p>
          <h2>特徴</h2>
          <ul>
            <li>単一の CSS で Discord アイコンと Feign のキャラクターを同時に表示します。</li>
            <li>CSS 内部に画像情報を保存しているため、外部依存を減らすことができます。</li>
            <li>簡易的なユーザー管理により、過去の情報を再利用できます。</li>
          </ul>
          <h2>設定</h2>
          <Accordion defaultActiveKey={["0", "1", "2", "3"]} alwaysOpen className="mb-4">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Discord ボイスチャンネル</Accordion.Header>
              <Accordion.Body>
                <Container>
                  <p>Discord を起動し、対象のボイスチャンネルを右クリック → 「リンクをコピー」を選択。以下のフォームに貼り付けてください。</p>
                  <InputGroup size="sm">
                    <InputGroup.Text id="voice-channel-url">URL</InputGroup.Text>
                    <Form.Control
                      area-label="voice-channel-url-label"
                      area-aria-describedby="voice-channel-url"
                      value={voiceChannelURL}
                      onChange={handleVoiceChannelURL}
                      style={{ maxWidth: "540px" }}
                    />
                  </InputGroup>
                </Container>
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
              <Accordion.Body></Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <h2>プレビュー</h2>
          <p>アイコンをクリックすると会話状態が切り替わります。</p>
          <Preview />
          <h2>OBS 設定</h2>
          <OBSSettings />
        </Container>
      </ConfContext.Provider>
      <style>{buildCSS(feignPlayers)}</style>
      <style>{buildFeignImageCSS()}</style>
    </>
  );
}
