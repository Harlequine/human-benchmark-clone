import { useState, useEffect } from 'react'
import axios from 'axios'

import { BookOpenIcon, FaceFrownIcon } from '@heroicons/react/24/outline'
import Game from '../../components/Games/Verbal-Memory/Game'

import './VerbalMemory.css'



const VerbalMemory = () => {
    const [ isPlaying, setIsPlaying ] = useState(false);
    const [ gameOver, setGameOver ] = useState(false)
    const [ score, getScore ] = useState(0);
  return (
    <div id='verbal-memory' className='game-bg'>
        <div className="container">
        {!isPlaying && 
            <div className='start-game'>
                <svg> <BookOpenIcon /> </svg>
                <h1>Verbal Memory Test</h1>
                <p>You will be shown words, one at a time.If you've seen during the test, click SEEN. If it's new, click NEW </p>
                <button className="game-btn">
                    <a href="#" onClick={() => setIsPlaying(true)}>Start</a>
                </button>
            </div>
        
        }
        {(isPlaying && !gameOver) &&
            <Game setGameOver={setGameOver} getScore={getScore}/>
        }
        {gameOver && 
            <div className='game-over'>
            <svg> <BookOpenIcon /> </svg>
            <h2>Verbal Memory Test</h2>
            <h1>{score} words</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit!</p>
            <button className="game-btn">
                <a href="#" onClick={() => setGameOver(false)}>Try agin</a>
            </button>
    </div>
        }
        </div>
    </div>
  )
}

export default VerbalMemory