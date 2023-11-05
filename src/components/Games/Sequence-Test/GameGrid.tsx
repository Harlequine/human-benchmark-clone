import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { useInterval } from 'usehooks-ts'

import './GameGrid.css'

/**
 * TODO:
 * audio per click and prompt
 */

interface sequenceTestProps{
  setGameOver: Dispatch<SetStateAction<boolean>>,
  getLevel: Dispatch<SetStateAction<number>>,
  setPromptCorrect:Dispatch<SetStateAction<boolean>>,
  promptCorrect:boolean,
}

const randomNumberGenerator = (level:number):number => {
  return Math.floor(1 + Math.random() * level) 
}

const board = [1,2,3,4,5,6,7,8,9]

const GameGrid = (props:sequenceTestProps) => {
  const { getLevel, setGameOver, setPromptCorrect, promptCorrect} = props;

  const [ sequence, setSeqeunce ] = useState([randomNumberGenerator(9)]);
  const [ playerSequnce, setPlayerSequence ] = useState<number[]>([]);
  const [ psIndex, setPsIndex ] = useState(0);
  const [ currTile, setCurrTile ] = useState(-1);
  const [ showSequence, setShowSequnce ] = useState(true);
  const [ level, setLevel ] = useState(1)
  const [ isClicked, setIsClicked ] = useState(0)

  useInterval(() => {//function for showing sequence
    currTile > level-1 ? setShowSequnce(false) : setCurrTile(currTile+1);
  }, showSequence ? 500 : null)


  useEffect(() => {
    setCurrTile(-1)
    console.log(sequence)
  },[showSequence])

  useEffect(() => {
    setTimeout(() => {
      setShowSequnce(true)
    },500)
  },[sequence])

  useEffect(() => {
    isClicked > 0 && setTimeout(() => { setIsClicked(0)}, 150)
  },[isClicked])

  useEffect(() => {
    getLevel(level)
    level > 1 && setSeqeunce((curr:number[]) => [...curr, randomNumberGenerator(9)])
    setPromptCorrect(false)
  },[level])

  useEffect(() => {
    playerSequnce.length === level ? setPromptCorrect(true) : playerSequnce.length > 0 && setPsIndex(psIndex+1)
  },[playerSequnce])

  useEffect(() => {
    if(promptCorrect === true){
      setLevel(level + 1)
      console.log('correct')
      setPlayerSequence([])
      setPsIndex(0);
    }
  },[promptCorrect])

  const inputChecker = (cell:number):void => {
    setIsClicked(cell)
    if(cell !== sequence[psIndex]){
      setPsIndex(0);
      setPlayerSequence([]);
      console.log('wrong')
      setGameOver(true)
      return;
    }
    setPlayerSequence((curr:number[]) => [...curr, cell])
  }


  return (
    <>
      <h2 className='level'><span>Level:</span> {level}</h2>
      <div className='game-grid'>
        {board.map((cell,idx) => (
          <div className={sequence[currTile] === cell  || isClicked === cell ? 'cell white' : 'cell'} key={idx} onClick={(() => {!showSequence && 
            inputChecker(cell)})}></div>
        ))}
      </div>
    </>
  )
}

export default GameGrid