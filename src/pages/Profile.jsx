import { useEffect, useState } from "react";
import Stepper, { Step } from "../components/Stepper";
import "./Profile.scss";
import { GoogleLogin } from "@react-oauth/google";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [showStepper, setShowStepper] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5281/api/Users/logged-user", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setUser(data);
          setShowStepper(false);
        }
      });
  }, []);

  const handleLoginSuccess = (credentialResponse) => {
    fetch("http://localhost:5281/api/Users/google-login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken: credentialResponse.credential,
      }),
    })
      .then((res) => res.json())
      .then((profile) => {
        setUser(profile);
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
          </Step>
        </Stepper>
      ) : (
        <div className="profile-content">
          <img
            src={user?.profilePictureUrl}
            alt={user?.name}
            referrerPolicy="no-referrer"
          />
          <h2>{user?.name || "user"}</h2>
          <p>Email: {user?.email}</p>
        </div>
      )}
    </div>
  );
}
