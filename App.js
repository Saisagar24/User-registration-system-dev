import logo from './logo.svg';
import './App.css';
import Register from './component/Register';
import Login from './component/Login';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/Register' element={<Register/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
