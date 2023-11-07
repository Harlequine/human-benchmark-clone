import { useState, useEffect } from 'react'
import axios from 'axios'

import { BookOpenIcon } from '@heroicons/react/24/outline'
import Game from '../../components/Games/Verbal-Memory/Game'

import './VerbalMemory.css'



const VerbalMemory = () => {
    const [ isPlaying, setIsPlaying ] = useState(false);
    const [ words, setWords ] = useState([]);
    const [ gameOver, setGameOver ] = useState(false)
    const [ score, getScore ] = useState(0);

    useEffect(() => {
        const generateRandomWords = async () => {
            await axios.get('https://random-word-form.repl.co/random/noun/?count=50')
            .then(res => setWords(res.data)).catch(err => console.log(err));
        }
        words.length === 0 && generateRandomWords();
    },[])

  return (
    <div id='verbal-memory' className='game-bg'>
        <div className="container game-container">
        {!isPlaying && 
            <div className='start-game'>
                <svg> <BookOpenIcon /> </svg>
                <h1>Verbal Memory Test</h1>
                <p>You will be shown words, one at a time.If you've seen during the test, click SEEN. If it's new, click NEW </p>
                <button className="game-btn" onClick={() => setIsPlaying(true)}>
                    Start
                </button>
            </div>
        
        }
        {(isPlaying && !gameOver) &&
            <Game setGameOver={setGameOver} getScore={getScore} words={words}/>
        }
        {gameOver && 
            <div className='game-over'>
            <svg> <BookOpenIcon /> </svg>
            <h2>Verbal Memory Test</h2>
            <h1>{score} words</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit!</p>
            <button className="game-btn" onClick={() => setGameOver(false)}>
                Try Again
            </button>
    </div>
        }
        </div>
    </div>
  )
}

export default VerbalMemory