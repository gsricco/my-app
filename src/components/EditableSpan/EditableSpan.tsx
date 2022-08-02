import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange:(value:string)=>void
}

export  const EditableSpan = React.memo(function(props: EditableSpanPropsType) {
    console.log('EditableSpan')
    let [editMode,setEditMode]=useState(false);
    let [value, setValue]=useState(props.title)

    const activateVeiwMode=()=>{
        setEditMode(!editMode);
        if (editMode) props.onChange(value)
    }

    const onNewChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {

        setValue(e.currentTarget.value);
        // props.onChange(value)
    }


    return (
        editMode
        ?<TextField value={value} autoFocus onBlur={activateVeiwMode} onChange={onNewChangeValueHandler}/>
        :<span onDoubleClick={activateVeiwMode}>{props.title}</span>
    )
})