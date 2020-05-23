import React from 'react';
import '../../scss/meter-readings-and-calc.scss';
import Modal from '../modal';

const MeterReadingsAndCalculation = ({meters,updatedMeter}) => {
  
    const [unitPrice,setUnitPrice] = React.useState(10);
    const [totalCost,setTotalCost] = React.useState(0);
    const [totalUnits,setTotalUnits] = React.useState(0);
    const [divideStatus,setDivideStatus] = React.useState(false);
    const [divisionCount, setDivisionCount] = React.useState(1);
    const [showDivisionModal,setShowDivisionModal] = React.useState(true);

    const handleReadingsChange = (e)=>{
        const updatedMeters = [...meters];
        updatedMeters[e.target.dataset.id][e.target.className] = e.target.value;
        updatedMeter(updatedMeters);
    }

    const handleCalculation = (e)=>{
        setUnitPrice(e.target.value);
        let total=0;
        let totalU = 0;
        let unit =e.target.value;
     
        const updatedMeters = [...meters];
        updatedMeters.forEach((meter,index)=>{
            let cost;
                 cost = parseInt(meter.units) * parseFloat(unit);
                 if(!Number.isNaN(cost)){
                    updatedMeters[index].cost = cost;
                    total +=cost;
                    totalU += updatedMeters[index].units;
                }
        })
        
        setTotalCost(total);
        setTotalUnits(totalU)
        updatedMeter(updatedMeters);

    }

    const handleMeterReadings=()=>{
        
        const updatedMeters = [...meters];
        let total = 0;
        let totalC=0;
        updatedMeters.forEach((meter,index)=>{
            let unit;
                 unit = parseInt(meter.current) - parseInt(meter.previous);
                 const costss = unit * 10;
                 if(!Number.isNaN(unit)){
                    updatedMeters[index].units = unit;
                    updatedMeters[index].cost = costss;
                    total += unit;
                    totalC += costss;
                }
        })
        setTotalUnits(total);
        setTotalCost(totalC);
        updatedMeter(updatedMeters);
    }

    const handleCheckBox =(e)=>{
        if(e.target.checked){
            setDivideStatus(true);
        }else{
            setDivideStatus(false);
        }
    }

    const handleCalculationDivision=()=>{
        const tempMeters = [...meters];
        
    }

    const toggleDivisionModal=()=>{
        setShowDivisionModal((showDivisionModal)=>  showDivisionModal === true? false:true);
    }

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
                                    placeholder={`${value.meterName} `}
                                    value={value.previous || ''}
                                    onChange={handleReadingsChange}/>
                                </td>
                                <td>
                                <input 
                                    type='number' 
                                    className='current' 
                                    data-id={index}  
                                    name={`current-${index}`} 
                                    value={value.current || ''}
                                    onChange={handleReadingsChange}
                                    placeholder={`${value.meterName} `}/>
                                </td>
                            </tr>
                         )
                     })}
                     </tbody>
                 </table>:null}
                <button className=' save-btn save-readings-btn' onClick={handleMeterReadings}>Submit</button>
             </div>
             <div className='meter-calculation'>
                    <h1>Units & Cost Calculated</h1>
                    <div className='meter-unit-price'>
                        <span>
                            Unit price :  (Rs.)
                        </span> 
                        <input type='number' placeholder='Unit price' onChange={handleCalculation}/>
                    </div>
                    <div><span className="default-unit-price">* </span>Default Unit Price is Rs.10</div>
                    <button className='save-btn ' value={unitPrice} onClick={handleCalculation}>Calculate Cost</button>
                    <div className='each-meter-calculation'>
                        <div  className='each-meter-calculation-row'>
                            <span className="meter-name">Meter Name </span>
                            <span className="meter-units"> Units</span>
                            <span className="meter-cost">Cost</span>
                        </div>
                    {meters.map((value,index)=>{
                        return(

                                <div key={index} className='each-meter-calculation-row'>
                                    <span className="meter-name">{ value.meterName} </span>
                                    <span className="meter-units"> {value.units}</span>
                                    <span className="meter-cost">Rs.  {value.cost}</span>
                                </div>
                        )
                    })}
                      <div  className='each-meter-calculation-row total'>
                            <span className="meter-name">Total </span>
                            <span className="meter-units"> {totalUnits} </span>
                            <span className="meter-cost">Rs. {totalCost}</span>
                        </div>
                </div>
             </div>
             <div className='divide-status-checkbox'>
                 <h1>Divide sub-meters</h1>
                 <p>If you have to divide above calculation click on below button</p>
                    <label for='checkbox-divide' className='checkbox-divide'>
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
                <button className='save-btn' onClick={toggleDivisionModal}>Divide</button>
            </div>
            :null}
             </div>
                <Modal  
                showModal = {showDivisionModal} 
                toggleModal={toggleDivisionModal} 
                allMeters={meters}
                divisionCount = {divisionCount} />

        </div>
    );
}

export default MeterReadingsAndCalculation;
