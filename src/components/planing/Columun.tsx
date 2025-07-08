// Columun.tsx
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import PlaningHeader from "./PlaningHeader";
import styles from './css/planingcomponent.module.css';
import type { TaskData } from "../../types";

export type Ititle = "TO DO" | "IN PROGRESS" | "DONE" | "In Review";

export interface ColumunType {
  id: string;
  title: Ititle;
}

interface PropsType {
  columun: ColumunType;
  tasks: TaskData[];
}

const Columun = ({ columun, tasks }: PropsType) => {
  const { setNodeRef, isOver } = useDroppable({ id: columun.id });
  console.log(columun,'id');
   console.log("click");
   
  return (
    <div className={styles.columun_container}>
      <PlaningHeader title={columun.title} />
      <div
        ref={setNodeRef}
        className={styles.columun_content}
        style={{ backgroundColor: isOver ? "#f0f8ff" : undefined }}
      >
        {tasks.map((task) => (
          <div key={task.id}>
            <TaskCard task={task} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Columun;
