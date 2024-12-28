import { faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, ButtonGroup, Container, Dropdown, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
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
  const { t: translate } = useTranslation('translation', { keyPrefix: 'settings.saveload' });
  const t = translate as ((s: string) => string);
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
          )} style={{ minWidth: '180px' }}>
            <FontAwesomeIcon icon={faDownload} />
            <span>&nbsp;{t('save_all')}</span>
          </Button>
          <Dropdown.Toggle split variant='secondary'></Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href='#'
              onClick={() => fileSaver.saveTextToFile(() => settings2json({ channelURL: channelURL, discordUsers: discordUsers, feignPlayers: feignPlayers }, false), 'feign-discord-players.json')}
            >{t('save_all_but_view')}</Dropdown.Item>
            <Dropdown.Item href='#'
              onClick={() => fileSaver.saveTextToFile(() => settings2json({ channelURL: channelURL, discordUsers: discordUsers, feignPlayers: feignPlayers }, true), 'feign-discord-player-ids.json')}
            >{t('save_all_but_view_anonymized')}</Dropdown.Item>
            <Dropdown.Item href='#'
              onClick={() => fileSaver.saveTextToFile(() => settings2json({ viewSettings: viewSettings }, false), 'feign-discord-overlay.json')}
            >{t('save_view_only')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown as={ButtonGroup} className="me-1">
          <Button variant='outline-secondary' style={{ minWidth: '180px' }}
            onClick={() => fileLoader.loadTextFromFile((s) => loadSettingsFromFile(s, true, true), setLoadMessage, 'json')}>
            <FontAwesomeIcon icon={faUpload} />&nbsp;{t('load_all')}
          </Button>

          <Dropdown.Toggle split variant='secondary'></Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href='#'
              onClick={() => fileLoader.loadTextFromFile((s) => loadSettingsFromFile(s, true, false), setLoadMessage, 'json')}
            >{t('load_all_but_view')}</Dropdown.Item>
            <Dropdown.Item href='#'
              onClick={() => fileLoader.loadTextFromFile((s) => loadSettingsFromFile(s, false, true), setLoadMessage, 'json')}
            >{t('load_view_only')}</Dropdown.Item>
            <Dropdown.Item href='#'
              onClick={() => setModalOpen(true)}>
              {t('initialize_all')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <span className={`my-auto small text-${loadMessage.level}`}>{loadMessage.message}</span>
      </Container>

      <Modal show={modalOpen} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('initialization')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('confirm_initialization')}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            {t('cancel')}
          </Button>
          <Button variant="primary" onClick={handleInitializeAll}>
            {t('initialize')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>);
}
export default SaveLoad;
