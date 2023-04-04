import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = (item) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const newCartItems = [...cartItems, { ...item, id: Date.now() }];
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    setCart(newCartItems);
  };

  const removeItem = (id) => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const newCartItems = cartItems.filter((item) => item.id !== id);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    setCart(newCartItems);
  };
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCart(cartItems);
  }, []);

  return (
    <CartContext.Provider value={{ cart, removeItem }}>
      <ProductContext.Provider value={{ products, addItem }}>
        <div className="App">
          <Navigation />

          {/* Routelar */}
          <main className="content">
            <Route exact path="/">
              <Products />
            </Route>

            <Route path="/cart">
              <ShoppingCart />
            </Route>
          </main>
        </div>
      </ProductContext.Provider>
    </CartContext.Provider>
  );
}

export default App;