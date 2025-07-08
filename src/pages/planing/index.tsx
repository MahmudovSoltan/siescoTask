import { useTaskStore } from "../../store/task.store"
import styles from './css/planing.module.css'
import Columun, { type ColumunType } from "../../components/planing/Columun"
import type { TaskData } from "../../types"
import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";

const COLUMNS: ColumunType[] = [
  { id: "todo", title: "TO DO" },
  { id: "inProgress", title: "IN PROGRESS" },
  { id: "In_review", title: "In Review" },
  { id: "done", title: "DONE" },
];
const Planing = () => {
    const { tasks, updateTaskStatus } = useTaskStore();

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const taskId = Number(active.id);
        const newStatus = over.id as TaskData["statusu"];

        const task = tasks.find((t) => t.id === taskId);
        if (!task) return;

        if (task.statusu !== null && newStatus !== null && task.statusu !== newStatus) {
            updateTaskStatus(taskId, newStatus);
        }
    };


    return (
        <div className={styles.planing_container}>
            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                {COLUMNS.map((column) => (
                    <Columun
                        key={column.id}
                        columun={column}
                        tasks={tasks.filter((t) => t.statusu === column.id as TaskData["statusu"])}
                    />
                ))}
            </DndContext>
        </div>
    );
};

export default Planing;
