import {AppRootState, store} from "../state/store";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todolistsReducer} from "../state/todolists-reducer";
import {v1} from "uuid";
import {TaskStatuses} from "../api/todolists-api";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "../app/app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app:appReducer
})

const initialGlobalState:AppRootState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", entityStatus:"idle", addedDate:'',order:0},
        {id: "todolistId2", title: "What to buy", filter: "all", entityStatus:"idle", addedDate:'',order:0}
    ] ,
    tasks: {
        ["todolistId1"]: [


            {id: v1(), title: "HTML&CSS", status:TaskStatuses.New,description: '',priority: 0,startDate: '',deadline: '', todoListId: 'todolistId1',order: 0, addedDate: '',},
            {id: v1(), title: "JS", status:TaskStatuses.Completed,description: '',priority: 0,startDate: '',deadline: '', todoListId: 'todolistId1',order: 0, addedDate: '',}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status:TaskStatuses.New,description: '',priority: 0,startDate: '',deadline: '', todoListId: 'todolistId2',order: 0, addedDate: '',},
            {id: v1(), title: "React Book", status:TaskStatuses.Completed,description: '',priority: 0,startDate: '',deadline: '', todoListId: 'todolistId2',order: 0, addedDate: '',}
        ]
    },
    app:{
        error:null,
        status:'idle'
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootState,applyMiddleware(thunkMiddleware));





export const ReduxStoreProviderDecorator = (storyFn:any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
};

