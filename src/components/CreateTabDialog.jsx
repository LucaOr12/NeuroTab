import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import "./CreateTabDialog.scss";

export default function CreateTabDialog({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    onCreate({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button violet">+</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Create New Tab</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            Add a new thinking tab by providing title and optional description.
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

          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button className="Button green" onClick={handleSubmit}>
                Create Tab
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
