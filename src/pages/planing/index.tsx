import { useTaskStore } from "../../store/task.store"
import styles from './css/planing.module.css'
import Columun, { type ColumunType } from "../../components/planing/Columun"
import type { TaskData } from "../../types"
import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { useAuthStore } from "../../store/authStore";

const COLUMNS: ColumunType[] = [
    { id: "todo", title: "TO DO" },
    { id: "In progress", title: "IN PROGRESS" },
    { id: "In review", title: "In Review" },
    { id: "Done", title: "DONE" },
];
const Planing = () => {
    const { tasks, updateTaskStatus } = useTaskStore();
    const { user } = useAuthStore()
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    const newTask = tasks.filter((task) => task.users.some((u) => u?.id === user?.id))
    console.log(newTask,"task");


    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const taskId = Number(active.id);
        const newStatus = over.id as TaskData["statusu"];
        const task = newTask.find((t) => t.id === taskId);
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
                        tasks={newTask.filter((t) => t.statusu === column.id as TaskData["statusu"])}
                    />
                ))}
            </DndContext>
        </div>
    );
};

export default Planing;
