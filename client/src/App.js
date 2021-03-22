import React from 'react'
import Routes from 'route'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import 'antd/dist/antd.css'
import './index.css'
function App() {
  return (
    <div className="App">
      <Routes />
      <ToastContainer />
    </div>
  )
}

export default App
