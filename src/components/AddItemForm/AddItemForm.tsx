import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type AddItemFormPropsType = {
    addTitle: (newTitle: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo(({addTitle, disabled = false}: AddItemFormPropsType) => {
    console.log("AddItemForm")
    const [newTitle, setNewTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const addTitleHandler = () => {
        if (newTitle.trim() !== "") {
            addTitle(newTitle.trim());
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
            addTitleHandler();
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
                       disabled={disabled}
            />
            <IconButton onClick={addTitleHandler} color={"primary"} disabled={disabled}><ControlPoint/>
            </IconButton>

        </div>
    )
})

