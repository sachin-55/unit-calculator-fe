import React from 'react';
import Navbar from './Navbar';
import '../../scss/collection.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, Link } from 'react-router-dom';
import { loadSubmeterList, saveSubmeter, loadReadings} from '../../redux/actions/meterAction';
import {openCreateSubmeter, closeCreateSubmeter} from '../../redux/actions/UIActions';

import ReadingsModal  from '../submeterReadingsModal/ReadingsModal';
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
    const [enableReadingsModal,setEnableReadingsModal] = React.useState(false);
    const [submeterForReadings,setSubmeterForReadings] = React.useState({});
    const [arrangeReadings,setArrangeReadings] = React.useState({});

    const {state} = useLocation();
    const collection = state.collection;
    const [toggleView,setToggleView] = React.useState(false);

    const {createSubmeter} =  useSelector(state=>state.UI)
    
    const {loading:loadingSave,error:errorSave,success} = useSelector(state=>state.submeterSave);

    const submetersList = useSelector(state=>state.submetersList);
    const {submeterList,loading,error,success:loadSuccess} = submetersList;

    const readingsList = useSelector(state=>state.readingsList);
    const {readingList,loading:readingLoading,error:readingError,success:readingSuccess} = readingsList;
     

    const dispatch = useDispatch();
    const {collectionId} = useParams();

    React.useEffect(()=>{
        dispatch(loadSubmeterList(collectionId));
    },[success]);

    React.useEffect(()=>{
        dispatch(loadReadings());
    },[loadSuccess]);

    React.useEffect(()=>{
    if(submeterList && readingList){
        const submeterId = submeterList.map((x)=>x._id);

        let normalizedList={};

        
    }
    
    },[readingSuccess]);

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
    
    const submeterReadingsHandler=(id,name)=>{
        setSubmeterForReadings({
            id,
            name,
            collectionName:collection.name
        });
        setEnableReadingsModal(true);
        
    }

    return (
        <>
            <Navbar/>
            {collection && <div className='collectionDetailWrapper'>
               {enableReadingsModal && <ReadingsModal submeter={submeterForReadings} enableModal={enableReadingsModal}  closeModal={()=>setEnableReadingsModal(false)}/>}
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
                           
                                    {(submeterList && submeterList.map(submeter => (
                                            <li key={submeter._id} className='submeterItem' onClick={()=>{submeterReadingsHandler(submeter._id,submeter.name)}}>
                                                <div >{submeter.name}</div>
                                                <span>X</span>
                                            </li>
                                        ))) || <li className='loading'>Loading... Please wait !!!</li> }
                        </ul>
                    </div>
                    {readingList && <div className='viewReadings'>
                        <div className='click-here' onClick={()=>{setToggleView(state=>state===false?true:false)}}>Click here to see readings of Submeter</div>
                        <div className={`submeterListView ${toggleView ===true?'roll':''}`}>
                            <div className='filterReadings'>
                                <input placeholder='Year' type='number'/>
                                <select >
												<option value='January'>January</option>
												<option value='Feburary'>Feburary</option>
												<option value='March'>March</option>
												<option value='April'>April</option>
												<option value='May'>May</option>
												<option value='June'>June</option>
												<option value='July'>July</option>
												<option value='August'>August</option>
												<option value='September'>September</option>
												<option value='October'>October</option>
												<option value='November'>November</option>
												<option value='December'>December</option>
											</select>
                                <span>To</span>
                                <input placeholder='Year' type='number'/>
                                <select >
												<option value='January'>January</option>
												<option value='Feburary'>Feburary</option>
												<option value='March'>March</option>
												<option value='April'>April</option>
												<option value='May'>May</option>
												<option value='June'>June</option>
												<option value='July'>July</option>
												<option value='August'>August</option>
												<option value='September'>September</option>
												<option value='October'>October</option>
												<option value='November'>November</option>
												<option value='December'>December</option>
											</select>
                                <button>Filter</button>

                            </div>
                            <div className='submeter-readings'>
                            <div className='submeterNames'>
                                {submeterList.map(value=>{
                                    return(<div key={value._id} >
                                        {value.name}
                                    </div>)
                                })}
                            </div>
                            <div className='submeterReadings'>
                                <h1 className='submeterNameTitle'>Title</h1>
                                <div className='yearMonthWrapper'>
                                    <div><span className='date'>Date</span>:January-2020</div>
                                    <div>
                                        <span  className='readings'>Reading</span>:123467890
                                    </div>
                                </div>
                                <div className='yearMonthWrapper'>
                                <div><span className='date'>Date</span>:January-2020</div>
                                    <div>
                                        <span  className='readings'>Reading</span>:123467890
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>}


                </div>
            </div>}
        </>
    );
}

export default Collection;
