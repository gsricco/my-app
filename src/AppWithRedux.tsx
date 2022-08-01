import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistsTC,
    changeTodolistFilterAC,
    changeTodolistTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistsTC
} from "./state/todolists-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./state/tasks-reducer";
import {useAppDispatch, useAppSelector} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolists-api";


// export type TaskType = {
//     id: string,
//     title: string,
//     status:TaskStatuses
// }



export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    console.log('AppWithRedux')

    const dispatch = useAppDispatch()
    const todolists = useAppSelector<Array<TodoListType>>(state=>state.todolists)
    const tasks = useAppSelector<TasksStateType>(state=>state.tasks)

    // useEffect(()=>{
    //     todolistsAPI.getTodolists()
    //         .then(res=>{
    //             dispatch(setTodolistsAC(res.data))
    //         })
    // },[])


 useEffect(()=>{
     dispatch(fetchTodolistsTC())
    },[])



    const removeTask = useCallback((id: string, todolistId: string) =>{
        // todolistsAPI.deleteTask(todolistId,id)
        //     .then(res=>{
        //         const action = removeTaskAC(id, todolistId);
        //         dispatch(action);
        //     })
        const thunk = removeTaskTC(todolistId,id)
        dispatch(thunk)// это по сути для UI dispatch(action)
    },[dispatch])

    const addTask = useCallback((title: string, todolistId: string) =>{

        let thunk = addTaskTC(title, todolistId);
        dispatch(thunk);
    },[dispatch])

    const changeStatus = useCallback((taskId: string, status:TaskStatuses, todolistId: string) =>{
        // dispatch(changeTaskStatusTC(taskId, status, todolistId));
        dispatch(updateTaskTC(taskId, {status}, todolistId));
    },[dispatch])


    const changeTaskTitle = useCallback((newTitle: string, todolistID: string, taskID: string) => {
        // dispatch(changeTaskTitleTC(taskID, newTitle, todolistID));
        dispatch(updateTaskTC(taskID, {title:newTitle}, todolistID));    },[dispatch])


    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) =>{
        let action = changeTodolistFilterAC(todolistId, value);
        dispatch(action)
    },[dispatch])


    const removeTodolist = useCallback((todolistId: string) => {
        let thunk = removeTodolistsTC(todolistId)
        dispatch(thunk)
    },[dispatch])


    const addNewTodolist = useCallback((newTitle: string) => {
        let thunk = addTodolistsTC(newTitle)
        dispatch(thunk)
    },[dispatch])


    const changeTitleTodolist = useCallback((newTitle: string, todolistID: string) => {
        dispatch(changeTodolistTC(newTitle,todolistID))
    },[dispatch])


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addTitle={addNewTodolist}/>
                </Grid>
                <Grid container spacing={3}>{
                    todolists.map((tl) => {
                        let tasksForTodolist = tasks[tl.id];
                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTitleTodolist={changeTitleTodolist}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })
                }</Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;
