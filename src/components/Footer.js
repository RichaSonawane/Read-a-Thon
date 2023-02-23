import React from "react";
import { ImFacebook, ImInstagram, ImTwitter, ImGithub } from "react-icons/im";
import classes from "./Footer.module.css";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div>
        <h5>Follow us!</h5>
        <div className={classes["social_icons"]}>
          <a
            href="https://www.devmountain.com"
            target="_blank"
            className={classes.circle}
          >
            <ImFacebook size="1.5em" color="#3f3f3f" />
          </a>
          <a
            href="https://www.devmountain.com"
            target="_blank"
            className={classes.circle}
          >
            <ImInstagram size="1.5em" color="#3f3f3f" />
          </a>
          <a
            href="https://www.devmountain.com"
            target="_blank"
            className={classes.circle}
          >
            <ImTwitter size="1.5em" color="#3f3f3f" />
          </a>
          <a
            href="https://github.com/RichaSonawane"
            target="_blank"
            className={classes.circle}
          >
            <ImGithub size="1.5em" color="#3f3f3f" />
          </a>
        </div>
      </div>
      <img src={logo} alt="dm-logo" className="logo" />
    </footer>
  );
};

export default Footer;
