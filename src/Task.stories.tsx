import {Page} from "./stories/Page";
import React from 'react'
import {AddItemForm} from "./AddItemForm";
import {action} from '@storybook/addon-actions'
import {Task} from "./Task";
import {TaskStatuses} from "./api/todolists-api";


export default {
    title: 'Task Component',
    component: Task,
}

const changeTaskStatusCallback = action('Status changed');
const changeTaskTitleCallback = action('Title changed');
const removeTaskCallback = action('Task removed');

export const TaskBaseExample = ()=>{
    return <>
        <Task
            task={{id:'1', status:TaskStatuses.New,title:'CSS',
                description: '',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId',
                order: 0,
                addedDate: 'string',}}
            changeTaskStatus={changeTaskStatusCallback}
            removeTask={removeTaskCallback}
            changeTaskTitle={changeTaskTitleCallback}
            id={'todolistId1'}
        />
        <Task
            task={{id:'2', status:TaskStatuses.New,title:'JS',
                description: '',
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId',
                order: 0,
                addedDate: 'string',}}
            changeTaskStatus={changeTaskStatusCallback}
            removeTask={removeTaskCallback}
            changeTaskTitle={changeTaskTitleCallback}
            id={'todolistId1'}
        />

    </>
}