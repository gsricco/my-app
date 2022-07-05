import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithRedux";

type TaskPropsType = {
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (newTitle: string, todolistID: string, taskID: string) => void
    removeTask: (id: string, todolistId: string) => void
    task: TaskType
    id: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onRemoveHandler = () => props.removeTask(props.task.id, props.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.id);
    }
    const onNewChangeTitleHandler = useCallback((newTitle: string) => {
        props.changeTaskTitle(newTitle, props.id, props.task.id)
    },[props.changeTaskTitle,props.id, props.task.id])
    return <div key={props.task.id} className={props.task.isDone ? 'isDone' : ''}>
        <Checkbox
            checked={props.task.isDone}
            onChange={onChangeHandler}
        />
        <EditableSpan title={props.task.title} onChange={onNewChangeTitleHandler}/>
        {/*<button onClick={onRemoveHandler}>X</button>*/}
        <IconButton aria-label="delete" onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>
    </div>

})