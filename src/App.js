import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.scss';
import AuroraBackground from './components/AuroraBackground';
import ShinyText from './components/ShinyText';
import NavBar from './components/NavBar';
import CardSwap, { Card } from './components/CardSwap';

import Profile from './pages/Profile';
import Tabs from './pages/Tabs';

function Home() {
  const navigate = useNavigate();

  return (
    <section className="hero" id="home">
      <div className="hero-text">
        <div className="hero-badge">🚀 Beta</div>
        <ShinyText
          colors={["#5c48d3", "#9f7aea", "#5c48d3", "#9f7aea", "#5c48d3", "#9f7aea"]}
          animationSpeed={6}
          showBorder={false}
          className="title">
          NeuroTab
        </ShinyText>
        <p className="subtitle">
          NeuroTab helps you capture thoughts as connected tabs, and uses AI to organize, expand, and evolve your ideas.
        </p>
        <div style={{ height: '100px', position: 'relative' }}>
          <button className="redirect-button"
            onClick={() => navigate('/profile')}
          >
            Start Thinking →
          </button>
        </div>
      </div>
      <div className="hero-image">
        <div style={{ height: '600px', position: 'relative' }}>
          <CardSwap
            cardDistance={60}
            verticalDistance={70}
            delay={5000}
            pauseOnHover={false}
          >
            <Card>
              <h3>Capture</h3>
              <p>Save fleeting ideas as tabs with just a click, before they fade away. Each tab is a self-contained thought, note, or inspiration.</p>
            </Card>
            <Card>
              <h3>Connect</h3>
              <p>Link your thoughts visually. NeuroTab helps you organize and relate tabs to see how your ideas interact and evolve.</p>
            </Card>
            <Card>
              <h3>Evolve</h3>
              <p>Use AI to expand, clarify, or restructure your thinking. Let NeuroTab turn your raw thoughts into actionable insight.</p>
            </Card>
          </CardSwap>
        </div>
      </div>
    </section>

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