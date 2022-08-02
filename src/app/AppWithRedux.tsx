import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "../components/Todolist/Todolist";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistsTC,
    changeTodolistFilterAC,
    changeTodolistTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistsTC, TodolistDomainType
} from "../state/todolists-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../state/tasks-reducer";
import {useAppDispatch, useAppSelector} from "../state/store";
import {TaskStatuses, TaskType} from "../api/todolists-api";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {RequestStatusType} from "./app-reducer";


export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}

function AppWithRedux({demo = false}: PropsType) {
    console.log('AppWithRedux')

    const dispatch = useAppDispatch();
    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists);
    const tasks = useAppSelector<TasksStateType>(state => state.tasks);
    const status = useAppSelector<RequestStatusType>(state => state.app.status)

    // useEffect(()=>{
    //     todolistsAPI.getTodolists()
    //         .then(res=>{
    //             dispatch(setTodolistsAC(res.data))
    //         })
    // },[])


    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])


    const removeTask = useCallback((id: string, todolistId: string) => {
        // todolistsAPI.deleteTask(todolistId,id)
        //     .then(res=>{
        //         const action = removeTaskAC(id, todolistId);
        //         dispatch(action);
        //     })
        const thunk = removeTaskTC(todolistId, id)
        dispatch(thunk)// это по сути для UI dispatch(action)
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {

        let thunk = addTaskTC(title, todolistId);
        dispatch(thunk);
    }, [dispatch])

    const changeStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        // dispatch(changeTaskStatusTC(taskId, status, todolistId));
        dispatch(updateTaskTC(taskId, {status}, todolistId));
    }, [dispatch])


    const changeTaskTitle = useCallback((newTitle: string, todolistID: string, taskID: string) => {
        // dispatch(changeTaskTitleTC(taskID, newTitle, todolistID));
        dispatch(updateTaskTC(taskID, {title: newTitle}, todolistID));
    }, [dispatch])


    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let action = changeTodolistFilterAC(todolistId, value);
        dispatch(action)
    }


    const removeTodolist = useCallback((todolistId: string) => {
        let thunk = removeTodolistsTC(todolistId)
        dispatch(thunk)
    }, [dispatch])


    const addNewTodolist = useCallback((newTitle: string) => {
        let thunk = addTodolistsTC(newTitle)
        dispatch(thunk)
    }, [dispatch])


    const changeTitleTodolist = useCallback((newTitle: string, todolistID: string) => {
        dispatch(changeTodolistTC(newTitle, todolistID))
    }, [dispatch])


    return (
        <div className="App">
            <ErrorSnackbar/>
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
                {status === 'loading' && <LinearProgress color="secondary"/>}
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
                                        todolist={tl}
                                        // id={tl.id}
                                        // title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        // filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTitleTodolist={changeTitleTodolist}
                                        demo={demo}
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
