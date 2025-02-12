"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { slideUp } from "./animation";
import { motion } from "framer-motion";

export default function Home() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: e => (direction = e.direction * -1),
      },
      x: "-500px",
    });
    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    requestAnimationFrame(animate);
    xPercent += (isMobile ? 20 : 0.08) * direction;
  };

  return (
    <motion.main
      variants={slideUp}
      initial="initial"
      animate="enter"
      custom={isMobile}
      className={styles.landing}
    >
      <img
        src={isMobile ? "/images/mobile-overlay.png" : "/images/overlay.png"}
        alt="overlay"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          zIndex: "10",
        }}
      />
      <div className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
          <p ref={firstText}>creative crumbs -</p>
          <p ref={secondText}>creative crumbs -</p>
        </div>
      </div>
      <img
        src={isMobile ? "/images/bg-mobile.png" : "/images/bg.jpg"}
        alt="background"
        style={{
          zIndex: "-1",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
        }}
      />
      <div data-scroll data-scroll-speed={0.1} className={styles.description}>
        {/* <svg
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
        </svg>
        <p>Freelance</p>
        <p>Designer & Developer</p> */}
      </div>
    </motion.main>
  );
}
