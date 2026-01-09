import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import OrderSuccess from "./pages/OrderSuccess";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />

        ✅ {/* THIS WAS MISSING */}
        <Route path="/order-success" element={<OrderSuccess />} />

        <Route path="*" element={<div className="p-10">Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
