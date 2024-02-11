import './App.css';
import backgroundImage from './start_menu_imgs/start_menu_background.png';
import startButton from './start_menu_imgs/start_button.png';
import movingCharacter from './start_menu_imgs/character.png';
import titleImage from './start_menu_imgs/title.png';
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <main className=" w-screen h-screen" style={{ 
      width: '100vw', 
      height: '100vh', 
      backgroundImage: `url(${backgroundImage})`, 
      backgroundRepeat: 'no-repeat', 
      backgroundSize: 'cover'}}>
      <section className="center-content">
        <img src={titleImage} alt="Title Image" className="title-image" width="45%" />
        <img src={startButton} alt="Start Button" className="start-button" width="20%" onClick={() => navigate('/startlore')} />
        <img src={process.env.PUBLIC_URL + '/moving_character.png'} alt="" className="moving-character" />
        <img src={movingCharacter} alt="Moving Character" className="moving-character" />
      </section>
    </main>
  );
}

export default App;