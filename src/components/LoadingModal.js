import React from "react";
import styles from "./LoadingModal.module.css"

const LoadingModal = () => {
  return (
    <div className="loading-modal">
      <div className="loading-background" />
      <div className="loader" />
    </div>
  );
};

export default LoadingModal;
