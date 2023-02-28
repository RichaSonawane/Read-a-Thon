import React from 'react'
import logo from "../assets/logo.png";
import styles from "./HomeSection.module.css"

const HomeSection = () => {
  return (
    <div className={`${styles.heroWrapper} center`}>
      <div className={`${styles.heroInner}`}>
        <h2 className={styles.headerText}>
          Reading tracker for readers who wants to read more.
        </h2>
        <div className={styles.slogan}>
          <h5>The leading solution for motivating young people to read.</h5>         
        </div>

        <div className={styles.heroImage}>
          <img
            src="https://images.unsplash.com/photo-1581970196594-f0a8ad70eaa1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTgzfHxraWRzJTIwYm9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};



export default HomeSection;