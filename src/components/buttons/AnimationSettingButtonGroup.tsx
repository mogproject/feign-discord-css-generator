import React from "react";
import { ButtonGroup, Form, InputGroup } from "react-bootstrap";
import { AnimationSettings } from "../../models/Context";
import { ColorPicker } from "./ColorPicker";

export function AnimationSettingButtonGroup(
  prefix: string,
  setting: AnimationSettings,
  showOutline: boolean,
  handleChange: (setting: AnimationSettings) => void
) {
  const jsxJump = (
    <ButtonGroup className="me-5">
      <Form.Control
        type="checkbox"
        id={`${prefix}-jump`}
        className="btn-check"
        autoComplete="off"
        checked={setting.jump}
        onChange={() => handleChange({ ...setting, jump: !setting.jump })}
      />
      <label className="btn btn-outline-primary" htmlFor={`${prefix}-jump`} style={{ minWidth: "96px" }}>
        ぴょこぴょこ
      </label>
    </ButtonGroup>
  );

  const jsxFlash = (
    <div className="d-flex">
      <ButtonGroup className="me-1">
        <Form.Control
          type="checkbox"
          id={`${prefix}-flash`}
          className="btn-check"
          autoComplete="off"
          style={{ width: "160px" }}
          checked={setting.flash}
          onChange={() => handleChange({ ...setting, flash: !setting.flash })}
        />
        <label className="btn btn-outline-primary" htmlFor={`${prefix}-flash`} style={{ minWidth: "96px" }}>
          発光
        </label>
      </ButtonGroup>

      <InputGroup className="me-5">
        <InputGroup.Text>色</InputGroup.Text>
        {ColorPicker("発光色", setting.flashColor, (color) => handleChange({ ...setting, flashColor: color }))}
      </InputGroup>
    </div>
  );

  const jsxOutline = (
    <div className="d-flex">
      <ButtonGroup className="me-1">
        <Form.Control
          type="checkbox"
          id={`${prefix}-outline`}
          className="btn-check"
          autoComplete="off"
          checked={setting.outline}
          onChange={() => handleChange({ ...setting, outline: !setting.outline })}
        />
        <label className="btn btn-outline-primary" htmlFor={`${prefix}-outline`} style={{ minWidth: "96px" }}>
          縁取り
        </label>
      </ButtonGroup>
      <InputGroup>
        <InputGroup.Text className="">色</InputGroup.Text>
        {ColorPicker("縁取り色", setting.outlineColor, (color) => handleChange({ ...setting, outlineColor: color }))}
      </InputGroup>
    </div>
  );

  return (
    <div className="d-flex">
      {jsxJump}
      {jsxFlash}
      {showOutline ? jsxOutline : ""}
    </div>
  );
}
