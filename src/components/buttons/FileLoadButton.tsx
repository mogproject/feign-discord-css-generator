import React from "react";
import { Form } from "react-bootstrap";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FileLoadButton(handler: (content: string) => boolean, label: string, variant: string, style: React.CSSProperties = {}, maxFileSizeKb: number = 100) {
  const controlId = React.useId();
  const [message, setMessage] = React.useState({ class: 'info', text: '' });

  function handleLoad(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage({ class: 'info', text: '' });
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.json')) {
      setMessage({ class: 'danger', text: '.json ファイルを選択してください' })
      return;
    }
    if (file.size > maxFileSizeKb * 1024) {
      setMessage({ class: 'danger', text: `ファイルが大きすぎます: ${file.name}` })
      return;
    }
    setMessage({ class: 'info', text: `読み込み中: ${file.name}` })

    const reader = new FileReader();
    reader.onload = (evt) => {
      if (evt.target?.result) {
        if (handler(evt.target?.result.toString())) {
          setMessage({ class: 'success', text: `読み込み完了: ${file.name}` })
        } else {
          setMessage({ class: 'danger', text: `読み込み失敗: ${file.name}` });
        }
      }
      // This makes an effect when loading the same file path repeatedly.
      e.target.value = '';
    }

    reader.onerror = () => {
      setMessage({ class: 'danger', text: `読み込み失敗: ${file.name}` });
    };
    reader.readAsText(file);
  }

  return (
    <Form>
      <Form.Control type="file" id={controlId} hidden onChange={handleLoad} />
      <Form.Label className={`btn btn-${variant} me-1`} htmlFor={controlId}
        onClick={() => setMessage({ class: 'default', text: '' })}
        style={style}
      >
        <FontAwesomeIcon icon={faUpload} />
        <span>&nbsp;{label}</span>
      </Form.Label>
      <Form.Text className={`text-${message.class}`}>
        {message.text}
      </Form.Text>
    </Form>
  );
}

export default FileLoadButton;
