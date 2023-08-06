import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { PaymentMethod, SettlementForm } from './components';
import { IRootReducerState } from '../../redux/IRootReducer';

const PAYMENT_OPTION = [
  {
    value: 'manual',
    label: 'Manual Payment Option',
    description: 'Every time you need to make a payment, you will have to enter your payment information.'
  },
  {
    value: 'automatic',
    label: 'Automated Payment Option',
    description: 'Enter your card information now to automate all payments.'
  }
];

const userSettlement = {
  accountName: 'John Doe',
  accountNumber: '1234567890',
  bank: 'Access Bank'
};

const FundsAndSettlement = () => {
  const [loading, setLoading] = useState(false);
  const [banks, setBanks] = useState([]);

  const { getSettlement } = useSelector((state: IRootReducerState) => state.profileUpdate);

  const fetchBanks = async () => {
    setLoading(true);
    const response = await axios.get('https://api.paystack.co/bank');
    const data = await response.data;
    setBanks(data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBanks();

    return () => {
      setBanks([]);
    };
  }, []);

  const bankOptions = banks.map((bank: any) => {
    return { label: bank.name, value: bank.name };
  });

  return (
    <div className='form-container mb-1'>
      <PaymentMethod methods={PAYMENT_OPTION} />
      <SettlementForm banks={bankOptions} details={getSettlement} />
    </div>
  );
};

export default FundsAndSettlement;
