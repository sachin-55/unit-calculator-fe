import React from 'react';
import '../../scss/meter-readings-and-calc.scss';

const MeterReadingsAndCalculation = ({meters}) => {
    const [subMeters,setSubMeters] = React.useState('');

  
    return (
        <div className='meter-readings-and-calculation'>
             <div className="meter-readings">
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
                <h1>Calculate Cost</h1>
                <div className='meter-unit-price'>
                    <span>
                        Unit price :  (Rs.)
                    </span> 
                    <input type='number' placeholder='Unit price'/>
                </div>
                <div className='each-meter-calculation'>
                     
                </div>
             </div>
        </div>
    );
}

export default MeterReadingsAndCalculation;
