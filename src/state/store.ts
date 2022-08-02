import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TodolistsActionsType, todolistsReducer} from "./todolists-reducer";
import {TasksActionsType, tasksReducer} from "./tasks-reducer";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer, AppReducerActionType} from "../app/app-reducer";

// declare global {
//     interface Window {
//         __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//     }
// }

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})


export type AppActionType =
    TasksActionsType
    | TodolistsActionsType
    | AppReducerActionType
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// непосредственно создаём store

export type AppRootState = ReturnType<typeof rootReducer>

// export const store = legacy_createStore(rootReducer, composeEnhancers() );
export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppDispatch = ThunkDispatch<AppRootState, unknown, AppActionType>

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionType>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector


// @ts-ignore
window.store = store;
