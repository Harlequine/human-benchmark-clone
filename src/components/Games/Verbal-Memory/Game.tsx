import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import './Game.css'

interface VMprops{
    setGameOver: Dispatch<SetStateAction<boolean>>,
    getScore: Dispatch<SetStateAction<number>>,
    words: string[]
}

const rng = () => {
    return Math.floor(Math.random() * 50)
}

const Game = (props:VMprops) => {
    const { setGameOver, getScore, words } = props;
    const [ currentWord, setCurrentWord ] = useState(words[rng()]);
    const [ seenWords, setSeenWords ] = useState<string[]>([]);
    const [ lives, setLives ] = useState(3);
    const [ score, setScore ] = useState(0);
    const [ seenCtr, setSeenCtr ] = useState(0);

    useEffect(() => {
        console.log(currentWord)
    },[currentWord])

    useEffect(() => {
        seenCtr === words.length && console.log('congrats')
    },[seenCtr])

    useEffect(() => {
        if(lives === 0){
            setGameOver(true);
            getScore(score);
        }
    },[lives])

    const checkAnswer = (answer:string):void => {
        if(answer === 'seen'){
            if(seenWords.includes(currentWord)){
                setScore(score => score + 1)
                setSeenCtr(seenCtr => seenCtr + 1)
            }
            else{
                setLives(lives => lives - 1)
            }
        }
        else{
            if(!seenWords.includes(currentWord)){
                setSeenWords(curr => [...curr, currentWord])
                setScore(score => score + 1)
            }
            else{
                setLives(lives => lives - 1)
            }
        }
        setCurrentWord(words[rng()])
    }

  return (
    <div className='game'>
        <div className="indicators">
            <p><span>Lives |</span>{lives}</p>
            <p><span>Score |</span>{score}</p>
        </div>
        <h1>{currentWord}</h1>
        <div className="answer-btn">
            <button className="game-btn" onClick={() => checkAnswer('seen')}>SEEN</button>
            <button className="game-btn" onClick={() => checkAnswer('new')}>NEW</button>
        </div>

        {lives === 0 && <h1>game over</h1>
        }
    </div>
  )
}

export default Game