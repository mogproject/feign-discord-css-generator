import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ConfContext, DiscordUser, FEI_COLORS } from "../../models/Context";
import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";

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

    const { t: translate } = useTranslation('translation', { keyPrefix: 'colors' });
    const t = translate as ((s: string) => string);
    return (
      <Col key={`player-${color}`} className="mb-3">
        <Row className="justify-content-center mb-2">{t(FEI_COLORS[color])}</Row>
        <Row className="justify-content-center mb-2">
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
      {/* large screen */}
      <Row className="d-none d-md-flex">
        {Array(7)
          .fill(0)
          .map((_, i: number) => {
            return FeignPlayer(i);
          })}
      </Row>
      <Row className="d-none d-md-flex">
        {Array(6)
          .fill(0)
          .map((_, i: number) => {
            return FeignPlayer(7 + i);
          })}
        <Col></Col>
      </Row>

      {/* small screen */}
      <Row className="d-md-none">
        {Array(5)
          .fill(0)
          .map((_, i: number) => {
            return FeignPlayer(i);
          })}
      </Row>
      <Row className="d-md-none">
        {Array(5)
          .fill(0)
          .map((_, i: number) => {
            return FeignPlayer(4 + i);
          })}
      </Row>
      <Row className="d-md-none">
        {Array(3)
          .fill(0)
          .map((_, i: number) => {
            return FeignPlayer(8 + i);
          })}
        <Col></Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
