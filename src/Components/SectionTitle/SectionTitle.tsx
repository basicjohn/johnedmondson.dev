import React, { useEffect, useRef, useState } from "react";
import styles from "./SectionTitle.module.scss";

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
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
