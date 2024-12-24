import React from "react";
import { Form } from "react-bootstrap";

export function ColorPicker(label: string, value: string, handleChange: (color: string) => void) {
  return (
    <Form.Control
      type="color"
      title={label}
      value={value}
      className="form-control-color"
      style={{ minWidth: "50px", maxWidth: "50px" }}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
}
