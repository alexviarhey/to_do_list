import React, {useState} from 'react';
import '../App.css';
import {IChangedTask, ITask} from "../types/common-types";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import {addTask, changeTask, deleteTodolist} from "../redux/todolist-reducer";
import { connect } from 'react-redux';
import {Dispatch} from "redux";



interface IProps {
    tasks: Array<ITask>
    id: number
    title: string
}


interface IMapDispatchProps {
    addTask: (todolistId: number, newTask: ITask) => void
    changeTask: (todolistId: number, taskId: number, newObj: IChangedTask) => void
    deleteTodo: (todolistId: number) => void
}

type TodoListProps = IProps & IMapDispatchProps



const TodoList = (props: TodoListProps) => {

    const [filterValue, setFilterValue] = useState('');
    const [nextTaskId, setNextTaskId] = useState(0);

    const onChangeFilterValue = (newFilterValue: string): void => {
        setFilterValue(newFilterValue)
    };

    const addTask = (newText: string): void => {
        let newTask = {
            id: nextTaskId,
            title: newText,
            isDone: false,
            priority: 'priority-high'
        };
        setNextTaskId(nextTaskId + 1);
        props.addTask(props.id, newTask)
    };


    const changeTask = (taskId: number, newObj: IChangedTask): void => {
        props.changeTask(props.id, taskId, newObj)
    };

    const changeStatus = (taskId: number, isDone: boolean): void => {
        changeTask(taskId, {isDone})
    };

    const changeNewTitleText = (taskId: number, title: string): void => {
        changeTask(taskId, {title})
    };

    return (
        <div className='todolist'>
            <div className='todolist-header'>
                <TodoListTitle id={props.id} deleteTodolist={props.deleteTodo} title={props.title}/>
                <AddNewItemForm addItem={addTask} />
            </div>
            <TodoListTasks id={props.id}
                           changeNewTitleText={changeNewTitleText}
                           changeStatus={changeStatus}
                           tasks={props.tasks.filter((t) => {
                               switch (filterValue) {
                                   case "Completed":
                                       return t.isDone;
                                   case "Active":
                                       return !t.isDone;
                                   default:
                                       return t
                               }
                           })} />
            <TodoListFooter onChangeFilterValue={onChangeFilterValue}
                            filterValue={filterValue} />
        </div>
    )
};


const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchProps => {
    return {
        addTask: (todolistId, newTask) => dispatch(addTask(todolistId, newTask)),
        changeTask: (todolistId, taskId, newObj) => dispatch(changeTask(todolistId, taskId, newObj)),
        deleteTodo: (todolistId) => dispatch(deleteTodolist(todolistId)),

    }
};



export default connect(null, mapDispatchToProps)(TodoList)