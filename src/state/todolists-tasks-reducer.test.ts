import {addTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TaskType, TodolistType} from "../api/todolists-api";
import {TasksStateType, TodoListType} from "../app/AppWithRedux";

test('ids should be equals',()=>{
    const startTasksState:TasksStateType ={};
    const startTodolistsState:Array<TodolistDomainType> =[];

    const todolist = {
        id: 'todolistId',
        title: 'New add Titile',
        addedDate: '',
        order: 0
    };

    const action = addTodolistAC(todolist);

    const endTaskState=tasksReducer(startTasksState,action);
    const endTodolistsState=todolistsReducer(startTodolistsState,action)

    const keys = Object.keys(endTaskState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);



})
