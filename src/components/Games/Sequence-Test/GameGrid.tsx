import { useState, useEffect } from 'react'
import { useInterval } from 'usehooks-ts'

import './GameGrid.css'

/**
 * TODO:
 * random sequence generator function
 * sequence checker
 * correct and incorrect sequence indicator CSS
 * clickstate css
 * incrementing level
 */

const randomNumberGenerator = (level:number):number => {
  return Math.floor(1 + Math.random() * level) 
}

const board = [1,2,3,4,5,6,7,8,9]

const GameGrid = () => {
  const [ sequence, setSeqeunce ] = useState([randomNumberGenerator(9)]);
  const [ playerSequnce, setPlayerSequence ] = useState([]);
  const [ currTile, setCurrTile ] = useState(-1);
  const [ showSequence, setShowSequnce ] = useState(true);
  const [ level, setLevel ] = useState(1)

  // useEffect(() => {
  //   sequence.length < 1 && setSeqeunce(curr => [...curr, randomNumberGenerator(1)])
  // },[])

  useInterval(() => {//function for showing sequence
    currTile > level-1 ? setShowSequnce(false) : setCurrTile(currTile+1);
  }, showSequence ? 500 : null)

  useEffect(() => {
    setCurrTile(-1)
    console.log(sequence)
  },[showSequence])

  useEffect(() => {
    level > 1 && setSeqeunce(curr => [...curr, randomNumberGenerator(9)])
  },[level])

  useEffect(() => {
    playerSequnce.length === level && sequenceChecker()
  },[playerSequnce])

  const sequenceChecker = () => {
    const compare = playerSequnce.every((num, idx) => num === sequence[idx])

    if(compare){
      setPlayerSequence([])
      console.log('correct')
    }
    else{
      setPlayerSequence([])
      console.log('wrong')
    }

    
  }

  return (
    <>
      <h2>Level {level}</h2>
      <div className='game-grid'>
        {board.map((cell,idx) => (
          <div className={sequence[currTile] === cell ? 'cell white' : 'cell'} key={idx} onClick={(() => {!showSequence && 
            setPlayerSequence(curr => [...curr,cell])})}></div>
        ))}
      </div>
      <button onClick={() => setShowSequnce(true)}>
        !showSequence
      </button>
      <button onClick={() => setLevel(level+1)}>
      {level}+1
      </button>
    </>
  )
}

export default GameGrid