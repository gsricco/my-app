import axios from "axios";
import {CreateTodolist} from "../stories/todolists-api.stories";


const setting = {
    withCredentials: true,
    headers: {
        "API-KEY": "0a6bf10a-0783-484b-91da-65d7e9fda051"
    }
}

const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    ...setting
})

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export enum TaskStatuses {
    New=0,
    InProgress  =1,
    Completed=2,
    Draft=3
}
/////const a:TaskStatuses=TaskStatuses.Completed

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}




// type CreateTodolistResponseType = {
//     resultCode: number
//     messages: Array<string>,
//     data: {
//         item: TodolistType
//     }
// }
// type _DeleteUpdateTodolistResponseType = {
//     resultCode: number
//     messages: string[],
//     data: {}
// }
// type _UpdateTodolistResponseType = {
//     resultCode: number
//     messages: string[],
//     data: {}
// }

type ResponseType<D ={}> = {
    resultCode: number
    messages: string[],
    data: D
}
export type UpdateTaskModelType ={
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title})
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}`)
        return promise
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
        return promise
    },
    getTasks(todolistId: string,) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId:string,title:string) {
        return  instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`,{title})
    },
    deleteTask(todolistId: string,taskId:string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId:string,taskId:string,model:UpdateTaskModelType) {
        return  instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`,model)
    },
}