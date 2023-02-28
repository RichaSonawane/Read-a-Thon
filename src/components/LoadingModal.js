import React from "react";
import styles from "./LoadingModal.module.css"

const LoadingModal = () => {
  return (
   
      <div className={styles["loading-modal"]}>
        <h2>Loading</h2>
        <div className={styles["loading-background"]} />

        <div className={styles["loader"]} />
      </div>
   
  );
};

export default LoadingModal;
