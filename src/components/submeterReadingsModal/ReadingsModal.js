import React from 'react';

import Backdrop from '../backdrop/index';
import './readingsModal.scss';
import { useDispatch, useSelector } from 'react-redux';
import { saveReadings } from '../../redux/actions/meterAction';

const ReadingsModal = (props) => {

	const [year,setYear] = React.useState('');
	const [month,setMonth] = React.useState('January');
	const [reading,setReading] = React.useState('');
	const [unitPrice,setUnitPrice] = React.useState(10);

	const {loading,error,success} = useSelector(state=>state.readingsSave)
React.useEffect(()=>{
	setYear('');
	setReading('');
	setMonth('January');
},[success])

	const dispatch = useDispatch();

	const handleSubmit=(e)=>{
		e.preventDefault();
		if(year !== '' && month !=='' && reading !=='' && unitPrice !==''){
			dispatch(saveReadings(props.submeter.id,year,month,reading,unitPrice))
		}
		else{
			alert('Some Fields are empty!!');
		}

	}
    return (
        <>
            <div className='submeterReadingsModal' >
							<div className='submeterReadings__title' >
								<div className='collection'>{props.submeter.collectionName}'s</div>
								<div className='submeter'>{props.submeter.name}</div>
								<div className='closeModal' onClick={props.closeModal}>x</div>
							</div>
							<div className='submeterReadings__readingsRegister'>
									<form className='readingsRegisterForm'>
									<div className='error'>{error}</div>
										<label>
											Year
											<input  type='number' value={year} onChange={(e)=>setYear(e.target.value)}/>
										</label>
										<label>
											Month
											<select value={month} onChange={(e)=>setMonth(e.target.value)}>
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
										</label>
										<label>
											Meter Reading
											<input type='number' value={reading} onChange={(e)=>setReading(e.target.value)}/>
										</label>
										<label>
											Unit price
											<input type='number' value={unitPrice} onChange={(e)=>setUnitPrice(e.target.value)}/>
										</label>
										<button className='add-submeter-btn readings-btn' onClick={handleSubmit}>{loading === true?'Loading...':'save'} </button>
									</form>

							</div>

            </div>
            <Backdrop visibility={true}/>
        </>
    );
}

export default ReadingsModal;
