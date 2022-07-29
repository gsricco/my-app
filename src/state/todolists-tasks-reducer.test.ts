// import {TasksStateType, TodoListType} from "../AppWithRedux";
import {addTodolistAC, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TaskType, TodolistType} from "../api/todolists-api";

// test('ids should be equals',()=>{
//     const startTasksState:TaskType ={};
//     const startTodolistsState:Array<TodolistType> =[];
//
//     const action = addTodolistAC('new todolist');
//
//     const endTaskState=tasksReducer(startTasksState,action);
//     const endTodolistsState=todolistsReducer(startTodolistsState,action)
//
//     const keys = Object.keys(endTaskState);
//     const idFromTasks = keys[0];
//     const idFromTodolists = endTodolistsState[0].id;
//
//     expect(idFromTasks).toBe(action.todolistId);
//     expect(idFromTodolists).toBe(action.todolistId);
//
//
//
// })