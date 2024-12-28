import React from "react";
import { ButtonGroup, Col, Form, InputGroup, Row } from "react-bootstrap";
import { AnimationSettings } from "../../models/ViewSettings";
import { ColorPicker } from "./ColorPicker";
import { useTranslation } from "react-i18next";

export function AnimationSettingButtonGroup(
  prefix: string,
  setting: AnimationSettings,
  showOutline: boolean,
  handleChange: (setting: AnimationSettings) => void
) {
  const { t: translate } = useTranslation('translation', { keyPrefix: 'settings.overlay' });
  const t = translate as ((s: string, o?: Record<string, string | boolean>) => string);
  const tt = (k: string) => { return t(k, { keyPrefix: '' }) };

  const jsxJump = (
    <ButtonGroup>
      <Form.Control
        type="checkbox"
        id={`${prefix}-jump`}
        className="btn-check"
        autoComplete="off"
        checked={setting.jump}
        onChange={() => handleChange({ ...setting, jump: !setting.jump })}
      />
      <label className="btn btn-outline-primary" htmlFor={`${prefix}-jump`} style={{ minWidth: "96px" }}>
        {t('jump')}
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
          checked={setting.flash}
          onChange={() => handleChange({ ...setting, flash: !setting.flash })}
        />
        <label className="btn btn-outline-primary" htmlFor={`${prefix}-flash`} style={{ minWidth: "80px" }}>
          {t('flash')}
        </label>
      </ButtonGroup>

      <InputGroup>
        <InputGroup.Text>{tt('color')}</InputGroup.Text>
        {ColorPicker(t('flash_color'), setting.flashColor, (color) => handleChange({ ...setting, flashColor: color }))}
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
        <label className="btn btn-outline-primary" htmlFor={`${prefix}-outline`} style={{ minWidth: "80px" }}>
          {t('outline')}
        </label>
      </ButtonGroup>
      <InputGroup>
        <InputGroup.Text className="">{tt('color')}</InputGroup.Text>
        {ColorPicker(t('outline_color'), setting.outlineColor, (color) => handleChange({ ...setting, outlineColor: color }))}
      </InputGroup>
    </div>
  );

  return (
    <Row>
      <Col className="col-5 col-md-5 mb-1 col-lg-3">{jsxJump}</Col>
      <Col className={`col-7 col-md-7 ${showOutline ? 'mb-1 ' : ''}col-lg-4 col-xl-4 px-lg-0`}>{jsxFlash}</Col>
      <Col className="col-7 col-md-6 col-lg-4 col-lg-4 px-lg-0">{showOutline ? jsxOutline : ""}</Col>
    </Row>
  );
}
