import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <div style={{
        backgroundImage: 'url(/login-bg.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }} className='bg-[#D3E4F9] p-4 h-screen flex items-center justify-center'>
        <App />
      </div>
    </BrowserRouter>
  </StrictMode>,
)
