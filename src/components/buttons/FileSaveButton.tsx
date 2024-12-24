import React from "react";
import { Button } from "react-bootstrap";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FileSaveButton(content: () => string, label: string, suggestedName: string, variant: string = "", style: React.CSSProperties = {}) {
  async function handleSave() {
    const ext = suggestedName.split(".").pop()?.toLowerCase();
    const data = content();

    if (!window.showSaveFilePicker) {
      // In case the browser does not support the File System Access API.
      const file = new Blob([data], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(file);

      const element = document.createElement("a");
      element.href = url;
      element.download = suggestedName;

      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element); // Clean up the anchor element

      setTimeout(() => URL.revokeObjectURL(url), 100);
    } else {
      try {
        // Open the file save dialog.
        const fileHandle = await window.showSaveFilePicker({
          suggestedName: suggestedName,
          types: [
            {
              description: "Text Files",
              accept: { "text/plain": [`.${ext}`] },
            },
          ],
        });

        // Create a writable stream to the file
        const writableStream = await fileHandle.createWritable();

        // Write content to the file
        await writableStream.write(data);

        // Close the stream to save the file
        await writableStream.close();
      } catch (error) {
        // Do nothing
      }
    }
  }

  return (
    <Button onClick={handleSave} variant={variant} style={style}>
      <FontAwesomeIcon icon={faDownload} />
      <span>&nbsp;{label}</span>
    </Button>
  );
}

export default FileSaveButton;
