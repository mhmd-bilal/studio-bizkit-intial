"use client";
import styles from "./style.module.scss";
import Image from "next/image";
import Rounded from "../../common/RoundedButton";
import { useRef, useState, useEffect } from "react";
import { useScroll, motion, useTransform, useSpring } from "framer-motion";
import Magnetic from "../../common/Magnetic";

export default function Index() {
  const [isMobile, setIsMobile] = useState(false);
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);

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
      <motion.div style={{ y }} ref={container} className={styles.contact}>
        <div className={styles.body}>
          <div className={styles.title}>
            <span>
              <div className={styles.imageContainer}>
                <img
                  alt={"image"}
                  style={{ height: "100px", width: "100px" }}
                  src={`https://i.ibb.co/7JgbJKL/logo.png`}
                />
              </div>
              <h2>Let&apos;s work together</h2>
            </span>
          </div>
          <div className={styles.nav}>
            <Rounded>
              <p>
                <a
                  href="mailto:hello@studiobizkit.com"
                  style={{ color: "white" }}
                >
                  hello@studiobizkit.com
                </a>
              </p>
            </Rounded>
            <Rounded>
              <a href="tel:+917200274687" style={{ color: "white" }}>
                <p>+91 72002 74687</p>
              </a>
            </Rounded>
          </div>
          <div className={styles.info}>
            <div>
              <span
                style={{ display: "flex", flexDirection: "column", gap: "3px" }}
              >
                <h3>Version</h3>
                <p>2025 © Edition</p>
              </span>
            </div>
            <div>
              <span
                style={{ display: "flex", flexDirection: "column", gap: "3px" }}
              >
                <h3>socials</h3>
                <Magnetic>
                  <p>Instagram</p>
                </Magnetic>
              </span>
              <Magnetic>
                <p>Behance</p>
              </Magnetic>
              <Magnetic>
                <p>Dribbble</p>
              </Magnetic>
              <Magnetic>
                <p>Linkedin</p>
              </Magnetic>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div style={{ y }} ref={container} className={styles.contact}>
      <div className={styles.body}>
        <div className={styles.title}>
          <span>
            <div className={styles.imageContainer}>
              <img
                alt={"image"}
                style={{ height: "100px", width: "100px" }}
                src={`https://i.ibb.co/7JgbJKL/logo.png`}
              />
            </div>
            <h2>Let&apos;s work</h2>
          </span>
          <h2>together</h2>
          <motion.div style={{ x }} className={styles.buttonContainer}>
            <Rounded backgroundColor={"#2482ee"} className={styles.button}>
              <a
                href="mailto:hello@studiobizkit.com"
                style={{ color: "white" }}
              >
                <p>Get in touch</p>
              </a>
            </Rounded>
          </motion.div>
          <motion.svg
            style={{ rotate, scale: 2 }}
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z"
              fill="white"
            />
          </motion.svg>
        </div>
        <div className={styles.nav}>
          <Rounded>
            <p>
              <a
                href="mailto:hello@studiobizkit.com"
                style={{ color: "white" }}
              >
                hello@studiobizkit.com
              </a>
            </p>
          </Rounded>
          <Rounded>
            <a href="tel:+917200274687" style={{ color: "white" }}>
              <p>+91 72002 74687</p>
            </a>
          </Rounded>
        </div>
        <div className={styles.info}>
          <div>
            <span>
              <h3>Version</h3>
              <p>2025 © Edition</p>
            </span>
          </div>
          <div>
            <span>
              <h3>socials</h3>
              <Magnetic>
                <p>Instagram</p>
              </Magnetic>
            </span>
            <Magnetic>
              <p>Behance</p>
            </Magnetic>
            <Magnetic>
              <p>Dribbble</p>
            </Magnetic>
            <Magnetic>
              <p>Linkedin</p>
            </Magnetic>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
