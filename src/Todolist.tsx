import React, {useCallback, useState} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {FilterValuesType, TaskType} from "./AppWithRedux";
import {Task} from "./Task";


type TodoListPropsType = {
    id:string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId:string) => void
    addTask: (title: string,todolistId:string) => void
    filter:FilterValuesType
    removeTodolist:(todolistId:string)=>void
    changeTitleTodolist:(newTitle:string,todolistId:string)=>void
    changeTaskStatus: (taskId: string, isDone: boolean,todolistId:string) => void
    changeTaskTitle:(newTitle:string,todolistID:string,taskID:string)=>void
    removeTask: (id: string,todolistId:string) => void

}


export const TodoList = React.memo(function(props: TodoListPropsType){
        console.log('TodoList')

    const addTask = useCallback((newTitle:string) => {
          props.addTask(newTitle.trim(), props.id);
    },[props.addTask,props.id])

            const onAllClickHandler = useCallback(() => props.changeFilter("all",props.id),[props.filter,props.id]);
            const onActiveClickHandler = useCallback( ()=> props.changeFilter("active",props.id),[props.filter,props.id]);
            const onCompletedClickHandler = useCallback( ()=> props.changeFilter("completed",props.id),[props.filter,props.id]);

            const removeTodolist=()=>{
                props.removeTodolist(props.id);
            }
        const onChangeTitleTodolist = useCallback((newTitle:string) => {
            props.changeTitleTodolist(newTitle,props.id)
        },[props.changeTitleTodolist,props.id])
    let tasksForTodolist = props.tasks;

    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }

            return (
                <div>
                    <h3><EditableSpan title={props.title} onChange={onChangeTitleTodolist}/>
                        {/*<button onClick={removeTodolist}>X</button>*/}
                        <IconButton aria-label="delete" onClick={removeTodolist}>
                            <Delete />
                        </IconButton>
                    </h3>
                    <AddItemForm  addTitle={addTask}/>
                    <div style={{marginBottom:'10px'}}>
                        {
                            tasksForTodolist.map((t) => <Task
                                key={t.id}
                                task={t}
                                changeTaskStatus={props.changeTaskStatus}
                                removeTask={props.removeTask}
                                changeTaskTitle={props.changeTaskTitle}
                                id={props.id}

                            />)
                        }

                    </div>
                    <div>
                        <Button variant={props.filter === 'all' ? 'contained':'text'}  onClick={onAllClickHandler}>All</Button>
                        <Button variant={props.filter === 'active' ? 'contained':'text'} color={"primary"} onClick={onActiveClickHandler}>Active</Button>
                        <Button variant={props.filter === 'completed' ? 'contained':'text'} color={"secondary"} onClick={onCompletedClickHandler}>Completed</Button>
                    </div>
                </div>
            );
        })    ;


