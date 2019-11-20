import {combineReducers, createStore} from "redux";
import {todolistReducer} from "./todolist-reducer";



const rootReducer = combineReducers({
    todolists: todolistReducer
});

export type AppStateType = ReturnType<typeof rootReducer>

let store = createStore(rootReducer);

export default store