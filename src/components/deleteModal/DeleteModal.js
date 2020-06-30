import React from 'react';
import './deletemodal.scss';
import Backdrop from '../backdrop';
import { useDispatch,useSelector } from 'react-redux';
import { removeSubmeter, removeCollection } from '../../redux/actions/meterAction';
const DeleteModal = (props) => {


        const {loading:loadingDelete,error:errorDelete,success:successDelete} = useSelector(state=>state.submeterRemove);
        const {loading:loadingDeleteColl,error:errorDeleteColl,success:successDeleteColl} = useSelector(state=>state.collectionRemove);
   if(props.type==='submeter'){

    React.useEffect(()=>{
            if(successDelete){
                props.closeModal();
            }
        },[successDelete]);
    }
    else{
        React.useEffect(()=>{
            if(successDeleteColl){
                props.closeModal();
            }
        },[successDeleteColl]);
    }
    const dispatch = useDispatch();
    const handleDelete=()=>{
        if(props.type==='submeter'){
            dispatch(removeSubmeter(props.data.id));
        }else{
            dispatch(removeCollection(props.data.id));
        }
    }
    return (
        <>
        <div className='deletemodal'>
            <div className='delete-header'>
                Delete {props.data.name} {props.type==='submeter'?'submeter':'collection'}
            </div>
            <div className='delete-info'>
    Are you sure you want to delete {props.type==='submeter'?'submeter':'collection'} {props.data.name}{props.type==='submeter'?`from ${props.data.collectionName}`:''}?<br/>
                Once deleted data cannot be restored.
            </div>
            <div className='delete-buttons'>
                <button className='cancelbtn' onClick={props.closeModal}>Cancel</button>
                <button className='deletebtn' onClick={handleDelete}>{loadingDelete || loadingDeleteColl ? 'Loading...':'Delete'}</button>

            </div>
        </div>
            <Backdrop visibility={props.enableModal}/>
        </>
    );
}

export default DeleteModal;
