import { BoltIcon } from "@heroicons/react/24/outline"

import GameSelection from "../../components/Game-Selection/GameSelection"

import './MainPage.css'

const MainPage = () => {
  return (
    <div id="main-page">
        <div className='hero'>
            <div className='container'>
                <svg>
                    <BoltIcon />
                </svg>
                <h1>Human Benchmark</h1>
                <h2>Measure your abilities with brain games and cognitive tests.</h2>
                <div className="game-btn">
                    <a href="#">Get Started</a>
                </div>
            </div>
        </div>
        <GameSelection />
    </div>
  )
}

export default MainPage