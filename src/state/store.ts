import {combineReducers, compose, legacy_createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// непосредственно создаём store

export type AppRootState = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer, composeEnhancers());


// @ts-ignore
window.store = store;
