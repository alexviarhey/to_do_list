import React from 'react'
import '../App.css'
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';



interface IProps {
    title: string
    id: number
    deleteTodolist: (todolistId: number) => void
}

const TodoListTitle = (props: IProps) => {
    return (
        <div className='titleWrapper'>
            <div className="todoList-header__title">{props.title}</div>
            <div>
                <IconButton aria-label="delete" onClick={() => {props.deleteTodolist(props.id)}} >
                    <DeleteIcon  />
                </IconButton>
            </div>

            {/*<button onClick={() => {props.deleteTodolist(props.id)}}>X</button>*/}
        </div>
    )
};


export default TodoListTitle