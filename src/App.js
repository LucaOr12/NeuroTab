import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import AuroraBackground from './components/AuroraBackground';
import ShinyText from './components/ShinyText';
import GlareHover from './components/GlareHover';
import NavBar from './components/NavBar';

// Placeholder routes
const Tabs = () => <div className="page-content">Tabs page coming soon...</div>;
const Profile = () => <div className="page-content">User Profile here</div>;

function Home() {
  return (
    <section className="hero">
      <div className="hero-text">
        <div className="hero-badge">🚀 Beta</div>
        <ShinyText text="NeuroTab" disabled={false} speed={3} className="title" />
        <p className="subtitle">
          NeuroTab helps you capture thoughts as connected tabs, and uses AI to organize, expand, and evolve your ideas.
        </p>
        <div style={{ height: '100px', position: 'relative' }}>
          <GlareHover
            glareColor="#ffffff"
            glareOpacity={0.3}
            glareAngle={-30}
            glareSize={300}
            transitionDuration={800}
            playOnce={false}
          >
            <p
              style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: 'var(--color-text)',
                margin: 0,
                cursor: 'pointer',
              }}
              onClick={() => alert('Work in Progress!')}
            >
              Start Thinking
            </p>
          </GlareHover>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <Router>
      <NavBar />
      <AuroraBackground
        colorStops={["#9F7AEA", "#2778DB", "#5C728D"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <div className="app-container" style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tabs" element={<Tabs />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
