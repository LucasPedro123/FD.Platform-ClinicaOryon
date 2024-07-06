import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { IndexStyle } from './assets/Style/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IndexStyle />
    <App />
  </React.StrictMode>,
)
