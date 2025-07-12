import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  //ALways while using router in app or any other component, wrap the app component in Browser Router
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
 </BrowserRouter>
)
