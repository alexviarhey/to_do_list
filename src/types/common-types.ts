import {ADD_TASK, ADD_TODOLIST, CHANGE_TASK, DELETE_TASK, DELETE_TODOLIST} from "../redux/todolist-reducer";

export interface ITodolist {
    id: number
    title: string
    tasks: Array<ITask>
}

export interface ITask {
    id: number
    title: string
    isDone: boolean
    priority: string
}

export interface IChangedTask{
    title?: string
    isDone?: boolean
}


export interface IAddTodolistAction {
    newTodolist: ITodolist;
    type: typeof ADD_TODOLIST;
}

export interface IDeleteTodolistAction  {
    todolistId: number,
    type: typeof DELETE_TODOLIST;
}

export interface IAddTaskAction {
    todolistId: number
    newTask: ITask
    type: typeof ADD_TASK;
}

export interface IChangeTaskAction {
    todolistId: number
    taskId: number
    newObj: IChangedTask
    type: typeof CHANGE_TASK;
}

export interface IDeleteTaskAction {
    todolistId: number
    taskId: number
    type: typeof DELETE_TASK
}


export type TodolistReducerActionTypes = IAddTodolistAction | IDeleteTodolistAction | IAddTaskAction | IChangeTaskAction
    | IDeleteTaskAction

