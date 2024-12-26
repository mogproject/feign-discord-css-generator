import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ConfContext, DiscordUser, FEI_COLORS } from "../../models/Context";
import Form from "react-bootstrap/Form";

const COLOR_DESCRIPTION: string[] = ["白", "薄橙", "紫", "緑", "青", "赤", "黄色", "黄緑", "水色", "薄桃", "茶色", "濃桃", "濃橙"];

export function FeignPlayers() {
  const { discordUsers, feignPlayers, updateFeignPlayers } = React.useContext(ConfContext);

  function handleUpdate(color: number, targetIndex: string) {
    const target = parseInt(targetIndex);
    const targetID = target >= 0 ? discordUsers[target].id : "";

    const newPlayers = feignPlayers.map((user, i) => {
      if (i === color) return targetID;  // data to update
      if (user === targetID) return '';  // the same ID is already used for another color
      return user;
    });
    updateFeignPlayers(newPlayers);
  }

  function FeignPlayer(color: number) {
    const targetIndex = discordUsers.findIndex((u: DiscordUser) => u.id === feignPlayers[color]);

    return (
      <Col key={`player-${color}`} className="mb-3">
        <Row className="justify-content-md-center mb-2">{COLOR_DESCRIPTION[color]}</Row>
        <Row className="justify-content-md-center mb-2">
          <img src={`assets/img/${FEI_COLORS[color]}-small.png`} width="80px" style={{ maxWidth: "80px" }} alt=""></img>
        </Row>
        <Row className="justify-content-md-center" style={{ marginTop: "-45px" }}>
          <Form.Select
            onChange={(e) => handleUpdate(color, e.target.value)}
            value={targetIndex}
            size="sm"
            className={targetIndex < 0 ? 'player-unused' : ''}
            style={{ width: "90%" }}>
            <option value="-1">
              ----
            </option>
            {discordUsers.map((u: DiscordUser, i: number) => {
              return (
                <option key={`player-${color}-${i}`} value={i}>
                  {u.name}
                </option>
              );
            })}
          </Form.Select>
        </Row>
      </Col>
    );
  }

  return (
    <Container>
      <Row>
        {Array(7)
          .fill(0)
          .map((_, i: number) => {
            return FeignPlayer(i);
          })}
      </Row>
      <Row>
        {Array(6)
          .fill(0)
          .map((_, i: number) => {
            return FeignPlayer(7 + i);
          })}
        <Col></Col>
      </Row>
    </Container>
  );
}
