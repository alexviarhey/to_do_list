import React, {useState} from 'react'
import '../App.css'
import { connect } from 'react-redux';
import {deleteTask} from "../redux/todolist-reducer";
import {ITask} from "../types/common-types";
import {Checkbox, IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';



interface IProps {
    id: number
    changeNewTitleText: (taskId: number, title: string) => void
    changeStatus: (taskId: number, isDone: boolean) => void,
    task: ITask

}

interface IMapDispatchProps {
    deleteTask: (todolistId: number, taskId: number) => void
}

type TodoListTaskProps = IProps & IMapDispatchProps

const TodoListTask = (props: TodoListTaskProps) => {

    const [editMode, setEditMode] = useState(false);

    const onIsDoneChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
        props.changeStatus(props.task.id, e.currentTarget.checked)
    };

    const activateEditMode = (): void => {
        setEditMode(true)
    };

    const deactivateEditMode = (): void => {
        setEditMode(false)
    };

    const addNewTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
        props.changeNewTitleText(props.task.id, e.currentTarget.value)
    };

    let classForTask = (!props.task.isDone)? "todoList-task" : 'todoList-task done';

    return (
        <div  className={classForTask}>
            <Checkbox
                checked={props.task.isDone}
                onChange={onIsDoneChanged}
                color="primary"
                inputProps={{
                    'aria-label': 'secondary checkbox',
                }}
            />
            {(editMode)
                ? <input onChange={(e) => addNewTitle(e) } onBlur={deactivateEditMode} autoFocus={true} type="text" value={props.task.title}/>
                :  <span onClick={activateEditMode}>{props.task.id} -{props.task.title}, {props.task.priority}</span>
            }
            <IconButton aria-label="delete"  onClick={() => props.deleteTask(props.id, props.task.id)}>
                <DeleteIcon fontSize="small" />
            </IconButton>
            {/*<button onClick={() => props.deleteTask(props.id, props.task.id)} className='task_btn'>X</button>*/}

        </div>
    )
};

const mapDispatchToProps = (dispatch: any): IMapDispatchProps => {
    return {
        deleteTask: (todolistId, taskId) => dispatch(deleteTask(todolistId, taskId))
    }
};


export default connect(null, mapDispatchToProps)(TodoListTask)