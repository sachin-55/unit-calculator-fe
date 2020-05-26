import React from 'react';
import '../../scss/register-meter.scss';
import MeterReadingsAndCalculation from './MeterReadingsAndCalculation';



const RegisterMeter = () => {
    const [meterNumber,setMeterNumber] = React.useState(1);
    const [meterCollectionName,setMeterCollectionName] = React.useState('');

    const meterInitial={
        meterName:`meter-${meterNumber}`,
       previous:0,
       current:0,
       units:0,
       cost:0
    }

    const [meter,setMeter] = React.useState([{...meterInitial}]);

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

    const handleSave=()=>{
        console.log('save');
        console.log(meterCollectionName);
        console.log(meter);
        
    }

    return (
        <div className='register-meter-wrapper'>
            <div className='container'>
                <div className='register-meter'>
                    <div className='register-meter__title'>
                        <h1>Enter number of sub-meters</h1> 
                    </div>
                    <div className="register-meter__info">
                        <p>How many meters are used ?<br/> Register required number of sub-meter and also the percentage shared if specific meter is shared between others members. Also specify meter name for easy identification. </p>
                        {/* <div className='example'>
                            <button>For Example</button>
                            <div className='example-picture'>

                            </div>

                        </div> */}
                    </div>
                    <div className='register-meter__collection'>
                        <input type="text" placeholder="Meter Collection Name" onChange={(e)=>{setMeterCollectionName(e.target.value)}} className="meter-collection-name"/>
                        <div className='register-meter__count'>
                            <button className='register-meter-btn' onClick={addFields} >Add new Sub-meter</button>
                        </div>
                        <div className='register-meter__name-percent'>
                            {meter.map((val,idx)=>{
                                const meterId = `meter-${idx}`;
                                const percentageId = `percentage-${idx}`;
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
                                        {/* <input 
                                            type='number' 
                                            name={percentageId} 
                                            data-id={idx} 
                                            className='percentage' 
                                            placeholder="Meter %"
                                            value={meter[idx].percentage || ''}
                                            onChange={handleDynamicChange}
                                        /><span>%</span> */}
                                        <span className='delete-meter' data-id ={idx} onClick={removeField}>X</span>
                                    </div>
                                )

                            })}
                        </div>
                       <button className=' save-btn' onClick={handleSave}>Submit</button>
                    </div>
                </div>
                <MeterReadingsAndCalculation meterCollectionName={meterCollectionName} meters={meter} updatedMeter={setMeter}/>
            </div>
        </div>
    );
}

export default RegisterMeter;
