import { useEffect, useState } from "react";
import Stepper, { Step } from "../components/Stepper";
import "./Profile.scss";
import { GoogleLogin } from "@react-oauth/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireFlameCurved } from "@fortawesome/free-solid-svg-icons";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [showStepper, setShowStepper] = useState(true);
  const [tabsCount, setTabsCount] = useState(0);
  const [topTab, setTopTab] = useState(null);

  useEffect(() => {
    fetch("https://neurotab-api.onrender.com/api/Users/logged-user", {
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
    fetch("https://neurotab-api.onrender.com/api/Users/google-login", {
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

  const handleLogout = async () => {
    await fetch("https://neurotab-api.onrender.com/api/Users/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    setShowStepper(true);
  };
  useEffect(() => {
    fetch("https://neurotab-api.onrender.com/api/Tabs/all", {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setTabsCount(data.length);

        if (data.length > 0) {
          const top = data.reduce((prev, curr) =>
            (curr.content?.length || 0) > (prev.content?.length || 0)
              ? curr
              : prev
          );
          setTopTab(top);
        } else {
          setTopTab(null);
        }
      })
      .catch(() => {
        setTabsCount(0);
        setTopTab(null);
      });
  }, []);
  const streak = user?.loginRecord || 0;

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
          <div
            style={{
              borderTop: "2px solid var(--color-muted)",
              marginLeft: 20,
              marginRight: 20,
            }}
          ></div>
          <div className="profile-stats">
            <p>
              <FontAwesomeIcon
                icon={faFireFlameCurved}
                style={{ marginRight: 5 }}
              />
              Consecutive Days of Use: <strong>{streak}</strong>
            </p>
            <p>
              <FontAwesomeIcon icon={faThumbtack} style={{ marginRight: 5 }} />
              Most Used Tab:
            </p>
            {topTab ? (
              <p
                style={{
                  fontWeight: "bold",
                  color: "var(--color-accent)",
                  fontSize: "1.5rem",
                  textShadow: "0 0 5px var(--color-accent)",
                }}
              >
                {topTab.title}
              </p>
            ) : (
              <p>No tabs used or created yet</p>
            )}
          </div>
          <div
            style={{
              borderTop: "2px solid var(--color-muted)",
              marginLeft: 20,
              marginRight: 20,
            }}
          ></div>
          <Link to="/tabs" className="profile-tabs-link">
            <h2 className="profile-tabs-title">
              My Tabs <span className="tabs-count-circle">{tabsCount}</span>
            </h2>
          </Link>
          <button className="LogoutButton" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
