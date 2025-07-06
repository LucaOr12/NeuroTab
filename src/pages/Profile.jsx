import { useEffect, useState } from "react";
import Stepper, { Step } from "../components/Stepper";
import "./Profile.scss";
import { GoogleLogin } from "@react-oauth/google";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [showStepper, setShowStepper] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setShowStepper(false);
    }
  }, []);

  const handleLoginSuccess = (credentialResponse) => {
    fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${credentialResponse.credential}`,
      },
    })
      .then((res) => res.json())
      .then((profile) => {
        setUser(profile);
        localStorage.setItem("user", JSON.stringify(profile));
        setShowStepper(false);
      })
      .catch(() => alert("Error fetching user profile"));
  };

  return (
    <div className="page-content">
      {showStepper ? (
        <Stepper
          initialStep={1}
          onStepChange={(step) => console.log("Step:", step)}
          onFinalStepCompleted={() => console.log("Stepper Completed")}
          backButtonText="Back"
          nextButtonText="Continue"
        >
          <Step>
            <h2>Welcome to NeuroTab</h2>
            <p>Please sign in with your Google account to get started.</p>
          </Step>
          <Step>
            <h2>Sign In</h2>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => alert("Login failed")}
            />
          </Step>
          <Step>
            <h2>Done!</h2>
            <p>Welcome, {user?.name || "user"}!</p>
            <button
              onClick={() => {
                setUser(null);
                localStorage.removeItem("user");
                setShowStepper(true);
              }}
            >
              Logout
            </button>
          </Step>
        </Stepper>
      ) : (
        <div>
          <h2>Welcome, {user?.name || "user"}!</h2>
          <p>Email: {user?.email}</p>
          <button
            onClick={() => {
              setUser(null);
              localStorage.removeItem("user");
              setShowStepper(true);
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
