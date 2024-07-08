import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { IndexStyle } from './assets/Style/index.tsx'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IndexStyle />
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
