import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { IndexStyle } from './assets/Style/index.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { LoggedInProvider } from './Context/LoggedIn.context.tsx'
import { UserProvider } from './Context/Users.context.tsx'
import { FoodProvider } from './Context/Foods.context.tsx'
import { EmailSendProvider } from './Context/EmailsSend.context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <EmailSendProvider>
      <FoodProvider>
        <UserProvider>
          <LoggedInProvider>
            <IndexStyle />
            <Router>
              <App />
            </Router>
          </LoggedInProvider>
        </UserProvider>
      </FoodProvider>
    </EmailSendProvider>
  </React.StrictMode>,
)
