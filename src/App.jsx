
import './App.css'
import Cabecalho from './Components/Cabesalho/Cabecalho'
import Inicio from './Components/Inicio'
import Sobre from './Components/Sobre'
import Beneficios from './Components/Beneficios'              
import Navigation from './Components/Cabesalho/Navigation'
import Footer from './Components/footer'
import Ferramenta from'./Components/Ferramenta'
function App() {
  
  return (
    <>
    <Cabecalho />
    <Navigation />
    <Inicio />
    <Sobre />
    <Beneficios />       
    <Ferramenta/>
    <Footer />

    </>
  )
}

export default App
