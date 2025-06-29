import React from 'react'
import Home from './component/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './component/css/Style.css';



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
