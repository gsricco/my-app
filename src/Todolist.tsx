import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


type TodoListPropsType = {
    id:string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string,todolistId:string) => void
    changeFilter: (value: FilterValuesType, todolistId:string) => void
    addTask: (title: string,todolistId:string) => void
    changeTaskStatus: (taskId: string, isDone: boolean,todolistId:string) => void
    filter:FilterValuesType
    removeTodolist:(todolistId:string)=>void
    changeTaskTitle:(newTitle:string,todolistID:string,taskID:string)=>void
    changeTitleTodolist:(newTitle:string,todolistId:string)=>void
}


const TodoList = (props: TodoListPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

        // const onNewChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        //     setNewTaskTitle(e.currentTarget.value)
        // }




    const addTask = (newTitle:string) => {
          props.addTask(newTitle.trim(), props.id);
    }
    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.key === 'Enter') {
    //         addTask();
    //     }
    // }

            const onAllClickHandler = () => props.changeFilter("all",props.id);
            const onActiveClickHandler = () => props.changeFilter("active",props.id);
            const onCompletedClickHandler = () => props.changeFilter("completed",props.id);
            const removeTodolist=()=>{
                props.removeTodolist(props.id);
            }
        const onChangeTitleTodolist = (newTitle:string) => {
            props.changeTitleTodolist(newTitle,props.id)
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
                            props.tasks.map((t) => {
                                const onRemoveHandler = () => props.removeTask(t.id, props.id)
                                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                                }
                                const onNewChangeTitleHandler = (newTitle:string) => {
                                    setNewTaskTitle(newTitle)
                                    props.changeTaskTitle(newTitle,props.id,t.id)
                                }
                                return <div key={t.id} className={t.isDone ?'isDone':''}>
                                    <Checkbox
                                           checked={t.isDone}
                                           onChange={onChangeHandler}
                                    />
                                    <EditableSpan title={t.title} onChange={onNewChangeTitleHandler}/>
                                    {/*<button onClick={onRemoveHandler}>X</button>*/}
                                    <IconButton aria-label="delete" onClick={onRemoveHandler}>
                                        <Delete />
                                    </IconButton>
                                </div>
                            })
                        }

                    </div>
                    <div>
                        <Button variant={props.filter === 'all' ? 'contained':'text'}  onClick={onAllClickHandler}>All</Button>
                        <Button variant={props.filter === 'active' ? 'contained':'text'} color={"primary"} onClick={onActiveClickHandler}>Active</Button>
                        <Button variant={props.filter === 'completed' ? 'contained':'text'} color={"secondary"} onClick={onCompletedClickHandler}>Completed</Button>
                    </div>
                </div>
            );
        }
    ;

    export default TodoList;


