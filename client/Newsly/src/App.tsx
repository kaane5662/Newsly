import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Article from './pages/Article'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import SignUp from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Creation from './pages/Creation'
import Edit from './pages/Edit'

function App() {
  const [count, setCount] = useState(0)

  return (
    // <>
    //   <div>
    //     <a href="https://vitejs.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
    
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' Component={Dashboard}></Route>
        <Route path='/articles/:id' Component={Article}></Route>
        <Route path='/login/' Component={Login}></Route>
        <Route path='/signup/' Component={SignUp}></Route>
        <Route path = '/create/' Component={Creation}></Route>
        <Route path = '/create/edit/:id' Component={Edit}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
