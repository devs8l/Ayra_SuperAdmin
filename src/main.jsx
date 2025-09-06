import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <div className='bg-[#D3E4F9] p-3 h-screen flex items-center justify-center'>
        <App />
      </div>
    </BrowserRouter>
  </StrictMode>,
)
