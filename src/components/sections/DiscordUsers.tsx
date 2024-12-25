import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
// import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { Container, Row, Col, InputGroup, Form, Button, Modal } from "react-bootstrap";
import { DiscordUser, ConfContext } from "../../models/Context";

export function DiscordUsers() {
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
    return (<><p>以下のユーザーを削除します。よろしいですか?</p>
      <ul>
        <li>名前: {discordUsers[removeIndex].name}</li>
        <li>ID: {discordUsers[removeIndex].id}</li>
      </ul>
    </>
    );
  }

  function DiscordUserRow(user: DiscordUser, index: number) {
    const isEditing = discordUserEditing.index < discordUsers.length;

    if (index === discordUserEditing.index) {
      const nameTrimmed = discordUserEditing.name.trim();
      const isNameEmpty = nameTrimmed === '';
      const isNameUnique = discordUsers.every((user, i) => i === index || user.name !== nameTrimmed)
      const isNameValid = !isNameEmpty && isNameUnique;
      const nameFeedback = `既に存在します: ${nameTrimmed}`;
      const idTrimmed = discordUserEditing.id.trim();
      const isIdEmpty = idTrimmed === '';
      const isIdDigitOnly = /^[0-9]+$/.test(idTrimmed);
      const isIdUnique = discordUsers.every((user, i) => i === index || user.id !== idTrimmed);
      const isIdValid = isIdDigitOnly && isIdUnique;
      const idFeedback = isIdDigitOnly ? `既に存在します: ${idTrimmed}` : 'ID には数字のみ含まれます';

      return (
        <Form key={`discord-${index}`} onSubmit={handleSubmit}>
          <Row className="mb-1">
            {/* <Col className="col-md-1">
              <FontAwesomeIcon icon={faDiscord} />
            </Col> */}
            <Col className="col-md-3">
              <InputGroup size="sm" hasValidation>
                <InputGroup.Text id={`discord-user-edit-${index}`}>名前</InputGroup.Text>
                <Form.Control
                  area-label={`discord-user-edit-label-${index}`}
                  area-aria-describedby={`discord-user-edit-${index}`}
                  required={isEditing}
                  placeholder="名前を入力"
                  value={discordUserEditing.name}
                  isValid={!isNameEmpty && isNameValid}
                  isInvalid={!isNameEmpty && !isNameValid}
                  onChange={(e) => updateDiscordUserEditing(index, e.target.value, discordUserEditing.id)}
                />
                <Form.Control.Feedback type="invalid" tooltip={true}>{nameFeedback}</Form.Control.Feedback>
              </InputGroup>
            </Col>
            <Col className='col-md-3'>
              <InputGroup size="sm" hasValidation>
                <InputGroup.Text id={`discord-id-edit-${index}`}>ID</InputGroup.Text>
                <Form.Control
                  area-label={`discord-id-edit-label-${index}`}
                  area-aria-describedby={`discord-id-edit-${index}`}
                  required={isEditing}
                  placeholder="Discord ID を入力"
                  value={discordUserEditing.id}
                  isValid={!isIdEmpty && isIdValid}
                  isInvalid={!isIdEmpty && !isIdValid}
                  onChange={(e) => updateDiscordUserEditing(index, discordUserEditing.name, e.target.value)}
                />
                <Form.Control.Feedback type="invalid" tooltip={true}>{idFeedback}</Form.Control.Feedback>
              </InputGroup>
            </Col>
            <Col className="col-md-3">
              <Button type="submit" size="sm" variant="primary" className="me-3" disabled={!isNameValid || !isIdValid}
                style={{ minWidth: '70px' }}>
                {`${isEditing ? "保存" : "追加"}`}
              </Button>
              <Button size="sm" variant="secondary" className={`${isEditing ? "visible" : "invisible"}`} onClick={cancelEdit}
                style={{ minWidth: '70px' }}>
                キャンセル
              </Button>
            </Col>
          </Row>
        </Form>
      );
    } else {
      return (
        <Row key={`discord-${index}`} className="mb-1">
          <Col className="col-md-3">
            <InputGroup size="sm">
              <InputGroup.Text id={`discord-user-${index}`}>名前</InputGroup.Text>
              <Form.Control
                area-label={`discord-user-${index}`}
                area-aria-describedby={`discord-user-${index}`}
                disabled={true}
                value={user.name}
              />
            </InputGroup>
          </Col>
          <Col className="col-md-3">
            <InputGroup size="sm">
              <InputGroup.Text id={`discord-id-${index}`}>ID</InputGroup.Text>
              <Form.Control
                area-label={`discord-id-label-${index}`}
                area-aria-describedby={`discord-id-${index}`}
                disabled={true}
                value={user.id}
              />
            </InputGroup>
          </Col>
          <Col className="col-md-3">
            <Button size="sm" variant="secondary" className={`me-3 ${isEditing ? "invisible" : "visible"}`}
              style={{ minWidth: '70px' }}
              onClick={() => startEdit(index)}>
              編集
            </Button>
            <Button size="sm" variant="danger" className={`${isEditing ? "invisible" : "visible"}`}
              style={{ minWidth: '70px' }}
              onClick={
                () => {
                  setModalOpen(true);
                  setRemoveIndex(index);
                }
              }>
              削除
            </Button>
          </Col>
          <Col className="col-md-2">
            <Button
              size="sm"
              variant="secondary"
              className={`me-3 ${isEditing || index === discordUsers.length - 1 ? "invisible" : "visible"}`}
              onClick={() => moveDown(index)}
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className={`${isEditing || index === 0 ? "invisible" : "visible"}`}
              onClick={() => moveUp(index)}
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </Button>
          </Col>
        </Row>
      );
    }
  }

  return (
    <Container>
      <p>Discord のユーザー ID を取得するには、まず「設定」 → 「詳細設定」 → 「開発者モード」を有効にします。
        その後、対象のユーザーを右クリック → 「ユーザーIDをコピー」を行い、以下に貼り付けてください。
        ここで登録する名前は、Discord 上の名前と異なっていても問題ありません。
      </p>
      {discordUsers.map((user, index) => {
        return DiscordUserRow(user, index);
      })}
      {discordUsers.length === discordUserEditing.index ? DiscordUserRow({ name: "", id: "" }, discordUsers.length) : <></>}

      <Modal show={modalOpen} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Discord ユーザーの削除</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalBody()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            キャンセル
          </Button>
          <Button variant="danger" onClick={() => {
            removeItem(removeIndex);
            handleModalClose();
          }}>
            削除
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
