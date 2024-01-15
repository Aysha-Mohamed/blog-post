import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CssBaseline />
      <Container>
        <Box sx={{ bgcolor: '#cfe8fc', minHeight: '100vh' }}>
          <App />
        </Box>
      </Container>
    </BrowserRouter>
  </React.StrictMode>,
)
