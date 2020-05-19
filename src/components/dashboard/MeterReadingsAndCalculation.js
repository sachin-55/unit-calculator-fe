import React from 'react';
import '../../scss/meter-readings-and-calc.scss';

const MeterReadingsAndCalculation = ({meters}) => {
    const [subMeters,setSubMeters] = React.useState('');

  
    return (
        <div className='meter-readings-and-calculation'>
             <div className="meter-readings">
                 <h1>Meter Readings</h1>
                 <p>Enter respective previous month and current month sub-meter reading</p>
                 {meters !==''? 
                 <table>
                     <thead>
                     <tr>
                         <th>
                             Meter
                         </th>
                         <th>
                             Previous Reading
                         </th>
                         <th>
                             Current Reading
                         </th>
                     </tr>
                     </thead>
                     <tbody>
                     {meters.map((value,index)=>{
                         return(
                            <tr key={index}>
                                <td>
                                    { value.meterName}
                                </td>
                                <td>
                                    <input 
                                    type='number' 
                                    className='previous' 
                                    data-id={index}  
                                    name={`previous-${index}`} 
                                    placeholder={`${value.meterName} `}/>
                                </td>
                                <td>
                                <input 
                                    type='number' 
                                    className='current' 
                                    data-id={index}  
                                    name={`current-${index}`} 
                                    placeholder={`${value.meterName} `}/>
                                </td>
                            </tr>
                         )
                     })}
                     </tbody>
                 </table>:null}
                <button className='save-btn save-readings-btn'>Submit</button>
             </div>
             <div className='meter-calculation'>
                <h1>Units & Cost Calculated</h1>
                <div className='meter-unit-price'>
                    <span>
                        Unit price :  (Rs.)
                    </span> 
                    <input type='number' placeholder='Unit price'/>
                </div>
                <div className='each-meter-calculation'>
                     {meters.map((value,index)=>{
                         return(
                                <div key={index} className='each-meter-calculation-row'>
                                    <span className="meter-name">{ value.meterName} </span>
                                    <span className="meter-units"> 123 units</span>
                                    <span className="meter-cost"> Rs. 1230</span>


                                </div>
                         )
                     })}
                <button className='save-btn '>Submit</button>

                </div>
             </div>
            <div className="divided-meter-calculation">
                <h1>Cost of Each of You</h1>
                <div className='number-of-user'>
                <span>
                        Number of User's: 
                    </span> 
                    <input type='number' placeholder="No. of user's"/>
                </div>
            </div>
        </div>
    );
}

export default MeterReadingsAndCalculation;
