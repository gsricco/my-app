import {FilterValuesType, TasksStateType, TaskType, TodoListType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";



export type RemoveTaskActionType ={
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId:string

}
export type AddTaskActionType ={
    type: 'ADD-TASK',
    todolistId: string,
    title: string
}
export type ChangeTaskStatusActionType ={
    type: 'CHANGE-TASK-STATUS',
    taskId: string,
    todolistId:string
    isDone:boolean

}
export type ChangeTaskTitleActionType ={
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    todolistId:string
    title:string

}

type ActionsType = RemoveTaskActionType|AddTaskActionType|ChangeTaskStatusActionType|ChangeTaskTitleActionType|AddTodolistActionType|RemoveTodolistActionType;



export const tasksReducer = (state: TasksStateType, action: ActionsType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':{
            /*const stateCopy = {...state};
            const tasks=state[action.todolistId];
            const filtredTasks = tasks.filter(t=>t.id !==action.taskId);
            stateCopy[action.todolistId]=filtredTasks;
            return stateCopy;*/
            return {...state,[action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        }
        case 'ADD-TASK': {

            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        }
        case "CHANGE-TASK-STATUS":{
            const stateCopy={...state}
            let tasks = stateCopy[action.todolistId];
            let task = tasks.find(t => t.id === action.taskId);
            if (task) {
                task.isDone = action.isDone;
            }
            return stateCopy;
        }
        case "CHANGE-TASK-TITLE":{
            const stateCopy={...state}
            let tasks = stateCopy[action.todolistId];
            let task = tasks.find(t => t.id === action.taskId);
            if (task) {
                task.title = action.title;
            }
            return stateCopy;
        }
        case "ADD-TODOLIST":{
            const stateCopy ={...state};
            stateCopy[action.todolistId]=[];
            return stateCopy;
        }
        case "REMOVE-TODOLIST":{
            const stateCopy={...state}
            delete stateCopy[action.id]
            return stateCopy;
        }
        default:
            throw new Error("I don't understand this type")
    }
}



export const removeTaskAC = (taskId:string,todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', todolistId, taskId} as const
}

export const addTaskAC = (title: string, todolistId:string): AddTaskActionType => {
    return { type: 'ADD-TASK', title,todolistId} as const
}

export const changeTaskStatusAC = (taskId: string,isDone:boolean,todolistId:string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', isDone,todolistId,taskId} as const
}
export const changeTaskTitleAC = (taskId: string,title:string,todolistId:string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', title,todolistId,taskId} as const
}



