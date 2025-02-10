"use client";
import styles from "./style.module.scss";
import { useState, useEffect, useRef } from "react";
import Project from "./components/project";
import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import Rounded from "../../common/RoundedButton";
import { CircleArrowOutUpRight, CircleArrowUp } from "lucide-react";

const projects = [
  {
    title: "gymgrub",
    src: "gymgrub.png",
    color: "#6e6d6d",
    url: "https://www.behance.net/gallery/201566335/UI-Case-Study-Gymgrub-Gym-Food-Delivery-App",
  },
  {
    title: "barbie",
    src: "barbie.png",
    color: "#b0b0b0",
    url: "https://www.behance.net/gallery/198978565/Branding-Barbie-Mens-Personal-Care-",
  },
  {
    title: "zenly",
    src: "zenly.png",
    color: "#c2c4e5",
    url: "https://www.behance.net/gallery/193831697/Branding-Zenly-Redefining-workspaces-",
  },
  {
    title: "wildcrown",
    src: "wildcrown.png",
    color: "#000000",
    url: "https://www.behance.net/gallery/203388027/Wildcrown-Brand-Identity",
  },
];

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

const MobileProjectCard = ({ project, manageModal, isOpen, onClick }) => {
  const handleClick = () => {
    onClick();
    // Add animation class or logic here
  };

  return (
    <div
      className={`${styles.mobileCard} ${isOpen ? styles.expanded : ""}`}
      onClick={handleClick}
    >
      <div
        className={`${styles.mobileCardImage} ${isOpen ? styles.cover : styles.fit}`}
        style={{ backgroundImage: `url(/images/${project.src})` }}
      >
        <div className={styles.gradientOverlay} />
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.subtitle}>Design & Development</p>
      </div>
      {isOpen && (
        <div className={styles.cta}>
          <a href={project.url} className={styles.arrow}>
            <CircleArrowUp style={{ transform: "rotate(45deg)" }} />
          </a>
        </div>
      )}
    </div>
  );
};

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [modal, setModal] = useState({ active: false, index: 0 });
  const [openCardIndex, setOpenCardIndex] = useState(null);
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  let xMoveContainer = useRef(null);
  let yMoveContainer = useRef(null);
  let xMoveCursor = useRef(null);
  let yMoveCursor = useRef(null);
  let xMoveCursorLabel = useRef(null);
  let yMoveCursorLabel = useRef(null);

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

  useEffect(() => {
    //Move Container
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    //Move cursor
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    //Move cursor label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });
  }, []);

  const moveItems = (x, y) => {
    xMoveContainer.current(x);
    yMoveContainer.current(y);
    xMoveCursor.current(x);
    yMoveCursor.current(y);
    xMoveCursorLabel.current(x);
    yMoveCursorLabel.current(y);
  };
  const manageModal = (active, index, x, y) => {
    moveItems(x, y);
    setModal({ active, index });
  };

  const handleCardClick = index => {
    if (openCardIndex === index) {
      window.open(projects[index].url, "_blank"); // Open the URL in a new tab
    } else {
      setOpenCardIndex(index);
    }
  };

  if (isMobile) {
    return (
      <main className={styles.projects}>
        <div className={styles.body}>
          {projects.map((project, index) => (
            <MobileProjectCard
              key={index}
              project={project}
              manageModal={manageModal}
              isOpen={openCardIndex === index}
              onClick={() => handleCardClick(index)}
            />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main
      onMouseMove={e => {
        moveItems(e.clientX, e.clientY);
      }}
      className={styles.projects}
    >
      <div className={styles.body}>
        {projects.map((project, index) => {
          return (
            <Project
              index={index}
              title={project.title}
              url={project.url}
              manageModal={manageModal}
              key={index}
            />
          );
        })}
      </div>
      <Rounded backgroundColor={"#EE3224"}>
        <p>More work</p>
      </Rounded>
      <>
        <motion.div
          ref={modalContainer}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
          className={styles.modalContainer}
        >
          <div
            style={{ top: index * -100 + "%" }}
            className={styles.modalSlider}
          >
            {projects.map((project, index) => {
              const { src, color } = project;
              return (
                <div
                  className={styles.modal}
                  style={{ backgroundColor: color }}
                  key={`modal_${index}`}
                >
                  <img
                    src={`/images/${src}`}
                    style={{
                      width: "300px",
                    }}
                    alt="image"
                  />
                </div>
              );
            })}
          </div>
        </motion.div>
        <motion.div
          ref={cursor}
          className={styles.cursor}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
        ></motion.div>
        <motion.div
          ref={cursorLabel}
          className={styles.cursorLabel}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
        >
          View
        </motion.div>
      </>
    </main>
  );
}
