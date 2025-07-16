import * as Dialog from "@radix-ui/react-dialog";
import React, { useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./UpdateTabDialog.scss";

export default function UpdateTabDialog({ tab, onUpdate }) {
  const [title, setTitle] = useState(tab.title);
  const [description, setDescription] = useState(tab.description);
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${window.API_BASE_URL}/api/Tabs/update/${tab.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ ...tab, title, description }),
        }
      );
      if (!res.ok) throw new Error("Failed to update tab");
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["tabs"] });
      if (onUpdate) onUpdate(data);
    },
    onError: (err) => {
      console.error("Update failed:", err);
      alert("Failed to update tab");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${window.API_BASE_URL}/api/Tabs/${tab.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete tab");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tabs"] });
      if (onUpdate) onUpdate(null);
    },
    onError: (err) => {
      console.error("Delete failed:", err);
      alert("Failed to delete tab");
    },
  });

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
          <Dialog.Title className="DialogTitle">Update Tab</Dialog.Title>

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
              <button
                className="Button red"
                onClick={() => deleteMutation.mutate()}
              >
                Delete
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button
                className="Button green"
                onClick={() => updateMutation.mutate()}
              >
                Save
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
