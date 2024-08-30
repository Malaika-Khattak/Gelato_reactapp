import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Flavor from "./pages/Flavor/Flavor";
import Booking from "./pages/Booking/Booking";
import About from "./pages/About/About";
import Reservation from "./pages/Reservation/Reservation";
import Bookcart from "./pages/Bookcart/Bookcart";
import Login from "./components/Login/Login";
import { useState } from "react";
import Scrolltop from "./components/Scrolltop";
import Clientdetail from "./components/Clientdetail/Clientdetail";
import Orderonline from "./components/Onlineorder/Orderonline";
import Cart from "./pages/Cart/Cart";
import { CartProvider } from "./components/Cartcontext";

function App() {
  const [showlogin, setshowlogin] = useState(false);
  const [count, setcount] = useState(0);
  const [pickoption, setpickoption] = useState("Pickup");

  return (
    <>
      {showlogin ? <Login setshowlogin={setshowlogin} /> : <></>}

      <div className="app">
        <CartProvider>
          <Scrolltop />
          <Navbar
            setshowlogin={setshowlogin}
            count={count}
            setcount={setcount}
          />

          <Router basename="/">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/flavor" element={<Flavor />} />
              <Route path="/event" element={<Booking />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/about" element={<About />} />
              <Route path="/bookcart" element={<Bookcart />} />
              <Route
                path="/clientdetail"
                element={<Clientdetail setshowlogin={setshowlogin} />}
              />
              <Route
                path="/cart"
                element={
                  <Cart
                    count={count}
                    setcount={setcount}
                    pickoption={pickoption}
                  />
                }
              />
              <Route
                path="/orderonline"
                element={
                  <Orderonline
                    count={count}
                    setcount={setcount}
                    pickoption={pickoption}
                    setpickoption={setpickoption}
                  />
                }
              />
            </Routes>
          </Router>
        </CartProvider>
        <Footer />
      </div>
    </>
  );
}

export default App;
