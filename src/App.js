import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './componnets/Authentication/Login';
import Signup from './componnets/Authentication/Signup';
import Cart from './componnets/cart/Cart';
import Dashboard from './componnets/Dashboard/Dashboard';
import DashboardDetails from './componnets/Dashboard/DashboardComponnents/DashboardDetails/DashboardDetails';
import MyFactors from './componnets/Dashboard/DashboardComponnents/MyFactors/MyFactors';
import MyFavorites from './componnets/Dashboard/DashboardComponnents/MyFavorites/MyFavorites';

import Product from './componnets/product/Product';
import ProductList from './componnets/productList/ProductList';
import Layout from './layout/Layout';
import NotFoundPage from './layout/NoyFoundPage/NotFoundPage';

const Home = React.lazy(() => import('./componnets/home/HomePage'))

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <Suspense fallback={<Layout Title={"Alpha Shop"} Loading={true} />}>
              <Home />
            </Suspense>
          } />
          <Route path='/ProductList/:catName' element={<ProductList />} />
          <Route path='/ProductList' element={<ProductList />} />
          <Route path='/Product/:id' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />

          <Route path='/Dashboard' element={<Dashboard />} >
            <Route path='' element={<DashboardDetails />} />
            <Route path='MyFactors' element={<MyFactors/>} />
            <Route path='MyFavorites' element={<MyFavorites />} />
          </Route>

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
