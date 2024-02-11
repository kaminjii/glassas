import './App.css';
import backgroundImage from './start_menu_imgs/blurred_background.png';
import startButton from './start_menu_imgs/start_button.png';
import character from './start_menu_imgs/character.png';
import titleImage from './start_menu_imgs/title.png';
import textBox from './start_menu_imgs/text_box.png';
import nextButton from './start_menu_imgs/next_button.png';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function StartLore() {
    const [texts, setTexts] = useState([
      'In a sinister turn of fate, you find yourself imprisoned by Dr. Nightshade, a wicked doctor who has stolen your sight. Your only hope for escape lies within the dungeon\'s depths.',
      'Hidden within the dungeon are mystical glasses with unique abilities that help you navigate the treacherous corridors filled with mystery.',
      'You must use the abilities and your wits to escape Dr. Nightshade\'s clutches. But beware, for he has left behind his minions to guard the dungeon.',
      'Will you emerge from the darkness, or will you remain forever lost in the shadows?',
      'Good luck, and may the light guide you to freedom.',
      'Use the arrow keys to navigate and e to utilize your ability. Go over glasses to equip them.',
      // add more strings as needed
    ]);
  
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();
    return (
      <main className=" w-screen h-screen" style={{ 
        width: '100vw', 
        height: '100vh', 
        backgroundImage: `url(${backgroundImage})`, 
        backgroundRepeat: 'no-repeat', 
        backgroundSize: 'cover',
        backdropFilter: 'blur(500px)'
        }}>
        <div className="flex flex-col items-center justify-center">
          <img src={textBox} alt="text box" className="mx-auto items-center" width="80%" />
          <p className="text-center absolute text-white text-2xl -mt-6 text-2xl shadow-black" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>{texts[index]}</p>
          <button onClick={() => {
            if (index < texts.length - 1) {
                setIndex(index + 1);
            }else {
                navigate('/game');
            }
        }}>
  <img src={nextButton} alt="next button" className="fixed" style={{ top: '70%', left: '50%', transform: 'translate(-50%, -50%)' }} width="20%" />
</button>
            <img src={character} alt="character" className="relative" style={{ top: '50%', left: '-20%', transform: 'translate(-90%, -140%)' }} width="17%" />
          </div>
        </main>
      );
        }
export default StartLore;