import './App.scss';
import HeroIllustration from './components/HeroIllustration';
import AuroraBackground from './components/AuroraBackground';

function App() {
  return (
    <>
      <AuroraBackground
        colorStops={["#9F7AEA", "#2778DB", "#5C728D"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <div className="app-container" style={{ position: 'relative', zIndex: 1 }}>
        <section className="hero">
          <div className="hero-text">
            <div className="hero-badge">🚀 Beta</div>
            <h1 className="title">NeuroTab</h1>
            <p className="subtitle">
              NeuroTab helps you capture thoughts as connected tabs, and uses AI to organize, expand, and evolve your ideas.
            </p>
            <button className="cta-button" onClick={() => alert('Work in Progress')}>Start Thinking</button>
          </div>
          <div className="hero-image">
            <HeroIllustration />
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
