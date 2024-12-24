import React from "react";

import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

export function CopyButton(content: () => string, label: string = "", disabled: boolean = false) {
  const [icon, setIcon] = React.useState(faCopy);
  const [message, setMessage] = React.useState("コピー");

  function renderTooltip(props: OverlayInjectedProps) {
    return <Tooltip {...props}>{message}</Tooltip>;
  }

  function handleCopy() {
    navigator.clipboard
      .writeText(content())
      .then(
        () => {
          setIcon(faCheck);
          setMessage("コピー完了!");
        },
        () => {
          setMessage("コピー失敗!");
        }
      )
      .then(() => {
        setTimeout(() => {
          setIcon(faCopy);
          setMessage("コピー");
        }, 1000);
      });
  }

  return (
    <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
      <Button variant="outline-secondary" disabled={disabled} onClick={handleCopy}>
        <FontAwesomeIcon icon={icon} />
        {label === "" ? "" : <span>&nbsp;{label}</span>}
      </Button>
    </OverlayTrigger>
  );
}
