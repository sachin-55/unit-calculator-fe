import React from 'react';
import Navbar from './Navbar';
import '../../scss/collection.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, Link } from 'react-router-dom';
import { setSubmeterSuccessFalse,loadSubmeterList, saveSubmeter, loadReadings, removeSubmeter, removeReadings} from '../../redux/actions/meterAction';
import {openCreateSubmeter, closeCreateSubmeter} from '../../redux/actions/UIActions';

import ReadingsModal  from '../submeterReadingsModal/ReadingsModal';
import DeleteModal from '../deleteModal/DeleteModal';
import Modal from '../modal';

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
    const [enableDeleteModal,setEnableDeleteModal] = React.useState(false);
    
    //for division of meters
    const [divideStatus,setDivideStatus] = React.useState(false);
    const [divisionCount, setDivisionCount] = React.useState(2);
    const [showDivisionModal,setShowDivisionModal] = React.useState(false);
    const [total,setTotal] = React.useState({});
    const [divisionData,setDivideData] = React.useState([]);

    const [submeterForReadings,setSubmeterForReadings] = React.useState({});
    const [arrangeReadings,setArrangeReadings] = React.useState({});
    const [filteredReadings,setFilteredReadings] = React.useState();
    const [selectedTitle,setSelectedTitle] = React.useState();
    const [calculationData,setCalculationData]=React.useState([]);
    const [unitPrice,setUnitPrice] = React.useState(10);
    const [enableCalculation,setEnableCalculation]=React.useState(false);
    const {state} = useLocation();
    const collection = state.collection;
    const [toggleView,setToggleView] = React.useState(false);

    const {createSubmeter} =  useSelector(state=>state.UI)
    
    const {loading:loadingSave,error:errorSave,success} = useSelector(state=>state.submeterSave);
    const {loading:loadingDelete,error:errorDelete,success:successDelete} = useSelector(state=>state.submeterRemove);

    const {loading:loadingDeleteRead,error:errorDeleteRead,success:successDeleteRead} = useSelector(state=>state.readingsRemove);


    const submetersList = useSelector(state=>state.submetersList);
    const {submeterList,loading,error,success:loadSuccess} = submetersList;


    const readingsList = useSelector(state=>state.readingsList);
    const {readingList,loading:readingLoading,error:readingError,success:readingSuccess} = readingsList;
    
    const {success:successReadingSave} = useSelector(state=>state.readingsSave)
     

    const dispatch = useDispatch();
    const {collectionId} = useParams();

    React.useEffect(()=>{
        dispatch(loadSubmeterList(collectionId));
    },[success,successDelete]);

    React.useEffect(()=>{
        dispatch(loadReadings());
        // setEnableCalculation(true);
    },[loadSuccess,successReadingSave,successDeleteRead]);

    React.useEffect(()=>{
    if(submeterList && readingList){
        const submeterId = submeterList.map((x)=>x._id);

        // let normalizedList={};

        filterReadings(submeterId[0]);
        
        let tempData = [];
        submeterList.forEach(element => {
            tempData.push({
                id:element._id,
                name:element.name,
                previous: 0,
                current: 0,
                units:0,
                cost:0
            });
        });
        setCalculationData(tempData);
    }
    setEnableCalculation(true);
    },[readingSuccess]);


    const filterSubmeterName = (id)=>{
        return submeterList.filter(m=>m._id === id)[0].name;
}

    const filterReadings= (submeterId)=>{
        if(readingList.length > 0 && submeterList.length > 0){
        const data = readingList.filter(reading=>{
                if (reading.length !== 0) {
                    
            if(reading[0].submeter._id === submeterId)
            {return true;} 
        }

            return false
            });



        const title= filterSubmeterName(submeterId);
        console.log(title);
        
        setSelectedTitle(title);
        setFilteredReadings(data[0]);
        }
    }


    const addFields = ()=>{
        setMeterNumber((meterNumber)=>meterNumber+1);
        
        setMeter([...meter,{ meterName:`meter-${meterNumber+1}`,
                                previous:'',
                                current:'',
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
                // setEnableCalculation(false);
       }
    
    const submeterReadingsHandler=(id,name)=>{

        setSubmeterForReadings({
            id,
            name,
            collectionName:collection.name
        });
        setEnableReadingsModal(true);
        
    }
    const handleCalculationChange=(event,submeterId,date)=>{
        const tempData = [...calculationData];
       const idx = tempData.findIndex((el)=>el.id===submeterId);
       if(date === 'from'){
        tempData[idx].previous=event.target.value;
       }
       else if(date === 'to'){
        tempData[idx].current=event.target.value;
       }
        setCalculationData(tempData);       
    }
    const handleCalculation=()=>{
        const tempData = [...calculationData];
        if(unitPrice <=0){
            return alert('Invalid Unit Price !!');
        }
        tempData.map(t=>{
            
            if(t.previous == '' || t.current == ''){
                
               return alert(`Duration is not selected in ${t.name}`);
            }
            else if(t.current < t.previous){
             return   alert(`Previous reading is greater than recent reading in ${t.name}`);
            }
            t.units = t.current-t.previous;
            t.cost=t.units*unitPrice;
        });

        setCalculationData(tempData);
    }

    const handleRemoveSubmeters=(submeterId,name)=>{
        dispatch(setSubmeterSuccessFalse());
        setSubmeterForReadings({
            id:submeterId,
            name,
            collectionName:collection.name
        });
       setEnableDeleteModal(true);
    }
    const handleReadingsDeletion = (id,name)=>{
        if(confirm(`Are you ok with removing reading of ${name}`)){
            dispatch(removeReadings(id));
        }
    }


    const handleCheckBox =(e)=>{
        if(e.target.checked){
            setDivideStatus(true);
        }else{
            setDivideStatus(false);
        }
    }

    const toggleDivisionModal=()=>{
        setShowDivisionModal((showDivisionModal)=>  showDivisionModal === true? false:true);
        const t={
            totalCost:calculationData.reduce((a,c)=>(a+c.cost),0) ,
            totalUnits:calculationData.reduce((a,c)=>(a+c.units),0)
        }
        setTotal(t);
        const refactoredData = calculationData.map(data=>{
            return(
                {
                    meterName:data.name,
                    units:data.units,
                    cost:data.cost,
                    previous:data.previous,
                    current:data.current

                }
            )
        });
         
        setDivideData(refactoredData);

    }


    return (
        <>
            <Navbar/>
            { collection && <div className='collectionDetailWrapper'>
               {enableReadingsModal && <ReadingsModal submeter={submeterForReadings} enableModal={enableReadingsModal}  closeModal={()=>setEnableReadingsModal(false)}/>}
               {enableDeleteModal && <DeleteModal type='submeter' data={submeterForReadings} enableModal={enableDeleteModal}  closeModal={()=>setEnableDeleteModal(false)}/>}
            
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
                       {submeterList && <div className='numberOfList'>Number of submeters : {submeterList.length}</div>}
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
                    {submeterList <= 0 && <div className='not-registered'>Register New Submeter for further calculation </div>}
                {submeterList && readingSuccess && submeterList.length > 0 && <>

                    <div className='submeterListContainer'>
                        <div className='info'>Info: Click on the submeter name to register its reading data</div>
                        <ul>
                            <li>Submeter Collection lists</li>
                       {submeterList && <div className='numberOfList'>Number of submeters : {submeterList.length}</div>}
                           
                                    {(submeterList && submeterList.map(submeter => (
                                            <li key={submeter._id} className='submeterItem' >
                                                <div onClick={()=>{submeterReadingsHandler(submeter._id,submeter.name)}}>{submeter.name}</div>
                                                <span onClick={()=>{handleRemoveSubmeters(submeter._id,submeter.name)}}>X</span>
                                            </li>
                                        ))) || <li className='loading'>Loading... Please wait !!!</li> }
                        </ul>
                    </div>
                    {readingSuccess && calculationData.length > 0 && readingList && <div className='viewReadings'>
                        <div className='click-here' onClick={()=>{setToggleView(state=>state===false?true:false)}}>Click here to see/delete readings of Submeter</div>
                        <div className={`submeterListView ${toggleView ===true?'roll':''}`}>
                        
                            <div className='submeter-readings'>
                            <div className='submeterNames'>
                                {submeterList.map(value=>{
                                    return(<div key={value._id} className='text' onClick={()=>{filterReadings(value._id)}}>
                                        {value.name}
                                    </div>)
                                })}
                            </div>
                            <div className='submeterReadings'>
                                <h1 className='submeterNameTitle'>{selectedTitle}</h1>
                                <div className='yearMonthWrapper' >
                                        <div className='date title'>Readings for</div>
                                        <div  className='readings title'>Readings</div>
                                        <div  className='readings title'>Delete</div>

                                </div>
                                {filteredReadings===undefined && <div>No Readings</div>}
                                {filteredReadings && filteredReadings.map((reading)=> (
                                     <div className='yearMonthWrapper'  key={reading._id}>
                                     <div className='date '>{reading.readingsYear}-{reading.readingsMonth}</div>
                                     <div  className='readings '>{reading.readings}</div>
                                     <div  className='delete' onClick={()=>{handleReadingsDeletion(reading._id,`${reading.readingsYear}-${reading.readingsMonth}`)}}>x</div>

                                </div>))}
                              
                            </div>
                            </div>
                        </div>
                    </div>}
                
                    <div className='calculationOfCostAndUnits'>
                        <h1>Calculation</h1>
                        <div className='calculationTable title'>
                            <div className='submeterName'> Submeter Name</div>
                            <div className='from-to'>
                            <div className='submeterFrom'>
                                <select>
                                    <option value=''>From</option>
                                </select>
                            </div>
                            <div>-</div>
                            <div className='submeterTo'>
                            <select>
                                <option value=''>To</option>
                            </select>
                            </div>
                            </div>
                        </div>
                        {enableCalculation  &&readingList && readingList.map((data,index)=>(
                        <div key={data.id} className='calculationTable'>
                            <div className='submeterName'> {submeterList[index].name}</div>
                            <div className='from-to'>
                            <div className='submeterFrom'>
                                <select 
                                    onChange={(e)=>{handleCalculationChange(e,data[0].submeter._id,'from')}}
                                >
                                    <option value=''>From</option>
                                    {data.map((readingData)=>{
                                        return(
                                            <option key={`${readingData.readingsYear}-${readingData.readingsMonth}`}
                                                    value={readingData.readings}>
                                                {`${readingData.readingsYear}-${readingData.readingsMonth}`}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div>-</div>
                            <div className='submeterTo'>
                            <select 
                                    onChange={(e)=>{handleCalculationChange(e,data[0].submeter._id,'to')}}
                            >
                                <option value=''>To</option>
                                    {data.map((readingData)=>{
                                        return(
                                            <option key={`${readingData.readingsYear}-${readingData.readingsMonth}`}
                                                    value={readingData.readings}>
                                                {`${readingData.readingsYear}-${readingData.readingsMonth}`}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            </div>
                        </div>))}
                        <div className='unit-wrapper'>
                          <span>Unit price :</span>Rs. <input type='number' value={unitPrice} onChange={(e)=>{setUnitPrice(e.target.value)}} />
                        </div>  
                        <div className='btn-wrapper'>
                            <button className='add-submeter-btn calculate-btn' onClick={handleCalculation}>Calculate</button>
                        </div>
                        <div className='result'>
                            <div className='rowWrapper'>
                                <div>Name</div>
                                <div>Previous</div>
                                <div>Current</div>
                                <div>Units</div>
                                <div>Cost(Rs.)</div>
                            </div>
                            {calculationData.map((data)=>{
                             return   <div className='rowWrapper' key={data.id}>
                                    <div>{data.name}</div>
                                    <div>{data.previous}</div>
                                    <div>{data.current}</div>
                                    <div>{data.units}</div>
                                    <div>{data.cost}</div>
                                </div>
                            })}
                            <div className='rowWrapper'>
                                <div>Total</div>
                                <div></div>
                                <div></div>
                                <div>{calculationData.reduce((a,c)=>(a+c.units),0)}</div>
                                <div>{calculationData.reduce((a,c)=>(a+c.cost),0)}</div>
                            </div>
                        </div>
                    </div>






                    <div className='divide-status-checkbox'>
                 <h1>Divide sub-meters</h1>
                 <p>If you have to divide above calculation click on below button</p>
                    <label htmlFor='checkbox-divide' className='checkbox-divide'>
                        <input type='checkbox' id='checkbox-divide' className='checkbox-input' onChange={handleCheckBox}/>
                        <span className='checkbox-box'></span>
                    </label>
                    {divideStatus === true ? <div className="divided-meter-calculation">
                <h1>Cost of Each of You</h1>
                <div className='number-of-user'>
                <span>
                        Number of User's: 
                    </span> 
                    <input type='number' placeholder="No. of user's" value={divisionCount}  onChange={(e)=>setDivisionCount(e.target.value)}/>
                </div>
                <button className='save-btn' disabled={divisionCount < 2?true:false} onClick={toggleDivisionModal}>Divide</button>

                </div>
            :null}
             </div>
           
             {divisionCount > 1 ? 
                <Modal  
                    showModal = {showDivisionModal} 
                    toggleModal={toggleDivisionModal} 
                    allMeters={divisionData}
                    divisionCount = {divisionCount} 
                    collection= {collection.name} 
                    totals={{...total}}
                />
             :null}




























            </>}
                </div>

            </div>}
        </>
    );
}

export default Collection;
