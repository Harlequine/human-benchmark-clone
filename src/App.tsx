import {Routes, Route} from 'react-router-dom'

import NavBar from "./components/Nav-Bar/NavBar"
import MainPage from "./pages/Main-Page/MainPage"
import SequenceTest from './pages/Sequence-Test/SequenceTest'
import VerbalMemory from './pages/Verbal-Memory/VerbalMemory'


function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={ <MainPage /> } />
        <Route path='/tests/sequence' element={ <SequenceTest /> } />
        <Route path='/tests/verbal-memory' element={ <VerbalMemory /> } />
      </Routes>
    </>
  )
}

export default App
