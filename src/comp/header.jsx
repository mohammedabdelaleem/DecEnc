import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import "../theme.css";
import "./dark.css";
import "../icons/style.css"
import { useContext } from "react";
import ThemeContext from "../context/ContextData";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`myheader `}>
      <header className="hide-when-mobile ali">
        <h1>
          <Link className="logo" to="/">
            EnDecryption
          </Link>
        </h1>

<i  className="icon-brightness_high fa-solid fa-sun"   
onClick={() => {
            toggleTheme(theme === "dark" ? "light" : "dark");
          }}></i>

        <i
          onClick={() => {
            toggleTheme(theme === "dark" ? "light" : "dark");
          }}
          className="icon-brightness_2 fa-solid fa-moon"
        ></i>
      </header>
    </div>
  );
};

export default Header;
