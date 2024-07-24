import React, {ChangeEvent, useState} from 'react';
import s from "./Todolist.module.css";

type EditableSpanProps = {
    title: string
    callBack: (editTitle: string) => void
}
export const EditableSpan = ({callBack, title}: EditableSpanProps) => {
    const [editMode, setEditMode] = useState(false)
    const [editTitle, setEditTitle] = useState(title)

    const onDoubleClickHandler = () => setEditMode(true)
    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setEditTitle(e.currentTarget.value)
    const onBlurInputHandler = () => {
        setEditMode(false)
        callBack(editTitle)
    }

    return (
        <div>
            {
                editMode ?
                    <input autoFocus onBlur={onBlurInputHandler} value={editTitle} onChange={onInputChangeHandler}/>
                    :
                    <span className={s.titleTask} onDoubleClick={onDoubleClickHandler}>{title}</span>
            }
        </div>
    );
};

