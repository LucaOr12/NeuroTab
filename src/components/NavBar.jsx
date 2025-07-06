import { Link } from "react-router-dom";
import GlareHover from "./GlareHover";
import "./NavBar.scss";

export default function NavBar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-content">
        <div className="navbar-logo">
          <img src="/mind-map.png" alt="NeuroTab logo" />
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/">
              <GlareHover
                glareColor="#ffffff"
                glareOpacity={0.3}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={800}
                playOnce={false}
              >
                Home
              </GlareHover>
            </Link>
          </li>
          <li>
            <Link to="/tabs">
              <GlareHover
                glareColor="#ffffff"
                glareOpacity={0.3}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={800}
                playOnce={false}
              >
                Tabs
              </GlareHover>
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <GlareHover
                glareColor="#ffffff"
                glareOpacity={0.3}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={800}
                playOnce={false}
              >
                Profile
              </GlareHover>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
