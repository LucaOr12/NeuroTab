import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.scss';
import AuroraBackground from './components/AuroraBackground';
import ShinyText from './components/ShinyText';
import NavBar from './components/NavBar';

import Profile from './pages/Profile';
import Tabs from './pages/Tabs';

function Home() {
  const navigate = useNavigate();

  return (
    <section className="hero" id="home">
      <div className="hero-text">
        <div className="hero-badge">🚀 Beta</div>
        <ShinyText text="NeuroTab" disabled={false} speed={3} className="title" />
        <p className="subtitle">
          NeuroTab helps you capture thoughts as connected tabs, and uses AI to organize, expand, and evolve your ideas.
        </p>
        <div style={{ height: '100px', position: 'relative' }}>
          <button className="redirect-button"
            onClick={() => navigate('/profile')}
          >
            Start Thinking
          </button>
        </div>
      </div>
    </section >
  );
}


export default function App() {
  return (
    <>
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
    </>
  );
}