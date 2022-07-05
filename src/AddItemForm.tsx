import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import App from "./App";
import {Button, IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type AddItemFormPropsType = {
    addTitle: (newTitle: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log("AddItemForm")
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
        if (error !== null) {
            setError(null);
        }
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
})

