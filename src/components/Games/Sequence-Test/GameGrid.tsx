import { useState, useEffect } from 'react'
import { useInterval } from 'usehooks-ts'

import './GameGrid.css'

/**
 * TODO:
 * random sequence generator function >
 * sequence checker >
 * correct and incorrect sequence indicator CSS
 * incrementing level >
 * try again
 * clickstate css
 */

const randomNumberGenerator = (level:number):number => {
  return Math.floor(1 + Math.random() * level) 
}

const board = [1,2,3,4,5,6,7,8,9]

const GameGrid = () => {
  const [ sequence, setSeqeunce ] = useState([randomNumberGenerator(9)]);
  const [ playerSequnce, setPlayerSequence ] = useState<number[]>([]);
  const [ psIndex, setPsIndex ] = useState(0);
  const [ currTile, setCurrTile ] = useState(-1);
  const [ showSequence, setShowSequnce ] = useState(true);
  const [ level, setLevel ] = useState(1)
  const [ promptCorrect, setPromptCorrect ] = useState(false)
  const [ promptWrong, setPromptWrong ] = useState(false)

  // useEffect(() => {
  //   sequence.length < 1 && setSeqeunce(curr => [...curr, randomNumberGenerator(1)])
  // },[])

  useInterval(() => {//function for showing sequence
    currTile > level-1 ? setShowSequnce(false) : setCurrTile(currTile+1);
  }, showSequence ? 500 : null)

  useEffect(() => {
    setCurrTile(-1)
    console.log(sequence)
    setPromptWrong(false)
  },[showSequence])

  useEffect(() => {
    setShowSequnce(true)
  },[sequence])

  useEffect(() => {
    level > 1 && setSeqeunce((curr:number[]) => [...curr, randomNumberGenerator(9)])
    setPromptCorrect(false)
    setPromptWrong(false)
  },[level])

  useEffect(() => {
    playerSequnce.length === level ? setPromptCorrect(true) : playerSequnce.length > 0 && setPsIndex(psIndex+1)
  },[playerSequnce])

  useEffect(() => {
    promptCorrect === true && setLevel(level + 1)
    console.log('correct')
    setPlayerSequence([])
    setPsIndex(0);
  },[promptCorrect])

  const inputChecker = (cell:number):void => {//should check per input not as a whole
    if(cell !== sequence[psIndex]){
      setPsIndex(0);
      setPlayerSequence([]);
      setPromptWrong(true);
      console.log('wrong')
      return;
    }
    setPlayerSequence((curr:number[]) => [...curr, cell])
  }



  return (
    <>
      <h2>Level {level}</h2>
      <div className='game-grid'>
        {board.map((cell,idx) => (
          <div className={sequence[currTile] === cell ? 'cell white' : 'cell'} key={idx} onClick={(() => {!showSequence && 
            inputChecker(cell)})}></div>
        ))}
      </div>
      {promptWrong && 
        <button onClick={() => setShowSequnce(true)}>
        try again
        </button>
      }
      {playerSequnce.map((cell,idx) => (<p key={idx}>{}{cell}</p>))}
      {/* <button onClick={() => setLevel(level+1)}>
      {level}+1
      </button> */}
    </>
  )
}

export default GameGrid