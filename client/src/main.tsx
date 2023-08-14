import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router'
import './styles/globals.css'
import { ThemeProvider } from "./components/theme-provider"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
    <Router />
    </ThemeProvider>
  </React.StrictMode>,
)