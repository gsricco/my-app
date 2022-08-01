import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppThunkType, useAppDispatch} from "./store";


export type TodolistsActionsType =
    ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | RemoveTodolistActionType
    | AddTodolistActionType
    | SetTodolistsActionType

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
}
export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState: Array<TodolistDomainType> = []

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id);
        }

        case 'ADD-TODOLIST': {
            const newTodolist:TodolistDomainType = {...action.todolist, filter:'all'}
            return [newTodolist,
                ...state];
        }
    //         return [{
    //             id: action.todolistId,
    //             title: action.title,
    //             filter: 'all',
    //             order:0,
    //             addedDate:''
    //         },
    //             ...state];
    // }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(el => el.id === action.id);
            if (todolist) todolist.title = action.title;
        }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) todolist.filter = action.filter;
        }
            return [...state]
        case 'SET-TODOLIST': {
            return action.todolists.map(tl=>({...tl,filter:'all'}));
        }
        default:
            return state;
    }
}


export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (todolist:TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const changeTodolistAC = (title: string, id: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: id} as const
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const
}

export const setTodolistsAC = (todolists:Array<TodolistType>) => {
    return {type: 'SET-TODOLIST', todolists} as const
}




export const fetchTodolistsTC = ():AppThunkType=>{
    return (dispatch) => {
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}

export const removeTodolistsTC = (todolistId:string):AppThunkType=>{
    return (dispatch) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC(todolistId))
            })
    }
}

export const addTodolistsTC = (title:string):AppThunkType=>{
    return (dispatch) => {
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}

export const changeTodolistTC = ( title: string,id: string):AppThunkType=>{
    return (dispatch) => {
        todolistsAPI.updateTodolist(id,title)
            .then((res) => {
                dispatch(changeTodolistAC(title,id))
            })
    }
}



