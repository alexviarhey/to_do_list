import React, {useState} from 'react';
import './App.css'
import {ITodolist} from "./types/common-types";
import TodoList from './components/TodoList';
import AddNewItemForm from './components/AddNewItemForm';
import { connect } from 'react-redux';
import {addTodolist} from "./redux/todolist-reducer";
import {AppStateType} from "./redux/redux-store";
import Header from './components/Header';





interface IMapStateProps {
    todolists: Array<ITodolist>
}

interface IMapDispatchProps {
    addTodo: (newTodolist: ITodolist) => void
}

type AppProps = IMapStateProps & IMapDispatchProps



const App = (props: AppProps) => {

    const [nextTodoListId, setNextTodolistId] = useState(0);


    const addTodoList = (title: string): void => {
        let newTodoList: ITodolist = {id: nextTodoListId, title, tasks: []};
        setNextTodolistId(nextTodoListId + 1);
        props.addTodo(newTodoList)
    };

    const todolists = props.todolists.map(tl => <TodoList key={tl.id} title={tl.title} id={tl.id} tasks={tl.tasks} />);

    return (
        <div className='App'>
            <Header />
            <div className='listWrapper'>
                <div className='materialForm'>
                    <AddNewItemForm addItem={addTodoList} />
                </div>
                <div className='todolistsWrapper'>
                    {todolists}
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state: AppStateType): IMapStateProps => {
    return {
        todolists: state.todolists.todolists
    }
};

const mapDispatchToProps = (dispatch: any): IMapDispatchProps => {
    return {
        addTodo: (newTodolist) => dispatch(addTodolist(newTodolist))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(App)
