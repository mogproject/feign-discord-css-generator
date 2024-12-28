import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp, faPen, faPenToSquare, faTractor, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, InputGroup, Form, Button, Modal } from "react-bootstrap";
import { DiscordUser, ConfContext } from "../../models/Context";
import { useTranslation } from "react-i18next";

export function DiscordUsers() {
  const { t: translate } = useTranslation('translation', { keyPrefix: 'settings.discord' });
  const t = translate as ((s: string, o?: Record<string, string | boolean>) => string);
  const tt = (k: string) => { return t(k, { keyPrefix: '' }) };

  const { discordUsers, discordUserEditing, updateDiscordUsers, cleanDiscordId, updateDiscordUserEditing } = React.useContext(ConfContext);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [removeIndex, setRemoveIndex] = React.useState(-1);
  const handleModalClose = () => setModalOpen(false);

  //----------------------------------------------------------------------------
  //  Button Actions
  //----------------------------------------------------------------------------
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isNewUser = discordUserEditing.index === discordUsers.length;

    // validate
    const trimmedUser = { name: discordUserEditing.name.trim(), id: discordUserEditing.id.trim() };

    if (trimmedUser.name === "" || trimmedUser.id === "") {
      event.stopPropagation(); // empty items
      return;
    }
    if (discordUsers.some((x, i) => i !== discordUserEditing.index && x.name === trimmedUser.name)) {
      event.stopPropagation(); // name conflict
      return;
    }
    if (discordUsers.some((x, i) => i !== discordUserEditing.index && x.id === trimmedUser.id)) {
      event.stopPropagation(); // id conflict
      return;
    }

    // update
    if (isNewUser) {
      updateDiscordUsers([...discordUsers, trimmedUser]);
    } else {
      if (trimmedUser.id !== discordUsers[discordUserEditing.index].id) {
        // user id removed
        cleanDiscordId(discordUsers[discordUserEditing.index].id);
      }
      updateDiscordUsers([...discordUsers.slice(0, discordUserEditing.index),
        trimmedUser, ...discordUsers.slice(discordUserEditing.index + 1)
      ]);
    }
  }
  function moveDown(index: number) {
    if (index + 1 >= discordUsers.length) return;
    updateDiscordUsers([...discordUsers.slice(0, index), discordUsers[index + 1], discordUsers[index], ...discordUsers.slice(index + 2)]);
  }
  function moveUp(index: number) {
    if (index - 1 < 0) return;
    updateDiscordUsers([
      ...discordUsers.slice(0, index - 1),
      discordUsers[index],
      discordUsers[index - 1],
      ...discordUsers.slice(index + 1),
    ]);
  }
  function startEdit(index: number) {
    if (index >= discordUsers.length) return;
    updateDiscordUserEditing(index, discordUsers[index].name, discordUsers[index].id);
  }
  function cancelEdit() {
    updateDiscordUserEditing(discordUsers.length, '', '');
  }
  function removeItem(index: number) {
    if (index < 0 || index >= discordUsers.length) return;

    cleanDiscordId(discordUsers[index].id);
    updateDiscordUsers([...discordUsers.slice(0, index), ...discordUsers.slice(index + 1)]);
  }

  const modalBody = () => {
    if (removeIndex < 0 || discordUsers.length <= removeIndex) return <></>;
    return (<><p>{t('confirm_removal')}</p>
      <ul>
        <li>{tt('name')}: {discordUsers[removeIndex].name}</li>
        <li>ID: {discordUsers[removeIndex].id}</li>
      </ul>
    </>
    );
  }

  function DiscordUserRow(user: DiscordUser, index: number) {
    const isEditing = discordUserEditing.index < discordUsers.length;
    const buttonInterval = 'me-1'

    function EditButton() {
      return (<Button size="sm" variant="secondary" className={`${buttonInterval} ${isEditing ? "invisible" : "visible"}`}
        title={tt('edit')}
        onClick={() => startEdit(index)}>
        <span className="d-none d-lg-block" style={{ minWidth: '70px' }}>{tt('edit')}</span>
        <span className="d-lg-none"><FontAwesomeIcon icon={faPenToSquare} /></span>
      </Button>);
    }

    function RemoveButton() {
      return (<Button size="sm" variant="danger" className={`${buttonInterval} ${isEditing ? "invisible" : "visible"}`}
        title={tt('remove')}
        onClick={
          () => {
            setModalOpen(true);
            setRemoveIndex(index);
          }
        }>
        <span className="d-none d-lg-block" style={{ minWidth: '70px' }}>{tt('remove')}</span>
        <span className="d-lg-none"><FontAwesomeIcon icon={faTrash} /></span>
      </Button>);
    }

    function SaveButton(isValid: boolean) {
      const title = isEditing ? tt('save') : tt('add');
      return (<Button type="submit" size="sm" variant="primary" className={`${buttonInterval}`} disabled={!isValid}
        title={title}>

        <span className="d-none d-lg-block" style={{ minWidth: '70px' }}>{title}</span>
        <span className="d-lg-none"><FontAwesomeIcon icon={faPen} /></span>
      </Button>);
    }

    function CancelButton(isEditing: boolean) {
      return (<Button size="sm" variant="secondary" className={`${buttonInterval} ${isEditing ? "visible" : "invisible"}`} onClick={cancelEdit}
        title={tt('cancel')}>
        <span className="d-none d-lg-block" style={{ minWidth: '70px' }}>{tt('cancel')}</span>
        <span className="d-lg-none"><FontAwesomeIcon icon={faXmark} /></span>
      </Button>);
    }

    function MoveDownButton() {
      return (<Button
        size="sm"
        variant="secondary"
        className={`${buttonInterval} ${isEditing || index === discordUsers.length - 1 ? "invisible" : "visible"}`}
        onClick={() => moveDown(index)}
      >
        <FontAwesomeIcon icon={faArrowDown} />
      </Button>);
    }

    function MoveUpButton() {
      return (<Button
        size="sm"
        variant="secondary"
        className={`${isEditing || index === 0 ? "invisible" : "visible"}`}
        onClick={() => moveUp(index)}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </Button>);
    }

    function NameInput(disabled: boolean, isNameEmpty: boolean, isNameValid: boolean, feedback: string) {
      if (disabled) {
        return (<InputGroup size="sm">
          <InputGroup.Text id={`discord-user-${index}`}>{tt('name')}</InputGroup.Text>
          <Form.Control
            area-label={`discord-user-${index}`}
            area-aria-describedby={`discord-user-${index}`}
            disabled={true}
            value={user.name}
          />
        </InputGroup>);
      } else {
        return (<InputGroup size="sm" hasValidation>
          <InputGroup.Text id={`discord-user-edit-${index}`}>{tt('name')}</InputGroup.Text>
          <Form.Control
            area-label={`discord-user-edit-label-${index}`}
            area-aria-describedby={`discord-user-edit-${index}`}
            required={isEditing}
            placeholder={t('name_placeholder')}
            value={discordUserEditing.name}
            isValid={!isNameEmpty && isNameValid}
            isInvalid={!isNameEmpty && !isNameValid}
            onChange={(e) => updateDiscordUserEditing(index, e.target.value, discordUserEditing.id)}
          />
          <Form.Control.Feedback type="invalid" tooltip={true}>{feedback}</Form.Control.Feedback>
        </InputGroup>);
      }
    }

    function IdInput(disabled: boolean, isIdEmpty: boolean, isIdValid: boolean, feedback: string) {
      if (disabled) {
        return (<InputGroup size="sm">
          <InputGroup.Text id={`discord-id-${index}`}>ID</InputGroup.Text>
          <Form.Control
            area-label={`discord-id-label-${index}`}
            area-aria-describedby={`discord-id-${index}`}
            disabled={true}
            value={user.id}
          />
        </InputGroup>);
      } else {
        return (<InputGroup size="sm" hasValidation>
          <InputGroup.Text id={`discord-id-edit-${index}`}>ID</InputGroup.Text>
          <Form.Control
            area-label={`discord-id-edit-label-${index}`}
            area-aria-describedby={`discord-id-edit-${index}`}
            required={isEditing}
            placeholder={t('id_placeholder')}
            value={discordUserEditing.id}
            isValid={!isIdEmpty && isIdValid}
            isInvalid={!isIdEmpty && !isIdValid}
            onChange={(e) => updateDiscordUserEditing(index, discordUserEditing.name, e.target.value)}
          />
          <Form.Control.Feedback type="invalid" tooltip={true}>{feedback}</Form.Control.Feedback>
        </InputGroup>);
      }
    }

    if (index === discordUserEditing.index) {
      const nameTrimmed = discordUserEditing.name.trim();
      const isNameEmpty = nameTrimmed === '';
      const isNameUnique = discordUsers.every((user, i) => i === index || user.name !== nameTrimmed)
      const isNameValid = !isNameEmpty && isNameUnique;
      const nameFeedback = `${t('already_exists')}: ${nameTrimmed}`;
      const idTrimmed = discordUserEditing.id.trim();
      const isIdEmpty = idTrimmed === '';
      const isIdDigitOnly = /^[0-9]+$/.test(idTrimmed);
      const isIdUnique = discordUsers.every((user, i) => i === index || user.id !== idTrimmed);
      const isIdValid = isIdDigitOnly && isIdUnique;
      const idFeedback = isIdDigitOnly ? `${t('already_exists')}: ${idTrimmed}` : t('number_only');

      return (
        <Form key={`discord-${index}`} onSubmit={handleSubmit}>
          <Row className="mb-1">
            <Col className="col-4 col-lg-3 pe-0">
              {NameInput(false, isNameEmpty, isNameValid, nameFeedback)}
            </Col>
            <Col className="col-3 col-sm-4 col-md-5 col-lg-3 pe-0">
              {IdInput(false, isIdEmpty, isIdValid, idFeedback)}
            </Col>
            <Col className="col-5 col-sm-4 col-md-3 col-lg-5 pe-0">
              {SaveButton(isNameValid && isIdValid)}
              {CancelButton(isEditing)}
            </Col>
          </Row>
        </Form>
      );
    } else {
      return (
        <Row key={`discord-${index}`} className="mb-1">
          <Col className="col-4 col-lg-3 pe-0">
            {NameInput(true, false, false, '')}
          </Col>
          <Col className="col-3 col-sm-4 col-md-5 col-lg-3 pe-0">
            {IdInput(true, false, false, '')}
          </Col>
          <Col className="col-5 col-sm-4 col-md-3 col-lg-5 pe-0">
            <EditButton />
            <span className="d-none d-lg-inline-block me-2" />
            <RemoveButton />
            <span className="d-none d-lg-inline-block me-4" />
            <MoveDownButton />
            <MoveUpButton />
          </Col>
        </Row>
      );
    }
  }

  return (
    <Container>
      <p>{t('description')}</p>
      {discordUsers.map((user, index) => {
        return DiscordUserRow(user, index);
      })}
      {discordUsers.length === discordUserEditing.index ? DiscordUserRow({ name: "", id: "" }, discordUsers.length) : <></>}

      <Modal show={modalOpen} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('removal')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalBody()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            {tt('cancel')}
          </Button>
          <Button variant="danger" onClick={() => {
            removeItem(removeIndex);
            handleModalClose();
          }}>
            {tt('remove')}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
