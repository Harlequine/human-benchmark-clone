import {Routes, Route} from 'react-router-dom'

import NavBar from "./assets/components/Nav-Bar/NavBar"
import MainPage from "./assets/pages/Main-Page/MainPage"


function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={ <MainPage />} />
      </Routes>
    </>
  )
}

export default App
