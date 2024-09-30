import './App.css';
import Home from './screens/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import Signup from './screens/Signup';
import { CartProvider } from "./Components/ContextReducer"
import MyOrder from './screens/MyOrder';

function App() {
  return (
    <CartProvider>
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/signup' element={<Signup/>} />
        <Route exact path='/myorders' element={<MyOrder/>} />
        

        
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
