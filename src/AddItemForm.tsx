import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "./Todolist.module.css";
import Button from "@mui/material/Button";

type AddItemFormProps = {
    addItemCallBack: (newTitle: string) => void
}
export const AddItemForm = ({addItemCallBack}: AddItemFormProps) => {

    const [newItemTitle, setNewItemTitle] = useState('')
    const [error, setError] = useState<null | string>(null)

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newItemTitle.trim() !== '') {
            addItemCallBack(newItemTitle.trim())
            setNewItemTitle('')
        }
        if (e.key === 'Enter' && newItemTitle.trim() === '')
            setError('Title is required')
    }

    const addTaskHandler = () => {
        if (newItemTitle.trim() !== '') {
            addItemCallBack(newItemTitle.trim())
        } else {
            setError('Title is required')
        }
        setNewItemTitle('')
    }


    const setNewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewItemTitle(e.currentTarget.value)
    }


    return (
        <div>
                              <div className={s.addTaskBlock}>
                <input className={error ? s.errorInput : ''} onKeyUp={onKeyUpHandler} value={newItemTitle}
                       onChange={setNewTaskTitleHandler}/>
                <Button variant={"contained"}  onClick={addTaskHandler}>ADD</Button>
            </div>
            {error && <div className={s.errorText}>{error}</div>}
        </div>
    );
};

