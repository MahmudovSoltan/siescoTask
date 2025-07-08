import React from "react";
import styles from "./css/planingcomponent.module.css";

interface PlaningHeaderProps {
  title: "TO DO" | "IN PROGRESS" | "DONE" | "In Review"; // və ya sadəcə string
}

const colorMap: Record<string, string> = {
  "TO DO": "#00c4fb",
  "IN PROGRESS": "#49d1e2",
  "DONE": "#ffab01",
  "In Review": "#75d900"
};

const PlaningHeader: React.FC<PlaningHeaderProps> = ({ title }) => {
  return (
    <div
      className={`${styles.header} ${title === "DONE" && styles.done_header}`}
      style={{ backgroundColor: colorMap[title] || "#ccc" }} // fallback rəng
    >
      <span className={styles.title}>{title}</span>
    </div>
  );
};

export default PlaningHeader;
