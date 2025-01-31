import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home  from "./pages/Home";
import Login  from "./pages/Login";
import Register from "./pages/Register";
import RegProductos from "./pages/RegProductos";
import EditProduct from "./pages/EditProduct";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<RegProductos />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </Router>
  )
}

export default App;
