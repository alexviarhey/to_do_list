import {
    IAddTodolistAction,
    IDeleteTodolistAction,
    ITodolist,
    IAddTaskAction,
    ITask, IChangeTaskAction, IChangedTask, IDeleteTaskAction, TodolistReducerActionTypes
} from "../types/common-types";

export const ADD_TODOLIST = 'ADD_TODOLIST';
export const ADD_TASK = 'ADD_TASK';
export const CHANGE_TASK = 'CHANGE_TASK';
export const DELETE_TODOLIST = 'DELETE_TODOLIST';
export const DELETE_TASK = 'DELETE_TASK';


interface IInitialState {
    todolists: Array<ITodolist>
    nextTaskId: number
}

let initialState: IInitialState = {
    todolists: [],
    nextTaskId: 0
};

export const todolistReducer = (state = initialState, action: TodolistReducerActionTypes) => {
    switch (action.type) {
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [...state.todolists, action.newTodolist]
            };
        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: [...tl.tasks, action.newTask]}
                    } else {
                        return tl
                    }
                })
            };
        case CHANGE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id !== action.todolistId) {
                        return tl
                    } else {
                        return {
                            ...tl, tasks: tl.tasks.map(t => {
                                if (t.id !== action.taskId) {
                                    return t
                                } else {
                                    return {...t, ...action.newObj}
                                }
                            })
                        }
                    }
                })
            };
        case DELETE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(tl => tl.id !== action.todolistId)
            };
        case DELETE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id !== action.todolistId) {
                        return tl
                    } else {
                        return {
                            ...tl,
                            tasks: tl.tasks.filter(t => t.id !== action.taskId)
                        }
                    }
                })
            };
        default:
            return state
    }
};


export const addTodolist = (newTodolist: ITodolist): IAddTodolistAction => {
    return {type: ADD_TODOLIST, newTodolist}
};

export const deleteTodolist = (todolistId: number): IDeleteTodolistAction => {
    return {type: DELETE_TODOLIST, todolistId}
};

export const addTask = (todolistId: number, newTask: ITask): IAddTaskAction => {
    return {type: ADD_TASK, todolistId, newTask}
};

export const changeTask = (todolistId: number, taskId: number, newObj: IChangedTask): IChangeTaskAction => {
    return {type: CHANGE_TASK, todolistId, taskId, newObj}
};

export const deleteTask = (todolistId: number, taskId: number): IDeleteTaskAction => {
    return {type: DELETE_TASK, todolistId, taskId}
};

