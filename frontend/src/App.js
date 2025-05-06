import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Products from './components/Products';
import Cart from './components/Cart';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = product => {
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id);
      if (existing) {
        return prevItems.map(item =>
            item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  return (
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              App
            </Typography>
            <Button color="inherit" component={Link} to="/products">
              Products
            </Button>
            <Button color="inherit" component={Link} to="/cart">
              Cart
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </Toolbar>
        </AppBar>
        <Container sx={{ marginTop: 2 }}>
          <Routes>
            <Route
                path="/products"
                element={<Products onAddToCart={addToCart} />}
            />
            <Route
                path="/cart"
                element={
                  <Cart
                      cartItems={cartItems}
                      setCartItems={setCartItems}
                  />
                }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </Router>
  );
}

export default App;
