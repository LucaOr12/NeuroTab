import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import "./UpdateContentDialog.scss";

export default function UpdateContentDialog({ content, onUpdate }) {
  const [title, setTitle] = useState(content.title);
  const [description, setDescription] = useState(content.description);
  const [url, setUrl] = useState(content.url || "");

  const handleSave = async () => {
    try {
      const response = await fetch(
        `${window.API_BASE_URL}/api/Contents/update/${content.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ title, description, url }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error("Update failed:", error);
        alert("Failed to update content");
        return;
      }

      const updated = await response.json();
      console.log("Updated content: ", updated);

      if (onUpdate) onUpdate(updated);
    } catch (err) {
      console.error("Network error: ", err);
      alert("Network error while updating content.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this content?"))
      return;
    try {
      const response = await fetch(
        `${window.API_BASE_URL}/api/Contents/${content.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error("Delete failed:", error);
        alert("Failed to delete tab");
        return;
      }

      console.log("Deleted Tab:", content.id);
      if (onUpdate) onUpdate(null);
    } catch (err) {
      console.error("Network error:", err);
      alert("Network error while deleting content");
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button update">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Update Content</Dialog.Title>

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
              <button className="Button red" onClick={handleDelete}>
                Delete
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button className="Button green" onClick={handleSave}>
                Save
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
