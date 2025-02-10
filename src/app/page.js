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
import { ChevronRight } from "lucide-react";
import Header from "../components/Header";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const initializeLocomotiveScroll = async () => {
      if (!isMobile) {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        const locomotiveScroll = new LocomotiveScroll();
      }

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000);
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Changed to 1024 to include tablets
    };

    initializeLocomotiveScroll();
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  const handleScroll = direction => {
    if (direction === "left" && currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    } else if (direction === "right" && currentSection < 3) {
      setCurrentSection(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (isMobile) {
      let touchStartX = 0;
      let touchEndX = 0;
      let currentX = 0;

      const handleTouchStart = e => {
        touchStartX = e.touches[0].clientX;
      };

      const handleTouchMove = e => {
        if (!touchStartX) return;

        currentX = e.touches[0].clientX;
        const diff = touchStartX - currentX;
        const percentage = (diff / window.innerWidth) * 100;

        // Limit the drag to one section at a time
        const maxDrag = 100;
        const minDrag = -100;
        const newPercentage = Math.max(minDrag, Math.min(maxDrag, percentage));

        const container = document.querySelector(`.${styles.mobileContainer}`);
        const baseTransform = -(currentSection * 100);
        container.style.transform = `translateX(${
          baseTransform - newPercentage
        }%)`;
      };

      const handleTouchEnd = e => {
        touchEndX = e.changedTouches[0].clientX;
        const difference = touchStartX - touchEndX;
        const container = document.querySelector(`.${styles.mobileContainer}`);

        // Reset to transition style
        container.style.transition =
          "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";

        if (Math.abs(difference) > 50) {
          // minimum swipe distance
          if (difference > 0 && currentSection < 3) {
            setCurrentSection(prev => prev + 1);
          } else if (difference < 0 && currentSection > 0) {
            setCurrentSection(prev => prev - 1);
          }
        } else {
          // Reset to current section if swipe wasn't far enough
          container.style.transform = `translateX(-${currentSection * 100}%)`;
        }

        touchStartX = 0;
        currentX = 0;
      };

      window.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);

      return () => {
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchmove", handleTouchMove);
        window.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [isMobile, currentSection]);

  if (isMobile && !isLoading) {
    return (
      <>
        <Header currentSection={currentSection} />
        <main className={styles.mobileMain}>
          <AnimatePresence mode="wait">
            {isLoading && <Preloader />}
          </AnimatePresence>
          <div
            className={styles.mobileContainer}
            style={{
              transform: `translateX(-${currentSection * 100}%)`,
            }}
          >
            <section className={styles.mobilePage} style={{ opacity: 1 }}>
              <Landing />
            </section>
            <section className={styles.mobilePage} style={{ opacity: 1 }}>
              <Description />
            </section>
            <section className={styles.mobilePage} style={{ opacity: 1 }}>
              <Projects />
            </section>
            <section className={styles.mobilePage} style={{ opacity: 1 }}>
              <Contact />
            </section>
          </div>
          {currentSection === 0 && (
            <div>
              <div className={styles.swipeInstruction}>
                Swipe left to explore{" "}
                <span className={styles.arrow}>
                  <ChevronRight />
                </span>
              </div>
              <span className={styles.resptext} >For the best experience, view on a larger screen.</span>
            </div>
          )}

          <div className={styles.pageIndicator}>
            {[0, 1, 2, 3].map(index => (
              <div
                key={index}
                className={`${styles.dot} ${
                  currentSection === index ? styles.activeDot : ""
                }`}
                onClick={() => setCurrentSection(index)}
              />
            ))}
          </div>
        </main>
      </>
    );
  }
  // if (isMobile) {
  //   return (
  //     <div className={styles.mobileMessage}>
  //       <div className={styles.container}>
  //         <img
  //           style={{ height: "100px", width: "100px" }}
  //           alt="image"
  //           src="https://i.ibb.co/7JgbJKL/logo.png"
  //         />
  //         <div className={styles.name}>
  //           <p className={styles.companyname}>Studio Bizkit</p>
  //         </div>
  //       </div>
  //       <p>
  //         A little undercooked for mobile, but fully baked on the web! Till then
  //         connect with us at
  //       </p>
  //       <div
  //         style={{
  //           display: "flex",
  //           flexDirection: "column",
  //           gap: 0,
  //         }}
  //       >
  //         <p>
  //           <a href="tel:+919886388133">+91 9886388133</a>
  //           <br></br>
  //           <a href="mailto:studiobizkit@gmail.com">studiobizkit@gmail.com</a>
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <Header currentSection={currentSection} />
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
    </>
  );
}
