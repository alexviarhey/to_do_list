import React, {useState} from 'react'
import '../App.css'
import Button from '@material-ui/core/Button';


interface IProps {
    filterValue: string
    onChangeFilterValue: (newFilterValue: string) => void
}

const TodoListFooter = (props: IProps) => {

    const [isHidden, setHidden] = useState(false);

    const onHidden = ():void => {
        setHidden(true)
    };

    const onShow = (): void => {
        setHidden(false)
    };

    let classForAll = props.filterValue === 'All' ? 'filter' : ' ';
    let classForCompleted = props.filterValue === 'Completed' ? 'filter' : ' ';
    let classForActive = props.filterValue === 'Active' ? 'filter' : ' ';

    return (
        <div >
            {!isHidden && <div className='footer'>
                <Button onClick={() => props.onChangeFilterValue('All') } className={classForAll} variant="contained" color="primary">
                    All
                </Button>
                <Button onClick={() => props.onChangeFilterValue('Completed') } className={classForCompleted} variant="contained" color="primary">
                    Completed
                </Button>
                <Button onClick={() => props.onChangeFilterValue('Active') } className={classForActive} variant="contained" color="primary">
                    Active
                </Button>

                {/*<button onClick={() => props.onChangeFilterValue('All') } className={classForAll}>All</button>
                <button onClick={() => props.onChangeFilterValue('Completed') } className={classForCompleted}>Completed</button>
                <button onClick={() => props.onChangeFilterValue('Active') } className={classForActive}>Active</button>*/}
            </div>
            }
            {!isHidden &&  <div className='hide_show'><Button color="primary" onClick={() => onHidden()}>Hide</Button></div>}
            {isHidden && <div className='hide_show'><Button color="primary" onClick={() => onShow()}>Show</Button></div>}
        </div>
    )
};
{/*<div className='hide_show' onClick={() => onHidden()}>hide</div>*/}


export default TodoListFooter