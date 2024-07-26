import "./App.css";
import ShopItems from "./components/ShopItems";
import Cart from "./components/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/shopping-app" element={<ShopItems />} />
          <Route path="/shopping-app/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
