"use client";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "../components/Preloader";
import Landing from "../components/Landing";
import Projects from "../components/Projects";
import Description from "../components/Description";
import SlidingImages from "../components/SlidingImages";
import Contact from "../components/Contact";
export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeLocomotiveScroll = async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    initializeLocomotiveScroll();

    checkMobile();

    window.addEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className={styles.mobileMessage}>
        <div className={styles.container}>
          <img
            style={{ height: "100px", width: "100px" }}
            alt="image"
            src="https://i.ibb.co/7JgbJKL/logo.png"
          />
          <div className={styles.name}>
            <p className={styles.companyname}>Studio Bizkit</p>
          </div>
        </div>
        <p>A little undercooked for mobile, but fully baked on the web!</p>
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Landing />
      <Description />
      <Projects />
      <SlidingImages />
      <Contact />
    </main>
  );
}
