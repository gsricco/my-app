import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import App from "./App";
import {Button, IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type AddItemFormPropsType = {
    addTitle: (newTitle: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [newTitle, setNewTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const addTitle = () => {
        if (newTitle.trim() !== "") {
            props.addTitle(newTitle.trim());
            setNewTitle("");
        } else
            setError('Title is required')
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addTitle();
        }
    }
    const onNewChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }


    return (
        <div>
            {/*<input value={newTitle}*/}
            {/*       onChange={onNewChangeTitleHandler}*/}
            {/*       onKeyDown={onKeyPressHandler}*/}
            {/*       className={error ? 'error' : ''}*/}
            {/*/>*/}
            <TextField value={newTitle}
                       variant={"outlined"}
                       label={"Type value"}
                       error={!!error}
                       helperText={error}
                   onChange={onNewChangeTitleHandler}
                   onKeyDown={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />
            <IconButton onClick={addTitle} color={"primary"}><ControlPoint/>
            </IconButton>

        </div>
    )
}
export default AddItemForm;