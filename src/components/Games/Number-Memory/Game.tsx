import { useState, useEffect, Dispatch, SetStateAction, ChangeEvent } from 'react'
import { useInterval } from 'usehooks-ts'

import './Game.css'


interface NMprops{
  setGameOver: Dispatch<SetStateAction<boolean>>,
  getAnswer: Dispatch<SetStateAction<string>>,
  setPromptCorrect: Dispatch<SetStateAction<boolean>>,
  number:string;
}

const Game = (props:NMprops) => {
  const { setGameOver, 
    getAnswer,
    setPromptCorrect, 
    number} = props;
    const [ countDown, setCountDown ] = useState(2.500);
    const [ start, setStart ] = useState(false);
    const [ answer, setAnswer ] = useState('');
    

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>{
      setAnswer(e.target.value)
    }

    useInterval(() => {
      setCountDown(countDown => countDown - 0.1)
    },start && countDown > 0 ? 100 : null)

    useEffect(() => {
      setStart(true);
    },[])
    
    useEffect(() => {
      if(countDown < 0)
        setStart(false)
    },[countDown])


    const checkAnswer = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      getAnswer(answer)
      if(answer === number){
        setPromptCorrect(true)
      }
      else{
        setGameOver(true)
      }

    }

  return (
    <div className='game'>
      {(start && countDown > 0) &&
        <>
          <h1 className='big-number'>{number}</h1>
          <h2>{countDown}</h2>
        </>
      }
      {(!start && countDown < 0 ) && 
        <div className='answer-form'>
          <h2>What was the number?</h2>
          <p>Press enter to submit</p>
          <form onSubmit={checkAnswer} >
            <input type="number" name='answer' id='answer' value={answer} onChange={(e) => handleChange(e)} required/>
            <button className="game-btn" type='submit'>Submit</button>
          </form>
        </div>
      }


    </div>
  )
}

export default Game