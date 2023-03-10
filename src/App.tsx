import React, { useEffect } from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import {
  Routes, Route, useLocation, useNavigate
} from 'react-router-dom';
import { ProductsPage } from './features/ProductsPage/ProductsPage';
import { Page404 } from './features/Page404/Page404';
import './App.css';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/products');
    }
  }, [location, navigate]);
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/products/:page?/:id?/:search?" element={<ProductsPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
