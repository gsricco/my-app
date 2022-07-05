import React, {useReducer} from 'react';
import './App.css';
import TodoList from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistAC,
    changeTodolistFilterAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


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

function AppWithReducers() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolistReducer] = useReducer(todolistsReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Milk", isDone: true},
        ],
    })

    function removeTask(id: string, todolistId: string) {
        let action = removeTaskAC(id, todolistId);
        dispatchToTasksReducer(action);
        // let tasks = tasksObj[todolistId];
        // let filteredTasks = tasks.filter((t) => t.id !== id);
        // tasksObj[todolistId] = filteredTasks;
        // setTasksObj({...tasksObj});
    }

    function addTask(title: string, todolistId: string) {
        let action = addTaskAC(title, todolistId);
        dispatchToTasksReducer(action);
        // let newTask = {id: v1(), title: title, isDone: false};
        // let tasks = tasksObj[todolistId];
        // let newTasks = [newTask, ...tasks];
        // tasksObj[todolistId] = newTasks;
        // setTasksObj({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let action = changeTaskStatusAC(taskId, isDone, todolistId);
        dispatchToTasksReducer(action);
        //
        // let tasks = tasksObj[todolistId];
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        //     setTasksObj({...tasksObj});
    }


    const changeTaskTitle = (newTitle: string, todolistID: string, taskID: string) => {
        dispatchToTasksReducer(changeTaskTitleAC(taskID, newTitle, todolistID));
        // dispatchToTasksReducer();
        // setTasksObj({
        //     ...tasksObj,
        //     [todolistID]: tasksObj[todolistID].map(el => el.id === taskID ? {...el, title: newTitle} : el)
        // })
    }


    function changeFilter(value: FilterValuesType, todolistId: string) {
        let action = changeTodolistFilterAC(todolistId, value);
        dispatchToTodolistReducer(action)
        // let todolist = todolists.find(tl => tl.id === todolistId)
        // if (todolist) {
        //     todolist.filter = value;
        //     setTodolists([...todolists])
        // }

    }


    let removeTodolist = (todolistId: string) => {
        let action = removeTodolistAC(todolistId)
        dispatchToTodolistReducer(action)
        dispatchToTasksReducer(action)
        // let filteredTodolist = todolists.filter(tl => tl.id !== todolistId);
        // // setTodolists(filteredTodolist);
        // delete tasksObj[todolistId];
        // setTasksObj({...tasksObj});
    }


    const addNewTodolist = (newTitle: string) => {
        let action = addTodolistAC(newTitle)
        dispatchToTodolistReducer(action)
        dispatchToTasksReducer(action)
        // let newTodolistID = v1();
        // let newTodolist: TodoListType = {id: newTodolistID, title: newTitle, filter: 'all'};
        //
        // setTodolists([newTodolist, ...todolists]);
        // setTasksObj({[newTodolistID]: [], ...tasksObj})
    }


    const changeTitleTodolist = (newTitle: string, todolistID: string) => {
        dispatchToTodolistReducer(changeTodolistAC(newTitle,todolistID))
        // setTodolists(todolists.map(el => el.id === todolistID ? {...el, title: newTitle} : el))
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

                        let tasksForTodolist = tasksObj[tl.id];
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

export default AppWithReducers;
