import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "../Task/Task";
import {TaskStatuses, TaskType} from "../../api/todolists-api";
import {FilterValuesType, TodolistDomainType} from "../../state/todolists-reducer";
import {useAppDispatch} from "../../state/store";
import {fetchTasksTC} from "../../state/tasks-reducer";


type TodoListPropsType = {
    todolist: TodolistDomainType
    // id: string
    // title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    //filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTitleTodolist: (newTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (newTitle: string, todolistID: string, taskID: string) => void
    removeTask: (id: string, todolistId: string) => void
    demo?: boolean
}


export const TodoList = React.memo(function ({demo = false, ...props}: TodoListPropsType) {
    console.log('TodoList')
    // if(typeof props.demo === 'undefined') props.demo = false;

    const dispatch = useAppDispatch()


    useEffect(() => {
        if (demo) {
            return;
        }
        dispatch(fetchTasksTC(props.todolist.id))
    }, [props.todolist.id])


    const addTask = useCallback((newTitle: string) => {
        props.addTask(newTitle.trim(), props.todolist.id);
    }, [props.addTask, props.todolist.id])


    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.todolist.id), [props.todolist.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.todolist.id), [props.todolist.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.todolist.id), [props.todolist.id]);

    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id);
    }
    const onChangeTitleTodolist = useCallback((newTitle: string) => {
        props.changeTitleTodolist(newTitle, props.todolist.id)
    }, [props.changeTitleTodolist, props.todolist.id])
    let tasksForTodolist = props.tasks;

    if (props.todolist.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }
    if (props.todolist.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
    }
    console.log('tasksForTodolist ', tasksForTodolist)
    console.log('todolist ', props.todolist.filter)

    return (
        <div>
            <h3><EditableSpan title={props.todolist.title} onChange={onChangeTitleTodolist}/>
                {/*<button onClick={removeTodolist}>X</button>*/}
                <IconButton aria-label="delete" onClick={removeTodolist}
                            disabled={props.todolist.entityStatus === "loading"}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addTitle={addTask} disabled={props.todolist.entityStatus === "loading"}/>
            <div style={{marginBottom: '10px'}}>
                {
                    tasksForTodolist.map((t) => <Task
                        key={t.id}
                        task={t}
                        changeTaskStatus={props.changeTaskStatus}
                        removeTask={props.removeTask}
                        changeTaskTitle={props.changeTaskTitle}
                        id={props.todolist.id}

                    />)
                }

            </div>
            <div>
                <Button variant={props.todolist.filter === 'all' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}>All</Button>
                <Button variant={props.todolist.filter === 'active' ? 'contained' : 'text'} color={"primary"}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.todolist.filter === 'completed' ? 'contained' : 'text'} color={"secondary"}
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    );
});


