import {Page} from "./stories/Page";
import React from 'react'
import {AddItemForm} from "./AddItemForm";
import {action} from '@storybook/addon-actions'
import {Task} from "./Task";


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
            task={{id:'1', isDone:true,title:'CSS'}}
            changeTaskStatus={changeTaskStatusCallback}
            removeTask={removeTaskCallback}
            changeTaskTitle={changeTaskTitleCallback}
            id={'todolistId1'}
        />
        <Task
            task={{id:'2', isDone:false,title:'JS'}}
            changeTaskStatus={changeTaskStatusCallback}
            removeTask={removeTaskCallback}
            changeTaskTitle={changeTaskTitleCallback}
            id={'todolistId1'}
        />

    </>
}