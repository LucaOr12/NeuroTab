import { useNavigate } from "react-router-dom";

export default function Tabs() {
  const navigate = useNavigate();

  return (
    <div className="tabs-page">
      <h1>Tabs Page</h1>
      <p>This is a placeholder for the Tabs page.</p>
      <button onClick={() => navigate("/profile")}>Go to Profile</button>
    </div>
  );
}
