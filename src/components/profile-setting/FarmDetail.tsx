import React from 'react';
import { FarmInformationTab, FarmLocationTab } from './components';

const FarmDetail = () => {
  return (
    <div className='form-container'>
      <FarmInformationTab />
      <FarmLocationTab />
    </div>
  );
};

export default FarmDetail;
