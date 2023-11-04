import React from "react";
import { useCookies } from "react-cookie";
import AdminHeader from "./AdminHeader";
import LoginHeader from "./LoginHeader";
import LogoutHeader from "./LogoutHeader";

const Header = () => {
  const [cookies] = useCookies(["token", "author"]);

  const token = cookies.token;
  const author = cookies.author;
  if (token === null) {
    return <LogoutHeader />;
  } else if (author === 0) {
    return <LoginHeader />;
  } else if (author === 1) {
    return <AdminHeader />;
  } else {
    return <LogoutHeader />;
  }
};

export default Header;
