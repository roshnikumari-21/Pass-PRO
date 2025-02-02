
import './App.css'
import Manager from './pages/Manager'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout'
import Features from './pages/Features'
import Contact from './pages/Contact'
import About from './pages/About'
import Home from './pages/Home';


function App() {  
  return (  
    <Router>  
      <Layout>  
        <Routes>  
        <Route path="/" element={<Home/>} />        
          <Route path="/about" element={<About/>} />  
          <Route path="/contact" element={<Contact/>} />  
          <Route path="/features" element={<Features/>} />  
          <Route path="/manager" element={<Manager/>} />  
          
        </Routes>  
      </Layout>  
    </Router>  
  );  
}  

export default App
