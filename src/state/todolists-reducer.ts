import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


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
}

export const todolistsReducer = (state: Array<TodoListType>, action: ActionsType):Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            return state.filter(tl => tl.id !== action.id);
        }
        case 'ADD-TODOLIST': {
            return [
                {id: v1(), title: action.title, filter: 'all'},
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
            throw new Error("I don't understand this type")
    }
}



export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title} as const
}
export const ChangeTodolistAC = (title: string, id:string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', title:title,id:id} as const
}

export const ChangeTodolistFilterAC = (id:string,filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER',id:id, filter:filter} as const
}


