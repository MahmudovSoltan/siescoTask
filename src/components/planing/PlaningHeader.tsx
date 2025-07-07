import React from "react";
import styles from "./css/planingheader.module.css";

interface PlaningHeaderProps {
  title: string;
  count: number;
  color?: string;
  onAdd?: () => void;
}



const colorMap: Record<string, string> = {
  blue: "#00c4fb",
  lightblue: "#49d1e2",
  green: "#75d900",
  orange: "#ffab01",
};

const PlaningHeader: React.FC<PlaningHeaderProps> = ({
  title,
  count,
  color = "blue",
}) => {
  return (
    <div
      className={`${styles.header} ${title === 'Done' && styles.done_header}`}
      style={{ backgroundColor: colorMap[color] || colorMap.blue}}
    >
      <span className={styles.title}>
        {title} ({count})
      </span>
    </div>
  );
};

export default PlaningHeader;
