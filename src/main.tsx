import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter as Router} from "react-router-dom"
import { GlobalState } from './utilites/ContextRecipe.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <React.StrictMode>
      <GlobalState>
        <App />
      </GlobalState>
    </React.StrictMode>
  </Router>
)
