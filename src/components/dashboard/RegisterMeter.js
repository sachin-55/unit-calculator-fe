import React from "react";
import "../../scss/register-meter.scss";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MeterReadingsAndCalculation from './MeterReadingsAndCalculation';
import {  saveCollection, loadCollectionList } from "../../redux/actions/meterAction";
import { 
  openCreateCollection,
  closeCreateCollection,
} from "../../redux/actions/UIActions";


const RegisterMeter = () => {
  const [meterCollectionName, setMeterCollectionName] = React.useState('');

  const collectionsList = useSelector(state => state.collectionList);
  const {collectionList,loading,error}=collectionsList;
  const collectionSave = useSelector(state => state.collectionSave);
  const {collection,success,loading:saveLoading,error:saveError}=collectionSave;
  const { createCollection } = useSelector(state => state.UI);

  const dispatch = useDispatch();


  React.useEffect(()=>{
    dispatch(loadCollectionList());
  },[success]);

  const handleSaveCollection = async () =>  {
    dispatch(saveCollection(meterCollectionName));
    setMeterCollectionName('');
    dispatch(closeCreateCollection());
  };


  return (
      <div className="register-meter-wrapper">
          <div className="container">
          <div className="register-meter__title">
                      <h1>Submeter-Collection </h1>
                    
            </div>
         
        <div className="buttonWrapper">
                  <button onClick={() => dispatch(openCreateCollection())} className="addNewMeterCollectionBtn">
                      Add New Meter Collection
                    </button>
        </div>
        <div className="register-meter__title2">
                      <h3>List of Submeter-Collections </h3>
            </div>
            <p className='description'>
                Every list consist of submeters.
            </p>
              {createCollection ?
                  <div className="register-meter">
                  <div className="register-meter__title">
                      <h1>Submeter-Collection name</h1>
                      {saveLoading && <div>Loading...</div>}
                        {saveError}
            </div>

                  <div className="register-meter__collection">
                      <input type="text" placeholder="Enter Name" value={meterCollectionName} onChange={(e) => { setMeterCollectionName(e.target.value) ;}} className="meter-collection-name" />
                  <div>
                     
                      <button disabled={meterCollectionName === ''?true:false} onClick={handleSaveCollection} className="save-btn">
                          Save
                        </button>
                      <button onClick={() => dispatch(closeCreateCollection())} className="save-btn">
                          Cancel
                        </button>
            </div>
          </div>
          </div>
                  :null}

        <div className="meterCollectionList">
                  <ul>
            <li>Submeter Collection lists</li>
                      {(collectionList && collectionList.map(collection => (
                            <li key={collection._id} className='collectionItem'>
                                <Link to={{
                                  pathname:`/collection/${collection._id}`,
                                  state:{collection}
                                  }}> 
                                    <div>{collection.name}</div>
                                  </Link>
                                <span>X</span>
                            </li>
                          ))) || <li className='loading'>Loading... Please wait !!!</li>}
          </ul>
        </div>

        {/* <MeterReadingsAndCalculation meterCollectionName={meterCollectionName} meters={meter} updatedMeter={setMeter}/> */}
      </div>
    </div>
  );
};

export default RegisterMeter;
