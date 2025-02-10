"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { AnimatePresence } from "framer-motion";
import Nav from "./nav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Rounded from "../../common/RoundedButton";
import Magnetic from "../../common/Magnetic";

export default function Header({ currentSection }) {
  const header = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const button = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        onLeave: () => {
          gsap.to(button.current, {
            scale: 1,
            duration: 0.25,
            ease: "power1.out",
          });
        },
        onEnterBack: () => {
          gsap.to(
            button.current,
            { scale: 0, duration: 0.25, ease: "power1.out" },
            setIsActive(false)
          );
        },
      },
    });

    if (isMobile) {
      gsap.to(header.current, {
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "50px top",
          scrub: true,
        },
        padding: "10px",
        background: "rgba(28, 29, 33, 0.9)",
        backdropFilter: "blur(10px)",
        position: "fixed",
        marginTop: "0",
        height: "60px",
      });

      gsap.to(".logoImage", {
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "50px top",
          scrub: true,
        },
        height: "25px",
        width: "25px",
      });

      gsap.to(".logoText", {
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "50px top",
          scrub: true,
        },
        fontSize: "16px",
      });

      gsap.to(".logoContainer", {
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "50px top",
          scrub: true,
        },
        marginTop: "0",
        gap: "5px",
      });
    }
  }, [isMobile]);

  const getHeaderClass = () => {
    let classes = `${styles.header} ${currentSection >1 ? styles.scrolled : ''}`;
    if (currentSection === 1) classes += ` ${styles.section1}`;
    if (currentSection === 2) classes += ` ${styles.section2}`;
    return classes;
  };

  return (
    <>
      {isMobile ? (
        <div ref={header} className={getHeaderClass()}>
          <div className={`${styles.logo} logoContainer`}>
            <p className={styles.copyright}>
              <img
                className="logoImage"
                style={{ height: "50px", width: "50px" }}
                alt={"image"}
                src={`https://i.ibb.co/7JgbJKL/logo.png`}
              />
            </p>
            <div className={styles.name}>
              <p className={`${styles.codeBy} logoText`}>Studio</p>
              <p className={`${styles.dennis} logoText`}>Bizkit</p>
            </div>
          </div>
        </div>
      ) : (
        <div ref={header} className={getHeaderClass()}>
          <div className={styles.logo}>
            <p className={styles.copyright}>
              <img
                style={{ height: "20px", width: "20px" }}
                alt={"image"}
                src={`https://i.ibb.co/7JgbJKL/logo.png`}
              />
            </p>
            <div className={styles.name}>
              <p className={styles.codeBy}>Studio</p>
              <p className={styles.dennis}>Bizkit</p>
              {/* <p className={styles.snellenberg}>Snellenberg</p> */}
            </div>
          </div>
          <div className={styles.nav}>
            <Magnetic>
              <div className={styles.el}>
                <a>Work</a>
                <div className={styles.indicator}></div>
              </div>
            </Magnetic>
            <Magnetic>
              <div className={styles.el}>
                <a>About</a>
                <div className={styles.indicator}></div>
              </div>
            </Magnetic>
            <Magnetic>
              <div className={styles.el}>
                <a>Contact</a>
                <div className={styles.indicator}></div>
              </div>
            </Magnetic>
          </div>
        </div>
      )}

      {isMobile ? null : (
        <div ref={button} className={styles.headerButtonContainer}>
          <Rounded
            onClick={() => {
              setIsActive(!isActive);
            }}
            className={`${styles.button}`}
          >
            <div
              className={`${styles.burger} ${
                isActive ? styles.burgerActive : ""
              }`}
            ></div>
          </Rounded>
        </div>
      )}
      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </>
  );
}
