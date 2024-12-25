import React from "react";
import { ButtonGroup, Form, InputGroup } from "react-bootstrap";

export function RadioButtonGroup(labels: string[], value: number, handleChange: (newValue: number) => void) {
  const key = React.useId();

  function handleChangeInner(index: number) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) handleChange(index);
    };
  }

  return (
    <InputGroup>
      <ButtonGroup>
        {labels.map((label: string, i: number) => {
          return (
            <React.Fragment key={`${key}-${i}`}>
              <Form.Control
                name={`${key}`}
                id={`${key}-${i}`}
                type="radio"
                autoComplete="off"
                checked={value === i}
                onChange={handleChangeInner(i)}
                className="btn-check"
              />
              <label className="btn btn-outline-primary" htmlFor={`${key}-${i}`}>
                {label}
              </label>
            </React.Fragment>
          );
        })}
      </ButtonGroup>
    </InputGroup>
  );
}
