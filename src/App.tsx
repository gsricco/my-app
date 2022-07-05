// import React, {useState} from 'react';
// import './App.css';
// import TodoList from "./Todolist";
// import {v1} from "uuid";
// import AddItemForm from "./AddItemForm";
// import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
// import {Menu} from "@material-ui/icons";
//
//
// export type TaskType = {
//     id: string,
//     title: string,
//     isDone: boolean
// }
//
// export type FilterValuesType = "all" | "completed" | "active";
//
// export type TodoListType = {
//     id: string,
//     title: string,
//     filter: FilterValuesType
// }
//
// export type TasksStateType = {
//     [key:string]:Array<TaskType>
// }
//
// function App() {
//     /*const todoListTitle_1 = "What to learn"
//     const todoListTitle_2 = "What to buy"
//     const todoListTitle_3 = "What to read"
//
//
//     let [tasksObj, setTasks] = useState<Array<TaskType>>([
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS/TS", isDone: true},
//         {id: v1(), title: "React", isDone: false},
//         {id: v1(), title: "Redux", isDone: false},
//     ]);
//     console.log(tasksObj)*/
//
//
//     function removeTask(id: string, todolistId: string) {
//         let tasks = tasksObj[todolistId];
//         let filteredTasks = tasks.filter((t) => t.id !== id);
//         tasksObj[todolistId] = filteredTasks;
//         setTasksObj({...tasksObj});
//     }
//
//     function addTask(title: string, todolistId: string) {
//         let newTask = {id: v1(), title: title, isDone: false};
//         let tasks = tasksObj[todolistId];
//         let newTasks = [newTask, ...tasks];
//         tasksObj[todolistId] = newTasks;
//         setTasksObj({...tasksObj});
//     }
//
//     function changeFilter(value: FilterValuesType, todolistId: string) {
//         let todolist = todolists.find(tl => tl.id === todolistId)
//         if (todolist) {
//             todolist.filter = value;
//             setTodolists([...todolists])
//         }
//
//     }
//
//     function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
//         let tasks = tasksObj[todolistId];
//         let task = tasks.find(t => t.id === taskId);
//         if (task) {
//             task.isDone = isDone;
//             setTasksObj({...tasksObj});
//         }
//     }
//
//     let todolistId1 = v1();
//     let todolistId2 = v1();
//
//     let [todolists, setTodolists] = useState<Array<TodoListType>>([
//         {id: todolistId1, title: 'What to learn', filter: 'all'},
//         {id: todolistId2, title: 'What to buy', filter: 'all'}
//     ])
//
//     let removeTodolist = (todolistId: string) => {
//         let filteredTodolist = todolists.filter(tl => tl.id !== todolistId);
//         setTodolists(filteredTodolist);
//         delete tasksObj[todolistId];
//         setTasksObj({...tasksObj});
//     }
//
//     let [tasksObj, setTasksObj] = useState({
//         [todolistId1]: [
//             {id: v1(), title: "HTML&CSS", isDone: true},
//             {id: v1(), title: "JS/TS", isDone: true},
//             {id: v1(), title: "React", isDone: false},
//             {id: v1(), title: "Redux", isDone: false},
//         ],
//         [todolistId2]: [
//             {id: v1(), title: "Book", isDone: false},
//             {id: v1(), title: "Milk", isDone: true},
//         ],
//     })
//
//     const addNewTodolist = (newTitle: string) => {
//         let newTodolistID = v1();
//         let newTodolist: TodoListType = {id: newTodolistID, title: newTitle, filter: 'all'};
//
//         setTodolists([newTodolist, ...todolists]);
//         setTasksObj({[newTodolistID]: [], ...tasksObj})
//     }
//
//     const changeTaskTitle = (newTitle: string, todolistID: string, taskID: string) => {
//         setTasksObj({
//             ...tasksObj,
//             [todolistID]: tasksObj[todolistID].map(el => el.id === taskID ? {...el, title: newTitle} : el)
//         })
//     }
//     const changeTitleTodolist = (newTitle: string, todolistID: string) => {
//         setTodolists(todolists.map(el => el.id === todolistID ? {...el, title: newTitle} : el))
//     }
//
//
//     return (
//         <div className="App">
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" aria-label="menu">
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant="h6">
//                         News
//                     </Typography>
//                     <Button color="inherit">Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed>
//                 <Grid container style={{padding:'10px'}}>
//                     <AddItemForm addTitle={addNewTodolist}/>
//                 </Grid>
//                 <Grid container spacing={3}>{
//                     todolists.map((tl) => {
//
//                         let tasksForTodolist = tasksObj[tl.id];
//                         if (tl.filter === "completed") {
//                             tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
//                         }
//                         if (tl.filter === "active") {
//                             tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
//                         }
//
//
//                         return (
//                             <Grid item>
//                                 <Paper style={{padding:'10px'}}>
//                                     <TodoList
//                                         key={tl.id}
//                                         id={tl.id}
//                                         title={tl.title}
//                                         tasks={tasksForTodolist}
//                                         removeTask={removeTask}
//                                         changeFilter={changeFilter}
//                                         addTask={addTask}
//                                         changeTaskStatus={changeStatus}
//                                         filter={tl.filter}
//                                         removeTodolist={removeTodolist}
//                                         changeTaskTitle={changeTaskTitle} changeTitleTodolist={changeTitleTodolist}
//                                     />
//                                 </Paper>
//                             </Grid>
//                         )
//                     })
//                 }</Grid>
//             </Container>
//         </div>
//     )
//     /*  <div className="App">
//           <TodoList
//               title={todoListTitle_1}
//               tasksObj={tasksForTodolist}
//               removeTask={removeTask}
//               changeFilter={changeFilter}
//               addTask={addTask}
//               changeTaskStatus={changeStatus}
//               filter={filter}
//           />
//           <TodoList
//               title={todoListTitle_1}
//               tasksObj={tasksForTodolist}
//               removeTask={removeTask}
//               changeFilter={changeFilter}
//               addTask={addTask}
//               changeTaskStatus={changeStatus}
//               filter={filter}
//           />
//       </div>
//   );*/
// }
//
// export default App;
export default {}