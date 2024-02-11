import logo from './logo.svg';
import './App.css';
import backgroundImage from './startmenu_background2.png';
import startButton from './start_button2.png';
import movingCharacter from './moving_character2.png';
import titleImage from './title.png';


function App() {
  return (
      <main className=" w-screen h-screen" style={{ 
        width: '100vw', 
        height: '100vh', 
        backgroundImage: `url(${backgroundImage})`, 
        backgroundRepeat: 'no-repeat', 
        backgroundSize: 'cover'}}>
        <section className="center-content">
          <audio autoPlay loop>
            <source src="your-music-file.mp3" type="audio/mpeg" />
          </audio>
          <img src={titleImage} alt="Title Image" className="title-image" width="50%" />
          <img src={startButton} alt="Start Button" className="start-button" width="25%" onClick={() => console.log('Start Game')} />
          <img src={process.env.PUBLIC_URL + '/moving_character.png'} alt="" className="moving-character" />
          <img src={movingCharacter} alt="Moving Character" className="moving-character" />
        </section>
      </main>
  );
}

export default App;