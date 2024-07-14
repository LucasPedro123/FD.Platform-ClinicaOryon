import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { IndexStyle } from './assets/Style/index.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { LoggedInProvider } from './Context/LoggedIn.context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoggedInProvider>
      <IndexStyle />
      <Router>
        <App />
      </Router>
    </LoggedInProvider>
  </React.StrictMode>,
)
