import React from 'react'
import TodoListTask from "./TodoListTask";
import {ITask} from "../types/common-types";


interface IProps {
    tasks: Array<ITask>
    id: number
    changeNewTitleText: (taskId: number, title: string) => void
    changeStatus: (taskId: number, isDone: boolean) => void
}

const TodoListTasks = (props: IProps) => {

    const taskElement = props.tasks.map(t => <TodoListTask id={props.id} changeNewTitleText={props.changeNewTitleText}
     changeStatus={props.changeStatus} task={t} key={t.id}/>);
    return (
        <div>
            {taskElement}
        </div>
    )
};


export default TodoListTasks