import React from 'react';
import '../../scss/register-meter.scss';

const RegisterMeter = () => {
    const [numberOfMeter,setNumberOfMeter] = React.useState('1');
    const [fields , setFields] = React.useState('');
    const [meter,setMeter] = React.useState([]);

    React.useEffect(()=>{
        createNameField();
    },[numberOfMeter]);

    const createNameField=()=>{
        let input=[];
        for(let i=0;i<parseInt(numberOfMeter);i++){
            input.push(
               <div key={i} className="register-field-row">
                    <input type='text' placeholder="Meter Name"/> <input type='number'  placeholder="Meter %"/><span>%</span>
                </div>
            )
        }
       setFields(input);       
    }

    const handleChange = async(e)=>{
        await setNumberOfMeter(e.target.value);
    }

    return (
        <div className='register-meter-wrapper'>
            <div className='container'>
                <div className='register-meter'>
                    <div className='register-meter__title'>
                        <h1>Enter number of sub-meters</h1> 
                    </div>
                    <div className="register-meter__info">
                        <p>How many meters are used ?<br/> Register count and also the percentage shared if specific meter is shared between others members. Also specify meter name for easy identification. </p>
                    </div>
                    <div className='register-meter__collection'>
                        <input type="text" placeholder="Meter Collection Name" className="meter-collection-name"/>
                        <div className='register-meter__count'>
                            <input type='number' placeholder='Enter sub-meters count...'className='register-meter__meter-numbers' onChange={handleChange} />
                        </div>
                        <div className='register-meter__name-percent'>
                            {fields}
                        </div>
                        {numberOfMeter > 0 ?<button className=' save-btn'>Save</button>:null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterMeter;
