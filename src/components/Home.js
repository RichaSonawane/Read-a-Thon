import BallAnimation from '../assets/BallAnimation.mp4'

const Home = () => {
    return (
      <main>
        <div>
          <video src={BallAnimation} autoPlay loop muted id="video"></video>
        </div>
      </main>
    );
}

export default Home



