import React from 'react'
import { Fragment } from "react";
import styles from "./Features.module.css";

const Features = () => {
  const features = [
    {
      feature: "Choose what you want",
      description:
        "With unlimited books selection, you can choose your favorite books.",
      image:
        "https://images.unsplash.com/photo-1533029764620-40021530b1aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8a2lkJTIwYm9va3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
    {
      feature: "See real-time updates",
      description:
        "Personal reading log.Engagement features strengthen kids reading skills.",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGtpZCUyMGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
    {
      feature: "Reviews",
      description:
        "Reader can maintain their review/notes about their fovorite books. Boosting reading culture in your community.",
      image:
        "https://images.unsplash.com/photo-1553729784-e91953dec042?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTh8fGtpZCUyMGJvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
  
  ];

  return (
    <div className={`${styles.featuresWrapper} center`}>
      <div className={styles.featuresHeading}>
        <p>
          Build a lasting reading habit and better remember what you read!
        </p>
      </div>
      <div className={`${styles.featuresListWrapper} center`}>
        <div className={`${styles.featuresList} center`}>
          {features.map(({ feature, description, image }) => {
            return (
              <div className={`${styles.featureDiv} center`}>
                <Fragment>
                  <div className={styles.feature}>
                    <p>{feature}</p>
                  </div>
                  <div className={styles.featureDescription}>
                    <p>{description}</p>
                  </div>
                  <div>
                    <img className={styles.featureImg} src={image} alt="img" />
                  </div>
                </Fragment>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Features;