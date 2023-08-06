import { Box, List, ListItem, Stack, Typography, styled } from '@mui/material';
import { BiChevronRight } from 'react-icons/bi';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardIcon } from '../../svgs/CardIcon';
import { PaystackSvg } from '../../svgs/PaystackIcon';
import { handleCloseModal, handleOpenModal, handleSelectedMethod } from '../../redux/slice/wallet/wallet.slice';
import { WithdrawalModalContainer } from '../modals/WithdrawalModalContainer';
import { IRootReducerState } from '../../redux/IRootReducer';
import { WalletFundingAmount } from './WalletFundingAmount';

const Styledtypo = styled(Typography)({
  color: '101828',
  fontWeight: 500,
  fontSize: 16
});

const StyledListItem = styled(ListItem)({
  width: '100%',
  cursor: 'pointer',
  mb: 1,
  '&:hover': {
    backgroundColor: '#F5F5F5',
    borderRadius: 2
  }
});

export const SelectFundingMethod: React.FC = () => {
  const dispatch = useDispatch();

  const { amountModal } = useSelector((state: IRootReducerState) => state.wallet);

  return (
    <>
      <Box width={'100%'}>
        <List>
          {/* <StyledListItem
            onClick={() => {
              dispatch(handleSelectedMethod('card'));
              dispatch(handleCloseModal('fundingModal'));
              dispatch(handleOpenModal('cardFundingModal'));
            }}
          >
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
              <Box height={'100%'} display={'flex'} alignItems={'center'} gap={2}>
                <CardIcon />
                <Styledtypo variant={'body2'}>Fund With Card</Styledtypo>
              </Box>
              <BiChevronRight size={24} fill='#98A2B3' />
            </Stack>
          </StyledListItem> */}

          <StyledListItem
            onClick={async () => {
              dispatch(handleSelectedMethod('paystack'));
              dispatch(handleCloseModal('fundingModal'));
              dispatch(handleOpenModal('amountModal'));
            }}
          >
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
              <Box height={'100%'} display={'flex'} alignItems={'center'} gap={2}>
                <PaystackSvg />
                <Styledtypo variant={'body2'}>Fund using Paystack </Styledtypo>
              </Box>
              <BiChevronRight size={24} fill='#98A2B3' />
            </Stack>
          </StyledListItem>
        </List>
      </Box>
    </>
  );
};
