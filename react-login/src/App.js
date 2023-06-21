import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import Registration from './Components/Registration';

// HERE FOR ROUTING WE HAVE TO DEFINE PATHS SO 
// THROUGH REACT-ROUTER WE CAN ROUTE AND GIVE THE PATH TO INDIVIDUAL COMPONENTS

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/home" element={<Home/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
