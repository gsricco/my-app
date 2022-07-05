import React from 'react';
import './App.css';
import TodoList from "./Todolist";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTodolistAC, changeTodolistAC, changeTodolistFilterAC, removeTodolistAC} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";


export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = "all" | "completed" | "active";

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {


    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState,Array<TodoListType>>(state=>state.todolists)
    const tasks = useSelector<AppRootState,TasksStateType>(state=>state.tasks)

    // let [todolists, dispatchToTodolistReducer] = useReducer(todolistsReducer, [
    //     {id: todolistId1, title: 'What to learn', filter: 'all'},
    //     {id: todolistId2, title: 'What to buy', filter: 'all'}
    // ])
    //
    // let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
    //     [todolistId1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS/TS", isDone: true},
    //         {id: v1(), title: "React", isDone: false},
    //         {id: v1(), title: "Redux", isDone: false},
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: "Book", isDone: false},
    //         {id: v1(), title: "Milk", isDone: true},
    //     ],
    // })

    function removeTask(id: string, todolistId: string) {
        let action = removeTaskAC(id, todolistId);
        dispatch(action);
    }

    function addTask(title: string, todolistId: string) {
        let action = addTaskAC(title, todolistId);
        dispatch(action);
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let action = changeTaskStatusAC(taskId, isDone, todolistId);
        dispatch(action);
    }


    const changeTaskTitle = (newTitle: string, todolistID: string, taskID: string) => {
        dispatch(changeTaskTitleAC(taskID, newTitle, todolistID));
    }


    function changeFilter(value: FilterValuesType, todolistId: string) {
        let action = changeTodolistFilterAC(todolistId, value);
        dispatch(action)
    }


    let removeTodolist = (todolistId: string) => {
        let action = removeTodolistAC(todolistId)
        dispatch(action)
    }


    const addNewTodolist = (newTitle: string) => {
        let action = addTodolistAC(newTitle)
        dispatch(action)
    }


    const changeTitleTodolist = (newTitle: string, todolistID: string) => {
        dispatch(changeTodolistAC(newTitle,todolistID))
    }


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
                        if (tl.filter === "completed") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                        }
                        if (tl.filter === "active") {
                            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                        }


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
                                        changeTaskTitle={changeTaskTitle} changeTitleTodolist={changeTitleTodolist}
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
