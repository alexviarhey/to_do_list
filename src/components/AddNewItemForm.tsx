import React, {useState} from 'react';
import '../App.css'
import TextField from "@material-ui/core/TextField";
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


interface IProps {
    addItem: (newText: string) => void
}

const AddNewItemForm = (props: IProps) => {

    const [isEmpty, setIsEmpty] = useState(false);
    const [title, setTitle] = useState('');

    const onAddItemClick = (): void => {
        let newText = title;
        if (newText.trim() === '') {
            setIsEmpty(true)
        } else {
            props.addItem(newText);
            setTitle('')
        }
    };



    const onAddItemEnter = (e: React.KeyboardEvent): void => {
        if (e.key === 'Enter') {
            onAddItemClick()
        }
    };


    //React.ChangeEvent<HTMLInputElement>
    const addNewTitle = (e: any): void => {
        const newTitle = e.currentTarget.value;
        setIsEmpty(false);
        setTitle(newTitle)
    };



        let classForHeader = isEmpty ? 'error' : '';
        return (
            <div className="todoList-header">
                <div className='headerMaterial'>
                    <div className="todoList-newTaskForm">
                        <TextField
                            label="new task name"
                            variant="outlined"
                            onKeyPress={(e) => onAddItemEnter(e)}
                            onChange={(e) => addNewTitle(e)}
                            value={title}
                            className={classForHeader}
                        />
                    </div>

                                        {/*<input  onKeyPress={(e) => onAddItemEnter(e)} onChange={(e) => addNewTitle(e)} className={classForHeader}
                            value={title}   type="text" placeholder="New task name"/>*/}
                    <Fab color="primary" aria-label="add"  onClick={() => onAddItemClick()}>
                        <AddIcon />
                    </Fab>
                    {/*<button onClick={() => onAddItemClick()}>Add</button>*/}
                </div>
            </div>
        )
    };


export default AddNewItemForm;