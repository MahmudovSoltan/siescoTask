import { useCallback, useEffect, useMemo, useState } from "react";
import {
    DragDropContext,
    Droppable,
    Draggable,
} from "@hello-pangea/dnd";

import styles from "./css/planing.module.css";
import PlaningHeader from "../../components/planing/PlaningHeader";
import { useAuthStore } from "../../store/authStore";
import { useTaskStore } from "../../store/task.store";
import type { TaskData } from "../../types";
type StatusType = 'todo' | 'inProgress' | 'Inreview' | 'done';
// Sütun başlıqları və rəngləri
const labels: Record<string, string> = {
    todo: "To do",
    inProgress: "In progress",
    Inreview: "In review",
    done: "Done",
};

const colors: Record<string, string> = {
    todo: "blue",
    inProgress: "lightblue",
    Inreview: "green",
    done: "orange",
};

const emptyColumns = {
    todo: [] as TaskData[],
    inProgress: [] as TaskData[],
    Inreview: [] as TaskData[],
    done: [] as TaskData[],
};

const Planing = () => {
    const { tasks, updateTaskStatus } = useTaskStore(); // updateTaskStatus opsionaldır
    const { user } = useAuthStore();

    const assignedTasks = useMemo(() => {
        return tasks.filter((t) => t.users.some((u: any) => u.id === user?.id));
    }, [tasks, user]);
    const [columns, setColumns] = useState(emptyColumns);
    console.log("planing");

    const onDragEnd = useCallback(({ source, destination }: any) => {
        if (!destination) return;
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        )
            return;

        const srcList = [...columns[source.droppableId as StatusType]];
        const destList = [...columns[destination.droppableId as StatusType]];

        const [moved] = srcList.splice(source.index, 1);
        moved.statusu = destination.droppableId;
        destList.splice(destination.index, 0, moved);

        setColumns({
            ...columns,
            [source.droppableId]: srcList,
            [destination.droppableId]: destList,
        });

        updateTaskStatus(Number(moved.id), destination.droppableId);
    }, [columns, updateTaskStatus]);


    useEffect(() => {
        const grouped = { ...emptyColumns };
        assignedTasks.forEach((task: any) => {
            const status = (task.statusu || "todo") as StatusType;
            if (grouped[status]) grouped[status].push(task);
        });
        setColumns(grouped);

    }, []);

//     const initialColumns = useMemo(() => {
//     const grouped = { ...emptyColumns };
//     assignedTasks.forEach((task: TaskData) => {
//         const status = (task.statusu || "todo") as StatusType;
//         if (grouped[status]) grouped[status].push(task);
//     });
//     return grouped;
// }, [assignedTasks]);


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className={styles.board}>
                {Object.entries(columns).map(([columnId, list]) => (
                    <Droppable droppableId={columnId} key={columnId}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={styles.column}
                            >
                                <PlaningHeader
                                    title={labels[columnId]}
                                    count={list.length}
                                    color={colors[columnId]}

                                />

                                <div className={styles.tasksWrapper}>
                                    {list.map((task: any, index: number) => (
                                        <Draggable
                                            key={task.id}
                                            draggableId={task.id.toString()}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.dragHandleProps}
                                                    {...provided.draggableProps}
                                                    className={styles.taskCard}
                                                    style={provided.draggableProps.style}
                                                >
                                                    {task.title}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default Planing;
