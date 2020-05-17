import React from 'react';
import '../../scss/home.scss';

const Home = () => {
    const [units, setUnits] = React.useState('0');
    const [cost,setCost] = React.useState('0');
    const [rate,setRate] = React.useState('10');

    const [showResult,setShowResult] = React.useState('');
    const [previous,setPrevious] = React.useState('');
    const [current,setCurrent] = React.useState('');

    const handleCalculation=()=>{
        if(previous!== '' && current !==''){
            const resultUnits= parseInt(current)-parseInt(previous);
            const resultCost= parseFloat(rate) * resultUnits;
            setUnits(resultUnits);
            setCost(resultCost);
            
        }
        else{
            alert('Previous or Current Readings is Not filled');
        }
    }


    return (
        <div className='home-wrapper'>
            <div className='container'>
                <div className='calculation'>
                    <div className='calculation__title'>
                        Calculation
                    </div>
                    <div className='calculation__form'>
                        <div className='calculation__form-row'>
                            <span className="calculation__name">Previous Readings</span>
                            <span className="calculation__value"><input type='number' name="previous-reading" onChange={(e)=>{setPrevious(e.target.value)}}/></span>
                        </div>
                        <div className='calculation__form-row'>
                            <span className="calculation__name">Current Readings</span>
                            <span className="calculation__value"><input type='number' name="current-reading" onChange={(e)=>{setCurrent(e.target.value)}}/></span>
                        </div>
                        <div className='calculation__form-row'>
                            <span className="calculation__name">Rate</span>
                            <span className="calculation__value"> (Rs.) <input type='number' name="rate" onChange={(e)=>{setRate(e.target.value)}} defaultValue='10'/></span>
                        </div>
                        <button className='compute-btn' type='submit' onClick={handleCalculation}> Compute</button>
                    </div>
                </div>
                <div className='calculation__result'>
                    <div className='result__title'>
                        Computation Result
                    </div>
                    <div className="result__row">
                        <span>Units </span>
                        <span>: {units} units</span>
                    </div>
                    <div className="result__row">
                        <span>Rate </span>
                        <span>: Rs.{rate} </span>
                    </div>
                    <div className="result__row">
                        <span>Cost </span>
                        <span>: Rs.{cost} </span>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Home;

