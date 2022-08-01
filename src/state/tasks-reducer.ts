import {v1} from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    setTodolistsAC,
    SetTodolistsActionType
} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {AppRootState, AppThunkType} from "./store";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    // todolistId: string,
    // title: string
    task:TaskType
}

export type UpdateChangeTaskActionType = {
    type: 'UPDATE-TASK',
    taskId: string,
    todolistId: string
    model: UpdateDomainTaskModelType
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    todolistId: string
    title: string
}

export type TasksActionsType = RemoveTaskActionType
    | AddTaskActionType
    | UpdateChangeTaskActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTaskActionType;

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.task.todoListId]: [
                    action.task, ...state[action.task.todoListId]]
            }
        }
    //     {
    //     ...state,
    //         [action.todolistId]: [
    //         {
    //             id: v1(),
    //             title: action.title,
    //             status: TaskStatuses.New,
    //             description: '',
    //             priority: 0,
    //             startDate: '',
    //             deadline: '',
    //             todoListId: action.todolistId,
    //             order: 0,
    //             addedDate: 'string',
    //         }, ...state[action.todolistId]]
    //     }
    // }
        case "UPDATE-TASK": {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, ...action.model} : t);

            return stateCopy;
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state}
            let tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tasks.map(t => t.id === action.taskId ? {...t, title: action.title} : t);
            return stateCopy;
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state};
            // stateCopy[action.todolistId] = [];
            stateCopy[action.todolist.id] = [];
            return stateCopy;
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy;
        }
        case "SET-TODOLIST": {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case "SET-TASKS":{
            const copyState = {...state}
            copyState[action.todolistId]=action.tasks
            return copyState
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}
// export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
//     return {type: 'REMOVE-TASK', todolistId, taskId} as const
// }



export const addTaskAC = (task:TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task} as const
}
// export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
//     return {type: 'ADD-TASK', title, todolistId} as const
// }

// export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
//     return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId} as const
// }

export const updateTaskAC = (taskId: string, model:UpdateDomainTaskModelType, todolistId: string): UpdateChangeTaskActionType => {
    return {type: 'UPDATE-TASK', model, todolistId, taskId} as const
}




export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const
}


export type SetTaskActionType = ReturnType<typeof setTaskAC>

export const setTaskAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {type: 'SET-TASKS', tasks, todolistId} as const
}


export const fetchTasksTC = (todolistId:string):AppThunkType=>{
    return (dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTaskAC(res.data.items,todolistId))
            })
    }
}

export const removeTaskTC=(todolistId:string,taskId:string):AppThunkType=>{
    return (dispatch)=>{
        todolistsAPI.deleteTask(todolistId,taskId)
            .then(res=>{
                const action = removeTaskAC(taskId, todolistId);
                dispatch(action);
            })
    }
}

export const addTaskTC=(title:string,todolistId:string):AppThunkType=>{
    return (dispatch)=>{
        todolistsAPI.createTask(todolistId,title)
            .then(res=>{
                const action = addTaskAC(res.data.data.item);
                dispatch(action);
            })
    }
}
/*export const changeTaskStatusTC=(taskId:string,status:TaskStatuses ,todolistId:string):AppThunkType=>{
    return (dispatch,getState:()=>AppRootState)=>{
        const state = getState();
        const task = state.tasks[todolistId].find(t=>t.id===taskId)
        if(!task){
            // throw new Error('task not found in the state')
            console.warn('task not found in the state')
            return
        }
        const model:UpdateTaskModelType={
            title: task.title,
            description: task.description,
            status: status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }

        todolistsAPI.updateTask(todolistId,taskId,model)
            .then(res=>{
                const action = changeTaskStatusAC(taskId, status, todolistId);
                dispatch(action);
            })
    }
}


export const changeTaskTitleTC=(taskId: string,title: string, todolistId: string):AppThunkType=>{
    return (dispatch,getState:()=>AppRootState)=>{
        const state = getState();
        const task = state.tasks[todolistId].find(t=>t.id===taskId)
        if(!task){
            // throw new Error('task not found in the state')
            console.warn('task not found in the state')
            return
        }
        const model:UpdateTaskModelType={
            title: title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline
        }

        todolistsAPI.updateTask(todolistId,taskId,model)
            .then(res=>{
                const action = changeTaskTitleAC(taskId, title, todolistId);
                dispatch(action);
            })
    }
}*/
// вместо этого одни санки апдейт
export type UpdateDomainTaskModelType ={
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}


export const updateTaskTC=(taskId: string, domainModel:UpdateDomainTaskModelType,todolistId: string ):AppThunkType=>{
    return (dispatch,getState:()=>AppRootState)=>{
        const state = getState();
        const task = state.tasks[todolistId].find(t=>t.id===taskId)
        if(!task){
            // throw new Error('task not found in the state')
            console.warn('task not found in the state')
            return
        }
        const apiModel:UpdateTaskModelType={
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId,taskId,apiModel)
            .then(res=>{
                const action = updateTaskAC(taskId, domainModel, todolistId);
                dispatch(action);
            })
    }
}


