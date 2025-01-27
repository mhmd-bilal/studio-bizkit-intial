"use client";
import React from "react";
import styles from "./style.module.scss";

export default function Index({ index, title, manageModal, url }) {
  const handleClick = () => {
    if (url) {
      window.open(url, "_blank");
    } else {
      console.error("URL is not defined");
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={e => {
        manageModal(true, index, e.clientX, e.clientY);
      }}
      onMouseLeave={e => {
        manageModal(false, index, e.clientX, e.clientY);
      }}
      className={styles.project}
    >
      <h2>{title}</h2>
      <p>Design & Development</p>
    </div>
  );
}
