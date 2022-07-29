import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistsAPI} from "../api/todolists-api";


export default {
    title:'API'
}

const setting = {
    withCredentials:true,
    headers:{
        "API-KEY":"0a6bf10a-0783-484b-91da-65d7e9fda051"
    }
}

export const GetTodolists = ()=>{

    const [state,setState]=useState<any>(null)
    useEffect(()=>{
        //тут делаем запрос и ответ и закидываем в стейт
        //который в виде строки будет отбражаться в div-ке
        todolistsAPI.getTodolists()
        .then((res)=>{
            setState(res.data)
        })
    },[])

    return <div>{JSON.stringify(state)}</div>

}

export const CreateTodolist = ()=>{
    const [state,setState]=useState<any>(null)
    useEffect(()=>{
        todolistsAPI.createTodolist("GGGGGg")
            .then((res)=>{
                setState(res.data)
            })
    },[])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = ()=>{
    const [state,setState]=useState<any>(null)
    useEffect(()=>{
        const todolistId = 'a2b28347-c0eb-4de2-995f-0d92ed26c69a'

       todolistsAPI.deleteTodolist(todolistId)
            .then((res)=>{
                setState(res.data)
            })
    },[])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolist = ()=>{
    const [state,setState]=useState<any>(null)

    useEffect(()=>{
        const todolistId = '06701fee-0f0a-4204-a4e1-54887172c0d5'

        todolistsAPI.updateTodolist(todolistId,'Sergio plus')
            .then((res)=>{
                setState(res.data)
            })
    },[])

    return <div>{JSON.stringify(state)}</div>
}


export const GetTasks = ()=>{

    const [state,setState]=useState<any>(null)
    const [todolistId,setTodolistId]=useState<string>('')
    // useEffect(()=>{
    //
    //
    //
    //     // const todolistId='5b16358a-38a8-4dd5-82e8-7fbb8a297934';
    //
    //
    // },[])

    const getTask=()=>{
        todolistsAPI.getTasks(todolistId)
        .then((res)=>{
            setState(res.data.items)
        })}


    return <div>{JSON.stringify(state)}
        <div>
        <input placeholder={'todolistId'} value={todolistId} onChange={(e)=>(setTodolistId(e.currentTarget.value))}/>

        <button onClick={getTask}>getTask</button>
    </div>
    </div>

}
export const DeleteTask = ()=>{

    const [state,setState]=useState<any>(null)
    const [todolistId,setTodolistId]=useState<string>('')
    const [taskId,setTaskId]=useState<string>('')

    const deleteTask=()=>{
        todolistsAPI.deleteTask(todolistId,taskId)
            .then((res)=>{
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
    <div>
        <input placeholder={'todolistId'} value={todolistId} onChange={(e)=>(setTodolistId(e.currentTarget.value))}/>
        <input placeholder={'taskId'} value={taskId} onChange={(e)=>(setTaskId(e.currentTarget.value))}/>
        <button onClick={deleteTask}>deleteTask</button>
    </div>
    </div>

}

export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId,setTodolistId]=useState<string>('')
    const [title,setTitle]=useState<string>('')

    const createTask=()=>{
        todolistsAPI.createTask(todolistId,title)
            .then(res=>{
                setState(res.data);

            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e)=>(setTodolistId(e.currentTarget.value))}/>
            <input placeholder={'title new Task'} value={title} onChange={(e)=>(setTitle(e.currentTarget.value))}/>
            <button onClick={createTask}>createTask</button>
        </div>
    </div>
}

export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId,setTodolistId]=useState<string>('')
    const [taskId,setTaskId]=useState<string>('')
    const [title,setTitle]=useState<string>('newUpdatedTitle')
    const [description,setDescription]=useState<string>('description1')
    const [status,setStatus]=useState<number>(0)
    const [priority,setPriority]=useState<number>(0)
    const [startDate,setStartDate]=useState<string>('')
    const [deadline,setDeadline]=useState<string>('')

    let model = {
        deadline: '',
        status: status,
        title: title,
        description: description,
        priority: priority,
        startDate: '',

    }

    const updateTask=()=>{
        todolistsAPI.updateTask(todolistId,taskId, model)
            .then(res=>{
                setState(res.data);

            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e)=>(setTodolistId(e.currentTarget.value))}/>
            <input placeholder={'taskId'} value={taskId} onChange={(e)=>(setTaskId(e.currentTarget.value))}/>
            <input placeholder={'new TaskTitle'} value={title} onChange={(e)=>(setTitle(e.currentTarget.value))}/>
            <input placeholder={'description'} value={description} onChange={(e)=>(setDescription(e.currentTarget.value))}/>
            <input placeholder={'status'} value={status} type={'number'} onChange={(e)=>(setStatus(+e.currentTarget.value))}/>
            <input placeholder={'priority'} value={priority} type={'number'} onChange={(e)=>(setPriority(+e.currentTarget.value))}/>
            <input placeholder={'startDate'} value={startDate}  onChange={(e)=>(setStartDate(e.currentTarget.value))}/>
            <input placeholder={'deadline'} value={deadline} onChange={(e)=>(setDeadline(e.currentTarget.value))}/>
            <button onClick={updateTask}>updateTask</button>
        </div>
    </div>
}









