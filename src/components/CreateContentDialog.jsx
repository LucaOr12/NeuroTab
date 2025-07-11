import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import "./CreateContentDialog.scss";

export default function CreateContentDialog({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = () => {
    onCreate({ title, description, url });
    setTitle("");
    setDescription("");
    setUrl("");
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button violet">Create Thought+</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">
            Create New Content
          </Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Add new content by providing title, description, and optional URL.
          </Dialog.Description>

          <fieldset className="Fieldset">
            <label className="Label" htmlFor="title">
              Title
            </label>
            <input
              className="Input"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </fieldset>

          <fieldset className="Fieldset">
            <label className="Label" htmlFor="desc">
              Description
            </label>
            <textarea
              className="Input"
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </fieldset>

          <fieldset className="Fieldset">
            <label className="Label" htmlFor="url">
              URL (optional)
            </label>
            <input
              className="Input"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </fieldset>

          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button className="Button green" onClick={handleSubmit}>
                Create
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
