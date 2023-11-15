import { useState, useEffect } from 'react'
import { BoltIcon, ClockIcon, EllipsisHorizontalIcon, MegaphoneIcon } from '@heroicons/react/24/solid';

import "./ReactionTime.css"

const rng = () => {
  return Math.floor(Math.random() * (6 - 4) + 4) * 1000;
}

const ReactionTime = () => {
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ goClassPromt, setGoClassPrompt ] = useState ('set');
  const [ initialTime, setInitialTime ] = useState<Date | any>('');
  const [ resultMS, setResultMS ] = useState(0);
  const [ showResults, setShowResults ] = useState(false);

  useEffect(() => {
    if (isPlaying && !showResults){
      setTimeout(() => {
        setGoClassPrompt("go")
        setInitialTime(new Date());
      },rng())
    }
  },[isPlaying, showResults])

  const handleReaction = () => {
    const reaction = new Date().getTime();
    const initialTimeMs = initialTime.getTime();
    setResultMS(reaction - initialTimeMs);
    setShowResults(true)
  }

  useEffect(() => {
    if(resultMS > 0){
      setGoClassPrompt("");
      setInitialTime(0)
    }
    
  },[resultMS])

  const playAgain = () => {
    setShowResults(false);
    setGoClassPrompt("set");
    setResultMS(0);
  }


  return (
    <div id="reaction-time" className="game-bg game-container" onClick={() => {!isPlaying && setIsPlaying(true)}}>
      {!isPlaying &&
        <div className="container hero">
          <svg>{<BoltIcon />}</svg>
          <h1>Reaction Time Test</h1>
          <h2>When the red box turns green, click as quickly as you can.</h2>
          <h2>Click anywhere to start.</h2>
        </div>
      }
      {isPlaying && !showResults &&
        <div className={`game-container ${goClassPromt}`} onClick={() => handleReaction()}>
          {goClassPromt === "set" ? 
            <>
              <div className='hero'>
                <svg>{<EllipsisHorizontalIcon />}</svg>
                <h1>Wait for green.</h1>
              </div>
            </> : 
            <>
              <div className='hero'>
                <svg>{<MegaphoneIcon />}</svg>
                <h1>GO!</h1>
              </div>
            </> 
          }
        </div>
      }
      {isPlaying && showResults &&
        <div className="game-container" onClick={() => playAgain()}>
          <div className="hero">
            <svg>{<ClockIcon />}</svg>
            <h1>{resultMS}ms</h1>
            <h2>Click to keep going.</h2>
          </div>
        </div>
      }
    </div>
  )
}

export default ReactionTime