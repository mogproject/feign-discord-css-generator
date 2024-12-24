import React from "react";
import { ButtonGroup, Form, InputGroup } from "react-bootstrap";

export function RadioButtonGroup(elementName: string, labels: string[], value: number, handleChange: (newValue: number) => void) {
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
            <>
              <Form.Control
                name={`${elementName}`}
                id={`${elementName}-${i}`}
                type="radio"
                autoComplete="off"
                checked={value === i}
                onChange={handleChangeInner(i)}
                className="btn-check"
              />
              <label className="btn btn-outline-primary" htmlFor={`${elementName}-${i}`}>
                {label}
              </label>
            </>
          );
        })}
      </ButtonGroup>
    </InputGroup>
  );
}
