// TaskCard.tsx
import { useDraggable } from "@dnd-kit/core";
import styles from './css/planingcomponent.module.css'
import type { TaskData } from "../../types";



interface TaskPropsType {
  task: TaskData;
}


const TaskCard = ({ task }: TaskPropsType) => {
  console.log(task);

  const { setNodeRef, listeners, attributes, transform } = useDraggable({
    id: task.id ?? `task-${Math.random()}`,
  });

  const style = transform
    ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={styles.task_card}
    >
      {task.title}
    </div>
  );
};

export default TaskCard;
