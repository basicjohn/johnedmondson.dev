// dependencies
import React, { useEffect, useRef, useState } from "react";

// styles
import styles from "./SectionTitle.module.scss";

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentTitleRef = titleRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (currentTitleRef) {
      observer.observe(currentTitleRef);
    }

    return () => {
      if (currentTitleRef) {
        observer.unobserve(currentTitleRef);
      }
    };
  }, []);

  return (
    <div
      className={`${styles.sectionTitle} ${
        isVisible ? styles.visible : styles.hidden
      }`}
      ref={titleRef}
    >
      {title}
    </div>
  );
};

export default SectionTitle;
