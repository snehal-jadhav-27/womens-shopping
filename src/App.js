import {BrowserRouter, Routes, Route } from "react-router-dom";
import Button from "./Components/Button";
import CategoryCard from "./Components/CategoryCard";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import ProductCard from "./Components/ProductCard";
import SearchBar from "./Components/SearchBar";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Categories  from "./Pages/Categories";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import Sale from "./Pages/Sale";
import Checkout from "./Pages/Checkout";
import Order from "./Pages/Order";

function App() {
  return (
    <div className="app">
      <Navbar />
      <BrowserRouter>
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path ="/Shop" element = {<Shop/>}/>
        <Route path="/about" element = { <About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="cart" element={<Cart/>}/>
        <Route path="wishlist" element={<Wishlist/>}/>
        <Route path="sale" element={<Sale/>}/>
        <Route path= "checkout" element={<Checkout/>}/>
        <Route path="orders" element={<Order/>}/>
        
       </Routes>
      </BrowserRouter>

      
      
        
      

      
     
      
      
     

      

        

     
      <Footer />

    </div>
  );
}

export default App;