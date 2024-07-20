import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HeadScriptInjector } from './HeadScriptInjector.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HeadScriptInjector />
    <App />
  </React.StrictMode>
)
