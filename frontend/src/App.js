import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginLayout from "./Layout/LoginLayout";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Login/Signup";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home/Home";
import Contact from "./Pages/Contact/Contact";
import MyBids from "./Pages/MyBids/MyBids";
import Sell from "./Pages/Sell/Sell";
import Image from "./Pages/Login/Image";
import ChatRoom from "./Components/ChatRoom/ChatRoom";
import EditSell from "./Pages/Sell/EditSell";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/image" element={<Image />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/my-bids" element={<MyBids />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/chatroom" element={<ChatRoom />} />
          <Route path="/edit-sell/:id" element={<EditSell />} />
          {/* Uncomment this route if needed */}
          {/* <Route path="/sign-up" element={<Signup />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
