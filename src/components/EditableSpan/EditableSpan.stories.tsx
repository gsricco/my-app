import {Page} from "../../stories/Page";
import React from 'react'
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {action} from '@storybook/addon-actions'
import {Task} from "../Task/Task";
import {EditableSpan} from "./EditableSpan";


export default {
    title: 'EditableSpan Component',
    component: EditableSpan,
}

const changeCallback = action('Value changed');


export const EditableSpanBaseExample = ()=>{
    return <EditableSpan title={"Start value"} onChange={changeCallback} />
}