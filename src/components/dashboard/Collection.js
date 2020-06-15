import React from 'react';
import Navbar from './Navbar';
import '../../scss/collection.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, Link } from 'react-router-dom';
import { loadSubmeterList, saveSubmeter} from '../../redux/actions/meterAction';
import {openCreateSubmeter, closeCreateSubmeter} from '../../redux/actions/UIActions';
const Collection = () => {
    const [meterNumber,setMeterNumber] = React.useState(1);
    const meterInitial={
        meterName:`meter-${meterNumber}`,
       previous:0,
       current:0,
       units:0,
       cost:0
    }
    const [meter,setMeter] = React.useState([{...meterInitial}]);
    
    const {state} = useLocation();
    const collection = state.collection;

    const {createSubmeter} =  useSelector(state=>state.UI)
    
    const {loading:loadingSave,error:errorSave,success} = useSelector(state=>state.submeterSave);

    const submetersList = useSelector(state=>state.submetersList);
    const {submeterList,loading,error} = submetersList;

    const dispatch = useDispatch();
    

    const {collectionId} = useParams();

React.useEffect(()=>{
    
    dispatch(loadSubmeterList(collectionId));
    
},[success]);



    const addFields = ()=>{
        setMeterNumber((meterNumber)=>meterNumber+1);
        
        setMeter([...meter,{ meterName:`meter-${meterNumber+1}`,
                                previous:0,
                                current:0,
                                units:0,
                                cost:0 }
                            ]);
    }
    const removeField = (e)=>{
        const updatedMeter = [...meter];
        updatedMeter.splice(e.target.dataset.id,1);
        setMeter(updatedMeter);
    }
    const handleDynamicChange = (e)=>{
        const updatedMeter = [...meter];
        updatedMeter[e.target.dataset.id][e.target.className] = e.target.value;
        setMeter(updatedMeter);
    }

    
    const handleSaveCollection=()=>{
        const dubs = submeterList.find(i=>i.name === meter[0].meterName)
        if(dubs){
            alert(`${meter[0].meterName} name already exists` );
            return;
        }
        dispatch(saveSubmeter(collectionId,meter));
                setMeter([{...meterInitial}]);
       }

    return (
        <>
            <Navbar/>
            {collection && <div className='collectionDetailWrapper'>
            <div className='container'>
                 <div className='collectionNameHeader'>
                    <h1>{collection.name} </h1>
                    <h2>Submeters</h2>
                </div>
                <div className='addNewSubmeter'>
                    <button className='add-submeter-btn' onClick={()=>dispatch(openCreateSubmeter())}>
                        Add New Submeter
                    </button>
                </div>
           { createSubmeter && <div className='register-submeter'>
                
                    <div className='register-submeter__title'>
                        <h1>Register New Submeter</h1> 
                        {loadingSave && <span>Loading ...</span>}
                        {errorSave}
                    </div>
                  
                    <div className='register-submeter__collection'>

                        <div className='register-submeter__name'>
                            {meter.map((val,idx)=>{
                                const meterId = `meter-${idx}`;
                                return(
                                    <div key={idx} className="register-field-row">
                                        <input 
                                            type='text' 
                                            name={meterId} 
                                            data-id={idx} 
                                            className='meterName' 
                                            placeholder="Meter Name"
                                            value={meter[idx].meterName || ''} 
                                            onChange={handleDynamicChange}
                                        /> 
                                      
                                        {/* <span className='delete-meter' data-id ={idx} onClick={removeField}>X</span> */}
                                    </div>
                                )

                            })}
                        </div>
                    </div>
                    {/* <button className='add-submeter-btn' onClick={addFields} > +1 Sub-meter</button> */}

                    <div>
                    <button disabled={meter.length <=0?true:false} onClick={handleSaveCollection} className='save-btn submeterSaveBtn'>
                        Save
                    </button>
                    <button onClick={()=>dispatch(closeCreateSubmeter())} className='save-btn submeterSaveBtn'>
                        Cancel
                    </button>
                    </div>
                   
                    </div>} 

                    <div className='submeterListContainer'>
                        <ul>
                            <li>Submeter Collection lists</li>
                                    {submeterList && submeterList.map(submeter => (
                                            <li key={submeter._id} className='submeterItem'>
                                                <Link to={`/submeter/${submeter._id}`}> <div>{submeter.name}</div></Link>
                                                <span>X</span>
                                            </li>
                                        ))} 
                        </ul>
                    </div>


                </div>
            </div>}
        </>
    );
}

export default Collection;
