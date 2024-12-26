import { faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, ButtonGroup, Container, Dropdown, Modal } from "react-bootstrap";
import FileLoader from "../../io/FileLoader";
import FileSaver from "../../io/FileSaver";
import { ConfContext, defaultConf, DiscordUser, players2array } from "../../models/Context";

function settings2json(settings: { [key: string]: any }, anonymizeDiscordUsers: boolean): string {
  if (anonymizeDiscordUsers) {
    // Create anonymous users from player IDs.
    const activeIDs: string[] = settings.feignPlayers.filter((id: string) => id !== "");
    const anonymizedUsers: DiscordUser[] = activeIDs.map(
      (id: string, i: number) => { return { name: `user-${i}`, id: id }; }
    );
    return JSON.stringify({ channelURL: settings.channelURL, discordUsers: anonymizedUsers, feignPlayers: settings.feignPlayers })
  } else {
    return JSON.stringify(settings);
  }
}

function SaveLoad() {
  const {
    channelURL,
    discordUsers,
    feignPlayers,
    viewSettings,
    updateVoiceChannelURL,
    updateDiscordUsers,
    updateFeignPlayers,
    updateIsSpeaking,
    updateFeiSettings,
    updateAvatarSettings,
    updateUsernameSettings
  } = React.useContext(ConfContext);

  function loadSettingsFromFile(content: string, loadPlayerSettings: boolean, loadViewSettings: boolean): boolean {
    try {
      const data = JSON.parse(content);
      if (!data) return false;

      if (loadPlayerSettings) {
        updateVoiceChannelURL(data['channelURL'] || defaultConf.channelURL);
        updateDiscordUsers(data['discordUsers'] || defaultConf.discordUsers);
        const newFeignPlayers = data['feignPlayers'] || defaultConf.feignPlayers;
        updateFeignPlayers(newFeignPlayers);
        updateIsSpeaking(players2array(newFeignPlayers));  // no one is speaking
      }
      if (loadViewSettings) {
        const settings = data['viewSettings'] || defaultConf.viewSettings;
        updateFeiSettings(settings.fei);
        updateAvatarSettings(settings.avatar);
        updateUsernameSettings(settings.username);
      }
    } catch (e) {
      return false;
    }
    return true;
  }
  const fileLoader = new FileLoader('file-loader');
  const [loadMessage, setLoadMessage] = React.useState({ level: '', message: '' });
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalClose = () => setModalOpen(false);
  const handleInitializeAll = () => {
    updateVoiceChannelURL(defaultConf.channelURL);
    updateDiscordUsers(defaultConf.discordUsers);
    updateFeignPlayers(defaultConf.feignPlayers);
    updateIsSpeaking(players2array(defaultConf.feignPlayers));  // no one is speaking
    updateFeiSettings(defaultConf.viewSettings.fei);
    updateAvatarSettings(defaultConf.viewSettings.avatar);
    updateUsernameSettings(defaultConf.viewSettings.username);
    setModalOpen(false);
  };

  const fileSaver = new FileSaver();

  return (
    <>
      <Container className="mb-2 d-flex">
        <Dropdown as={ButtonGroup} className="me-4">
          <Button variant="outline-secondary" onClick={() => fileSaver.saveTextToFile(
            () => settings2json({ channelURL: channelURL, discordUsers: discordUsers, feignPlayers: feignPlayers, viewSettings: viewSettings }, false), 'feign-discord.json'
          )} style={{ minWidth: '200px' }}>
            <FontAwesomeIcon icon={faDownload} />
            <span>&nbsp;ファイルとして保存</span>
          </Button>
          <Dropdown.Toggle split variant='secondary'></Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href='#'
              onClick={() => fileSaver.saveTextToFile(() => settings2json({ channelURL: channelURL, discordUsers: discordUsers, feignPlayers: feignPlayers }, false), 'feign-discord-players.json')}
            >表示設定以外を保存</Dropdown.Item>
            <Dropdown.Item href='#'
              onClick={() => fileSaver.saveTextToFile(() => settings2json({ channelURL: channelURL, discordUsers: discordUsers, feignPlayers: feignPlayers }, true), 'feign-discord-player-ids.json')}
            >表示設定以外を匿名化して保存</Dropdown.Item>
            <Dropdown.Item href='#'
              onClick={() => fileSaver.saveTextToFile(() => settings2json({ viewSettings: viewSettings }, false), 'feign-discord-overlay.json')}
            >表示設定のみを保存</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown as={ButtonGroup} className="me-1">
          <Button variant='outline-secondary' style={{ minWidth: '200px' }}
            onClick={() => fileLoader.loadTextFromFile((s) => loadSettingsFromFile(s, true, true), setLoadMessage, 'json')}>
            <FontAwesomeIcon icon={faUpload} />&nbsp;全ての設定を読み込み
          </Button>

          <Dropdown.Toggle split variant='secondary'></Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href='#'
              onClick={() => fileLoader.loadTextFromFile((s) => loadSettingsFromFile(s, true, false), setLoadMessage, 'json')}
            >表示設定以外を読み込み</Dropdown.Item>
            <Dropdown.Item href='#'
              onClick={() => fileLoader.loadTextFromFile((s) => loadSettingsFromFile(s, false, true), setLoadMessage, 'json')}
            >表示設定のみを読み込み</Dropdown.Item>
            <Dropdown.Item href='#'
              onClick={() => setModalOpen(true)}>
              全ての設定を初期化
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <span className={`my-auto small text-${loadMessage.level}`}>{loadMessage.message}</span>
      </Container>

      <Modal show={modalOpen} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>初期設定に戻す</Modal.Title>
        </Modal.Header>
        <Modal.Body>全ての設定を初期状態に戻します。よろしいですか?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            キャンセル
          </Button>
          <Button variant="primary" onClick={handleInitializeAll}>
            初期設定に戻す
          </Button>
        </Modal.Footer>
      </Modal>
    </>);
}
export default SaveLoad;
