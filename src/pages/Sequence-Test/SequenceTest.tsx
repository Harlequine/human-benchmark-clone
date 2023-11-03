import { useState, useEffect } from 'react'
import { SquaresPlusIcon } from '@heroicons/react/24/outline';
import GameGrid from '../../components/Games/Sequence-Test/GameGrid';

import './SequenceTest.css'



const SequenceTest = () => {
  const [ points, setPoints ] = useState(0);
  const [ level, setLevel ] = useState(1);
  const [ startGame, setStartGame ] = useState(false)
  const [ gameOver, setGameOver ] = useState(false)

  return (
    <div id='sequence-test' className='game-bg'>
      <div className="container">
        {!startGame && 
          <>
            <svg> <SquaresPlusIcon /> </svg>
            <h1>Sequence Memory Test</h1>
            <h2>Memorize the pattern.</h2>
            <div className="game-btn">
              <a href="#" onClick={() => setStartGame(true)}>Start</a>
            </div>
          </>
        }

        {startGame &&
          <GameGrid />
        }

        {gameOver && 
          <>
            <svg> <SquaresPlusIcon /> </svg>
            <h1>Sequence Memory Test</h1>
            <h2>Memorize the pattern.</h2>
            <div className="game-btn">
              <a href="#" onClick={() => setStartGame(true)}>Start</a>
            </div>
          </>
        }



      </div>
    </div>
  )
}

export default SequenceTest