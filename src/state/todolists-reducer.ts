
import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../AppWithRedux";


type ActionsType = ChangeTodolistTitleActionType|ChangeTodolistFilterActionType|RemoveTodolistActionType|AddTodolistActionType;

export type ChangeTodolistTitleActionType ={
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type ChangeTodolistFilterActionType ={
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}
export type RemoveTodolistActionType ={
    type:'REMOVE-TODOLIST'
    id:string
}
export type AddTodolistActionType ={
    type:'ADD-TODOLIST'
    title:string
    todolistId:string
}
export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState:Array<TodoListType> = []


export const todolistsReducer = (state: Array<TodoListType>=initialState, action: ActionsType):Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            return state.filter(tl => tl.id !== action.id);
        }
        case 'ADD-TODOLIST': {
            return [
                {id: action.todolistId, title: action.title, filter: 'all'},
                ...state];
        }
        case 'CHANGE-TODOLIST-TITLE':{
            const todolist = state.find(el => el.id === action.id);
            if(todolist) todolist.title = action.title;
        }
        return [...state]
        case 'CHANGE-TODOLIST-FILTER':{
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) todolist.filter = action.filter;
        }
            return [...state]
        default:
            return state;
    }
}



export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title, todolistId:v1()} as const
}
export const changeTodolistAC = (title: string, id:string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', title:title,id:id} as const
}

export const changeTodolistFilterAC = (id:string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER',id:id, filter:filter} as const
}

