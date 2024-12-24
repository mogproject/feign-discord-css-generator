import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ConfContext, DiscordUser, FEI_COLORS } from "./Context";
import Form from "react-bootstrap/Form";

const COLOR_DESCRIPTION: string[] = ["白", "薄橙", "紫", "緑", "青", "赤", "黄色", "黄緑", "水色", "薄桃", "茶色", "濃桃", "濃橙"];

export function FeignPlayers() {
  const { discordUsers, feignPlayers, updateFeignPlayers } = React.useContext(ConfContext);

  function handleUpdate(color: number, targetIndex: string) {
    const target = parseInt(targetIndex);
    const targetID = target >= 0 ? discordUsers[target].id : "";
    updateFeignPlayers([...feignPlayers.slice(0, color), targetID, ...feignPlayers.slice(color + 1)]);
  }

  function FeignPlayer(color: number) {
    const targetIndex = discordUsers.findIndex((u: DiscordUser) => u.id === feignPlayers[color]);

    return (
      <Col className="mb-3">
        <Row className="justify-content-md-center mb-2">{COLOR_DESCRIPTION[color]}</Row>
        <Row className="justify-content-md-center mb-2">
          <img src={`assets/img/${FEI_COLORS[color]}-small.png`} width="80px" style={{ maxWidth: "80px" }} alt=""></img>
        </Row>
        <Row className="justify-content-md-center" style={{ marginTop: "-45px" }}>
          <Form.Select onChange={(e) => handleUpdate(color, e.target.value)} size="sm" style={{ width: "90%" }}>
            <option selected={targetIndex < 0} value="-1">
              ----
            </option>
            {discordUsers.map((u: DiscordUser, i: number) => {
              return (
                <option selected={i === targetIndex} value={i}>
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
