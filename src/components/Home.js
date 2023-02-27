import BallAnimation from '../assets/BallAnimation.mp4'
import HomeSection from './HomeSection';
import Features from './Features';

const Home = () => {
    return (
      <main>
        <div className="homeVideo">
          <video src={BallAnimation} autoPlay loop muted id="video"></video>
        </div>
        <div>
          <HomeSection />
          <Features />
        </div>
      </main>
    );
}

export default Home



