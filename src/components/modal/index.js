import React,{useState,useEffect} from 'react';
import './modal.scss';
import Backdrop from '../backdrop';



const Modal = ({showModal,toggleModal,allMeters,divisionCount,collection,totals}) => {

    const [meterCollection,setMeterCollection] = useState([]);
    const [userCollection,setUserCollection] = useState([]);
    const [fullUsedMeter,setFullUsedMeter] = useState([]);

    useEffect(()=>{
        setMeterCollection(allMeters);
        let userColl = [];
        for(let i=0;i<divisionCount;i++){
            userColl.push({ 
                        userName:`User-${i+1}`,
                        meterName:['select'],
                        percentage:['100'],
                        units:[0],
                        costs:[0],
                        totalUnits:0,
                        totalCosts:0
                    }
        ) }
        setUserCollection(userColl);
    },[allMeters,divisionCount]);

    const handleAddSubMeter=(index)=>{
        const dummyUserColl = [...userCollection];
        dummyUserColl[index].meterName.push('select');
        dummyUserColl[index].percentage.push('100');

        setUserCollection(dummyUserColl);

    }
    
    const handleUsernameChange=(e,userIndex)=>{
        const dummyUserColl = [...userCollection];
        dummyUserColl[userIndex].userName =e.target.value;
        setUserCollection(dummyUserColl);

    }

    const findMeter =(data)=>{
        const meter = meterCollection.filter((meter,index)=>{
            if(meter.meterName === data){
                return true;
            }
        })
        return meter;
    }

    const handleMeterChange=(e,userIndex,meterIndex)=>{
        const dummyUserColl = [...userCollection];
        dummyUserColl[userIndex].meterName[meterIndex] = e.target.value;
        const meter = findMeter(e.target.value);
        dummyUserColl[userIndex].units[meterIndex] = meter[0].units;
        dummyUserColl[userIndex].costs[meterIndex] = meter[0].cost;

        setUserCollection(dummyUserColl);
    }
    const handlePercentageChange=(e,userIndex,meterIndex)=>{
        const dummyUserColl = [...userCollection];
        dummyUserColl[userIndex].percentage[meterIndex] = e.target.value;
        if(parseFloat(e.target.value)<0){
        dummyUserColl[userIndex].percentage[meterIndex] ='1';
        }
        setUserCollection(dummyUserColl);
    }
    const handlePercentageBlur=(e,userIndex,meterIndex)=>{
        const dummyUserColl = [...userCollection];
        if(e.target.value<=''){
        dummyUserColl[userIndex].percentage[meterIndex] ='100';
        }
        setUserCollection(dummyUserColl);
    }
    const handleIndividualCalculation=()=>{
         const users = [...userCollection];

        users.forEach((user,index)=>{
                let tunits = 0;
                let tcosts = 0;

            user.percentage.map((percent,idx)=>{
               
                if(parseFloat(percent) < 100){
                    const unit =findMeter(user.meterName[idx])[0].units*(percent/100);
                    const cost =findMeter(user.meterName[idx])[0].cost*(percent/100); 

                    user.units[idx]=unit;
                    user.costs[idx]=cost;

                }else if(parseFloat(percent) > 100){
                    alert('Percentage Cannot be more than 100');
                }
                tunits += user.units[idx];
                tcosts += user.costs[idx];
            })
            user.totalUnits = tunits;
            user.totalCosts = tcosts;
        })
        setUserCollection(users)
    }

    return (
        <>
        {meterCollection !== ''?
        <>
        <div className={`modal ${showModal === true?'open-modal':''}`}>

            <div className=" container">
                <div className='modal-title'>
                    <h1>Divide Sub-Meter</h1>
                <span onClick={toggleModal}><p>X</p></span>
                </div>
                <div className='modal-body'>
                  <h1>Select Your Respective Meter</h1>

                {userCollection.map((user,idx)=>{

                    return(
                        <div key={`${user}-${idx}`} className='sub-meters-user'>
                        <input type='text' name='username' value={user.userName} placeholder='Username' onChange={(e)=>{handleUsernameChange(e,idx)}}/>
                        
                        {user.meterName.map((val,indx)=>{
                            return (
                                <div key={`${val}-${indx}`} 
                                className='meter-name-percentage'>
                                <select value={val}  onChange={(e)=>handleMeterChange(e,idx,indx)}>
                                        <option  value='Select'>-Select-</option>

                                    {meterCollection.map((value,index)=>{
                                        return(
                                            <option key={index} value={value.meterName}>{value.meterName}</option>
                                            )
                                        })}
                                </select>
                                <div><input type='number'  placeholder='%' value={user.percentage[indx]} onBlur={(e)=>handlePercentageBlur(e,idx,indx)} onChange={(e)=>handlePercentageChange(e,idx,indx)}/><span className='percentage'>%</span></div>
                            </div>
                            )
                        })}

                        <button className='add-submeter-btn' onClick={()=>handleAddSubMeter(idx) }>Add sub-meter</button>
                  </div>
                    )

                })}

                    <button className="calculate-division" onClick={handleIndividualCalculation}>Calculate</button>

                    <div className='division-result'>
                        <h1>Your's Respective Result of </h1>
                        <h2>{collection}</h2>
                        <div className='totals'>
                            <span className='total-units'>
                                Total Units : {totals.totalUnits} units
                            </span>
                            <span className='total-costs'>
                                Total Costs : Rs.{totals.totalCost}
                            </span>
                            <span className='total-costs'>
                                Unit Price : Rs.{totals.totalCost===0?'10': parseFloat(totals.totalCost)/parseFloat(totals.totalUnits)}
                            </span>

                        </div>
                        <div className='results-wrapper'>
                        {
                            userCollection.map((user,index)=>{
                                return(
                                    <div key={`${user}-${index}`} className='result'>
                                        <span className='username'>{user.userName}</span>
                                        <div  className='each-user-meter-calculation-row '>
                                            <span className="meter-name">Meter Name </span>
                                            <span className="meter-percentage">Percentage (%) </span>
                                            <span className="meter-units"> Units</span>
                                            <span className="meter-cost">Cost(Rs.)</span>
                                        </div>
                                      {user.meterName.map((value,idx)=>{
                                        return(
                                            <div key={`${idx}`} className='each-user-meter-calculation-row'>
                                                <span className="meter-name">{value}</span>
                                                <span className="meter-percentage">{user.percentage[idx]} %</span>
                                                <span className="meter-units"> {user.units[idx]}</span>
                                                <span className="meter-cost">{user.costs[idx]}</span>
                                            </div>
                                          )
                                      })}
                                       <div className='each-user-meter-calculation-row'>
                                                <span className="meter-name">Total</span>
                                                <span className="meter-percentage"> </span>
                                                <span className="meter-units"> 
                                                    {user.totalUnits}
                                                </span>
                                                <span className="meter-cost">
                                                    Rs.{user.totalCosts}
                                                </span>
                                            </div>
                                    </div>

                                )
                            })
                        }
                        </div>
                    </div>
                  
                </div>
                
            </div>
            
        </div>
        <Backdrop visibility={showModal}/>
        </>
        :null}
        </>
    );
}

export default Modal;
