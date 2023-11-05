import { useState, useEffect } from 'react'
import { SquaresPlusIcon } from '@heroicons/react/24/outline';
import GameGrid from '../../components/Games/Sequence-Test/GameGrid';

import './SequenceTest.css'



const SequenceTest = () => {
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ gameOver, setGameOver ] = useState(false)
  const [ level, getLevel ] = useState<number>(0);
  const [ promptCorrect, setPromptCorrect ] = useState(false)
  const [ classPrompt, setClassPrompt ] = useState('');




  useEffect(() => {
    if(promptCorrect === true){
      setClassPrompt('correct');
    }

    if(gameOver === true){
      setClassPrompt('incorrect')
    }
  },[promptCorrect,gameOver])

  useEffect(() => {
    if(classPrompt.length > 0){
      setTimeout(() => {setClassPrompt('')},500)
    }
  },[classPrompt])

  return (
    <div id='sequence-test' className={`game-bg ${classPrompt}`}>
      <div className="container">
        {!isPlaying && 
          <div className='start-game'>
            <svg> <SquaresPlusIcon /> </svg>
            <h1>Sequence Memory Test</h1>
            <h2>Memorize the pattern.</h2>
            <div className="game-btn">
              <a href="#" onClick={() => setIsPlaying(true)}>Start</a>
            </div>
          </div>
        }

        {(isPlaying && !gameOver) &&
          <GameGrid getLevel={getLevel} setGameOver={setGameOver} setPromptCorrect={setPromptCorrect} promptCorrect={promptCorrect}/>
        }
        {gameOver && 
          <div className='game-over'>
            <svg> <SquaresPlusIcon /> </svg>
            <h2>Sequence Memory Test</h2>
            <h1>Level {level}</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            <div className="game-btn">
              <a href="#" onClick={() => {setGameOver(false)}}>Try Again</a>
            </div>
          </div>
        }

      </div>
    </div>
  )
}

export default SequenceTest