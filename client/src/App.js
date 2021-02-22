import logo from './logo.svg'
import './App.css'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function App() {
  const [message, setMessage] = useState('')
  useEffect(() => {
    const fetchMessage = async () => {
      const res = await axios.get('http://localhost:4000/')
      setMessage(res.data.message)
      console.log(res.data)
    }
    fetchMessage()
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <h2>{message}</h2>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
