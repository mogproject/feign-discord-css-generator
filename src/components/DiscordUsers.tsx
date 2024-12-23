import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import { DiscordUser, ConfContext } from "./Context";

export function DiscordUsers() {
  const { discordUsers, updateDiscordUsers } = React.useContext(ConfContext);
  const [editIndex, setEditIndex] = React.useState(discordUsers.length);
  const [editingUser, setEditingUser] = React.useState(editIndex === discordUsers.length ? { name: "", id: "" } : discordUsers[editIndex]);
  const [validated, setValidated] = React.useState(false);

  //----------------------------------------------------------------------------
  //  Button Actions
  //----------------------------------------------------------------------------
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // validate
    const trimmedUser = { name: editingUser.name.trim(), id: editingUser.id.trim() };

    if (trimmedUser.name === "" || trimmedUser.id === "") {
      event.stopPropagation(); // empty items
      return;
    }
    if (discordUsers.some((x, i) => i !== editIndex && x.name === trimmedUser.name)) {
      event.stopPropagation(); // name conflict
      return;
    }
    if (discordUsers.some((x, i) => i !== editIndex && x.id === trimmedUser.id)) {
      event.stopPropagation(); // id conflict
      return;
    }

    // update
    if (editIndex === discordUsers.length) {
      updateDiscordUsers([...discordUsers, trimmedUser]);
    } else {
      updateDiscordUsers([...discordUsers.slice(0, editIndex), trimmedUser, ...discordUsers.slice(editIndex + 1)]);
    }

    // create new row
    setValidated(false);
    setEditingUser({ name: "", id: "" });
    setEditIndex(discordUsers.length + (editIndex === discordUsers.length ? 1 : 0));
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
    setEditingUser(discordUsers[index]);
    setEditIndex(index);
  }
  function cancelEdit() {
    setValidated(false);
    setEditingUser({ name: "", id: "" });
    setEditIndex(discordUsers.length);
  }
  function removeItem(index: number) {
    // TODO: open modal
    updateDiscordUsers([...discordUsers.slice(0, index), ...discordUsers.slice(index + 1)]);
    setValidated(false);
    setEditingUser({ name: "", id: "" });
    setEditIndex(discordUsers.length - 1);
  }

  function DiscordUserRow(user: DiscordUser, index: number) {
    const isEditing = editIndex < discordUsers.length;

    if (index === editIndex) {
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
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
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
                  value={editingUser.id}
                  onChange={(e) => setEditingUser({ ...editingUser, id: e.target.value })}
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
            <Button size="sm" className={`btn btn-danger ${isEditing ? "invisible" : "visible"}`} onClick={() => removeItem(index)}>
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
      {discordUsers.length === editIndex ? DiscordUserRow({ name: "", id: "" }, discordUsers.length) : <></>}
    </Container>
  );
}
