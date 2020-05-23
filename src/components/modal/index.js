import React from 'react';
import './modal.scss';
import Backdrop from '../backdrop';

const Modal = ({showModal,toggleModal,allMeters,divisionCount}) => {


    const createUserDivisionBlock = ()=>{
        let blocks=[];
            for(let i=0;i<divisionCount;i++){

                blocks.push(
                <div className='sub-meters-user'>
                <input type='text' name='username' placeholder='username'/>
                <div className='meter-name-percentage'>
                    <select>
                        {allMeters.map((value,index)=>{
                            return(
                                <option key={index} value={value.meterName}>{value.meterName}</option>
                            )
                        })}
                    </select>
                    <div><input type='number'  placeholder='%'/><span className='percentage'>%</span></div>
                </div>
                <button className='add-submeter-btn' onClick={()=>{console.log('add');
                }}>Add sub-meter</button>
                </div>)


            }
        return blocks;
    }

    return (
        <>
        <div className={`modal ${showModal === true?'open-modal':''}`}>
            <div className=" container">
                <div className='modal-title'>
                    <h1>Divide Sub-Meter</h1>
                <span onClick={toggleModal}>Close</span>
                </div>
                <div className='modal-body'>
                  <h1>Select Your Respective Meter</h1>
                      {createUserDivisionBlock()}
                  {/* <div className='sub-meters-user'>
                    <input type='text' name='username' placeholder='username'/>
                    <div className='meter-name-percentage'>
                        <select>
                            {allMeters.map((value,index)=>{
                                return(
                                    <option key={index} value={value.meterName}>{value.meterName}</option>
                                )
                            })}
                        </select>
                        <div><input type='number'  placeholder='%'/><span className='percentage'>%</span></div>
                    </div>
                    <button className='add-submeter-btn' onClick={()=>{console.log('add');
                    }}>Add sub-meter</button>
                  </div> */}
                </div>

            </div>
        </div>
        <Backdrop visibility={showModal}/>
        </>
    );
}

export default Modal;
