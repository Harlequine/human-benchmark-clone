import { Routes, Route } from 'react-router-dom'
import MainPage from './Pages/Main-Page/MainPage'
import ReactionTime from './Pages/Reaction-Time/ReactionTime'
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={ <MainPage />} />
        <Route path='reaction-time'  element={ <ReactionTime /> }/>
      </Routes>
    </>
  )
}

export default App
