import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../store/authContext";
import logo from "../assets/logo.png";

const Header = () => {
  const authCtx = useContext(AuthContext);

  return (
    <header className="header flex-row">
      <div className="flex-row">
        <img src={logo} alt="dm-logo" className="logo" />
        <h2>Read-a-Thon</h2>
      </div>
      <nav>
        {authCtx.token ? (
          <ul className="main-nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="book">Booklist</Link>
            </li>
            <li>
              <Link to="favorites">Favorites</Link>
            </li>
            <li>
              <button className="logout-btn" onClick={() => authCtx.logout()}>
                Logout
              </button>
            </li>
          </ul>
        ) : (
          <ul className="main-nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/auth">Login or Sign Up</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
