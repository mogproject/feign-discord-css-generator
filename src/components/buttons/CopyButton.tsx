import React from "react";

import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayInjectedProps } from "react-bootstrap/esm/Overlay";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export function CopyButton(content: () => string, label: string = "", disabled: boolean = false) {
  const { t: translate } = useTranslation();
  const t = translate as ((s: string) => string);

  const [icon, setIcon] = React.useState(faCopy);
  const [message, setMessage] = React.useState(t('copy'));

  function renderTooltip(props: OverlayInjectedProps) {
    return <Tooltip {...props}>{message}</Tooltip>;
  }

  function handleCopy() {
    navigator.clipboard
      .writeText(content())
      .then(
        () => {
          setIcon(faCheck);
          setMessage(t('copied'));
        },
        () => {
          setMessage(t('copy_failed'));
        }
      )
      .then(() => {
        setTimeout(() => {
          setIcon(faCopy);
          setMessage(t('copy'));
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
