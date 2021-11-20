
import './App.css';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Registor from './pages/Register'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { Navigate, useNavigate  } from 'react-router';
import Product from './pages/Product';
import Test from './components/test';
import ProductList from './pages/ProductList';

import Success from './pages/Success';
import NotFound from './pages/NotFound';
import { useSelector } from 'react-redux';




function App() {
  const user = useSelector(state=>state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/"/>: <Login />} />
        <Route path="/registor" element={ user ? <Navigate to="/"/>:<Registor />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/test" element={<Test/>}/>
        <Route path="products/" element={<ProductList/>}/>
        <Route path="products/:cate" element={<ProductList/>}/>
        <Route path="/success" element={<Success/>}/>
        <Route path="/notfound" element={<NotFound/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
