import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import axios from 'axios';

import './Game.css'

interface VMprops{
    setGameOver: Dispatch<SetStateAction<boolean>>
    getScore: Dispatch<SetStateAction<number>>
}

const rng = () => {
    return Math.floor(Math.random() * 100)
}

const Game = (props:VMprops) => {
    const { setGameOver, getScore } = props;
    const [ words, setWords ] = useState([]);
    const [ currentWord, setCurrentWord ] = useState('');
    const [ seenWords, setSeenWords ] = useState<string[]>([]);
    const [ lives, setLives ] = useState(3);
    const [ score, setScore ] = useState(0);


    useEffect(() => {
        const generateRandomWords = async () => {
            await axios.get('https://random-word-form.repl.co/random/noun/?count=100')
            .then(res => setWords(res.data)).catch(err => console.log(err));
        }
        words.length === 0 && generateRandomWords();
    },[])

    useEffect(() => {
        words.length > 0 && setCurrentWord(words[rng()])
    },[words])

    useEffect(() => {
        console.log(currentWord)
    },[currentWord])

    useEffect(() => {
        seenWords.length === words.length && console.log('congrats')
    },[seenWords])

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