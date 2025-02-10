"use client";
import styles from "./style.module.scss";
import { useInView, motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { slideUp, opacity } from "./animation";
import Rounded from "../../common/RoundedButton";

export default function Index() {
  const [isMobile, setIsMobile] = useState(false);
  const phrase =
    "Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.";
  const description = useRef(null);
  const isInView = useInView(description);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (isMobile) {
    return (
      <div ref={description} className={styles.descriptionMobile}>
        <div className={styles.body}>
          <p>
            <span className={styles.mask} style={{ fontSize: 20 }}>
              Helping brands to stand out in the digital era. Together we will
              set the new status quo. No nonsense, always on the cutting edge.
            </span>
          </p>
          <motion.p variants={opacity} animate={isInView ? "open" : "closed"}>
            We specialize in creating, branding, and crafting web experiences
            that are baked to perfection—fresh, crisp, and irresistibly
            engaging.
            <span style={{ fontSize: 14 }}>
              <br></br>
              <br></br>Swipe and have a look at our works.
            </span>
          </motion.p>
        </div>
      </div>
    );
  }
  return (
    <div ref={description} className={styles.description}>
      <div className={styles.body}>
        <p>
          {phrase.split(" ").map((word, index) => {
            return (
              <span key={index} className={styles.mask}>
                <motion.span
                  variants={slideUp}
                  custom={index}
                  animate={isInView ? "open" : "closed"}
                  key={index}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </p>
        <motion.p variants={opacity} animate={isInView ? "open" : "closed"}>
          We specialize in creating, branding, and crafting web experiences that
          are baked to perfection—fresh, crisp, and irresistibly engaging.
        </motion.p>
        <div data-scroll data-scroll-speed={0.1}>
          <Rounded backgroundColor={"#EE3224"} className={styles.button}>
            <p>About us</p>
          </Rounded>
        </div>
      </div>
    </div>
  );
}
