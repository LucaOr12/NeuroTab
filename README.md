# 🧠 NeuroTab — Thinking Workspace

NeuroTab is a personal thinking workspace where ideas live as interconnected tabs. Each tab represents a thought, problem, or decision, and can be expanded or restructured with the help of integrated AI.

This is the **frontend** of NeuroTab, built with React.

---

## 🚀 Features

- 🧩 Tab-based workspace to organize thoughts
- 🔗 Visual connections between ideas
- 🤖 AI-assisted idea expansion, summarization, and linking
- 🧭 Drag & drop interface
- 🔐 Secure login system
- 🌈 Clean, responsive UI
- 🗂️ Project-based organization (coming soon)

---

## 🛠️ Tech Stack

- **React** (Vite)
- **TypeScript**
- **TailwindCSS**
- **Axios** for API communication
- **React DnD** or **React Flow** (for drag & connection UI)
- **OpenAI API** (via backend)
- **JWT / Google OAuth2** (auth handled by backend)
- **Deployed on**: _e.g., Vercel / Netlify_

---

## 📦 Project Structure

neurotab-client/
├── src/
│ ├── components/ # Reusable UI elements
│ ├── pages/ # App pages (e.g. Dashboard, Login)
│ ├── services/ # API calls
│ ├── context/ # Global state (user, tabs)
│ ├── hooks/ # Custom React hooks
│ ├── assets/ # Icons, logos, images
│ └── App.tsx # Main app
├── public/
└── index.html
