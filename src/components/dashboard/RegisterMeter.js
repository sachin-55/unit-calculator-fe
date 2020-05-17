import React from 'react';
import '../../scss/register-meter.scss';

const meterInitial={
        meterName:'',
        percentage:'100'
    }

const RegisterMeter = () => {
    const [meter,setMeter] = React.useState([{...meterInitial}]);

    const addFields = ()=>{
        setMeter([...meter,{ ...meterInitial}]);
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
                        <div className='example'>
                            <button>For Example</button>
                            <div className='example-picture'>

                            </div>

                        </div>
                    </div>
                    <div className='register-meter__collection'>
                        <input type="text" placeholder="Meter Collection Name" className="meter-collection-name"/>
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
                                        <input 
                                            type='number' 
                                            name={percentageId} 
                                            data-id={idx} 
                                            className='percentage' 
                                            placeholder="Meter %"
                                            value={meter[idx].percentage || ''}
                                            onChange={handleDynamicChange}
                                        /><span>%</span>
                                        <span className='delete-meter' data-id ={idx} onClick={removeField}>X</span>
                                    </div>
                                )

                            })}
                        </div>
                       <button className=' save-btn' onClick={handleSave}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterMeter;
