import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { Container, Row, Col, InputGroup, Form, Button, Modal } from "react-bootstrap";
import { DiscordUser, ConfContext } from "../../models/Context";

export function DiscordUsers() {
  const { discordUsers, discordUserEditing, updateDiscordUsers, cleanDiscordId, updateDiscordUserEditing } = React.useContext(ConfContext);
  const [validated, setValidated] = React.useState(false);
  const [modalOpen, SetModalOpen] = React.useState(false);
  const [removeIndex, SetRemoveIndex] = React.useState(-1);
  const handleModalClose = () => SetModalOpen(false);

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

    // create new row
    setValidated(false);
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
    setValidated(true);
    updateDiscordUserEditing(index, discordUsers[index].name, discordUsers[index].id);
  }
  function cancelEdit() {
    setValidated(false);
    updateDiscordUserEditing(discordUsers.length, '', '');
  }
  function removeItem(index: number) {
    if (index < 0 || index >= discordUsers.length) return;

    cleanDiscordId(discordUsers[index].id);
    updateDiscordUsers([...discordUsers.slice(0, index), ...discordUsers.slice(index + 1)]);
    setValidated(false);
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
      return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="row-cols-lg-auto align-items-center mb-1">
            <Col>
              <FontAwesomeIcon icon={faDiscord} />
            </Col>
            <Col>
              <InputGroup size="sm">
                <InputGroup.Text id={`discord-user-${index}`}>名前</InputGroup.Text>
                <Form.Control
                  area-label={`discord-user-${index}`}
                  area-aria-describedby={`discord-user-${index}`}
                  required
                  value={discordUserEditing.name}
                  onChange={(e) => updateDiscordUserEditing(index, e.target.value, discordUserEditing.id)}
                />
                <Form.Control.Feedback type="invalid" tooltip={true}>
                  ユーザー名を入力してください。
                </Form.Control.Feedback>
              </InputGroup>
            </Col>
            <Col>
              <InputGroup size="sm">
                <InputGroup.Text id={`discord-id-${index}`}>ID</InputGroup.Text>
                <Form.Control
                  area-label={`discord-id-label-${index}`}
                  area-aria-describedby={`discord-id-${index}`}
                  required
                  value={discordUserEditing.id}
                  onChange={(e) => updateDiscordUserEditing(index, discordUserEditing.name, e.target.value)}
                />
                <Form.Control.Feedback type="invalid" tooltip={true}>
                  Discord ユーザー ID を入力してください。
                </Form.Control.Feedback>
              </InputGroup>
            </Col>
            <Col className="col">
              <Button type="submit" size="sm" className="btn btn-primary">
                {`${isEditing ? "保存" : "追加"}`}
              </Button>
            </Col>
            <Col className="col">
              <Button size="sm" className={`btn btn-secondary ${isEditing ? "visible" : "invisible"}`} onClick={cancelEdit}>
                キャンセル
              </Button>
            </Col>
          </Row>
        </Form>
      );
    } else {
      return (
        <Row className="row-cols-lg-auto align-items-center mb-1">
          <Col>
            <FontAwesomeIcon icon={faDiscord} />
          </Col>
          <Col>
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
          <Col>
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
          <Col>
            <Button size="sm" className={`btn btn-secondary ${isEditing ? "invisible" : "visible"}`} onClick={() => startEdit(index)}>
              編集
            </Button>
          </Col>
          <Col className="col">
            <Button size="sm" className={`btn btn-danger ${isEditing ? "invisible" : "visible"}`} onClick={
              () => {
                SetModalOpen(true);
                SetRemoveIndex(index);
              }
            }>
              削除
            </Button>
          </Col>
          <Col>
            <Button
              size="sm"
              className={`btn btn-secondary ${isEditing || index === discordUsers.length - 1 ? "invisible" : "visible"}`}
              onClick={() => moveDown(index)}
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </Button>
          </Col>
          <Col>
            <Button
              size="sm"
              className={`btn btn-secondary ${isEditing || index === 0 ? "invisible" : "visible"}`}
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
