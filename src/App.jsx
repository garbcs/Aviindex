import { lazy, Suspense } from 'react'
import './App.css'
import Cabecalho from './Components/Cabesalho/Cabecalho'
import Navigation from './Components/Cabesalho/Navigation'

// Lazy load components for better performance
const Inicio = lazy(() => import('./Components/Inicio'))
const Sobre = lazy(() => import('./Components/Sobre'))
const Beneficios = lazy(() => import('./Components/Beneficios'))
const Ferramenta = lazy(() => import('./Components/Ferramenta'))
const Footer = lazy(() => import('./Components/footer'))

// Loading component
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '200px',
    color: '#01693D'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #01693D',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
  </div>
)

function App() {
  return (
    <>
      <Cabecalho />
      <Navigation />
      <Suspense fallback={<LoadingSpinner />}>
        <Inicio />
        <Sobre />
        <Beneficios />
        <Ferramenta />
        <Footer />
      </Suspense>
    </>
  )
}

export default App
