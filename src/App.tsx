import {Routes, Route} from 'react-router-dom'

import NavBar from "./components/Nav-Bar/NavBar"
import MainPage from "./pages/Main-Page/MainPage"
import SequenceTest from './pages/Sequence-Test/SequenceTest'


function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={ <MainPage /> } />
        <Route path='/tests/sequence' element={ <SequenceTest /> } />
      </Routes>
    </>
  )
}

export default App
