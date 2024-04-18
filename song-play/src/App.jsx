
import './App.css'
import Home from './components/Home';
import songDetails from './components/songDetails';
import { Routes, Route } from 'react-router-dom';
//gether data from form
//sends a req to the server 8-1-0express rest api  has the post req example
//gets back the new instance (song)
//display the new song



function App() {
 
  return (
   
    <Routes>
        <Route path='/' element={<Home/>}></Route>;
        <Route path="/api/song/:id" element={<songDetails />}></Route>
        
    </Routes>

  
  )
}

export default App
