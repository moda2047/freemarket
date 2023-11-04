import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main.js";
import "./App.css";
import Login from "./Login/Login.js";
import NotFound from "./NotFound.js";
import Memberjoin from "./Memberjoin/Memberjoin.js";
import PasswordChange from "./PasswordChange/PasswordChange.js";
import MyInfoMain from "./MyInfo/MyInfoMain.js";
import OtherUserInfoSearch from "./OtherUserInfo/OtherUserInfoSearch.js";
import LoginHeader from "./Header/LoginHeader.js";
import LogoutHeader from "./Header/LogoutHeader.js";
import AdminMain from "./AdminInfo/AdminMain.js";
import WishList from "./WishList/WishList.js";
import ChatMain from "./Chat/ChatMain.js";
import ProductMain from "./Product/ProductMain.js";
import AdminHeader from "./Header/AdminHeader.js";
import Header from "./Header/Header.js";

const App = () => {
  return (
    <div className="wrap">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ProductMain />}></Route>
          <Route path="/MyInfoMain" element={<MyInfoMain />}></Route>
          <Route path="/AdminMain" element={<AdminMain />}></Route>
          <Route path="/PasswordChange" element={<PasswordChange />}></Route>

          <Route path="/Login" element={<Login />}></Route>
          <Route path="/WishList" element={<WishList />}></Route>
          <Route path="/ChatMain" element={<ChatMain />}></Route>
          <Route path="/Memberjoin" element={<Memberjoin />}></Route>
          <Route path="/WishList" element={<WishList />}></Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
