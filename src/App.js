import './App.scss';
import AuroraBackground from './components/AuroraBackground';
import ShinyText from './components/ShinyText';
import GlareHover from './components/GlareHover';
import Dock from './components/Dock';
import { VscHome, VscArchive, VscAccount, VscSettingsGear } from 'react-icons/vsc';


const items = [

  { icon: <VscHome size={18} />, label: 'Home', onClick: () => alert('Home!') },
  { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => alert('Archive!') },
  { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => alert('Profile!') },
  { icon: <VscSettingsGear size={18} />, label: 'Settings', onClick: () => alert('Settings!') },
];

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
            <ShinyText text="NeuroTab" disabled={false} speed={3} className='title' />
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
                <p style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--color-text)', margin: 0 }} onClick={() => alert('Work in Progress!')}>
                  Start Thinking
                </p>
              </GlareHover>
            </div>

          </div>
        </section>
      </div>
      <Dock
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />
    </>
  );
}

export default App;
