import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Loader } from '@gogeepernpm/storybook/lib';
import { AppWrapper } from '../../components/layouts/app-wrapper';
import { Box, Stack, Divider } from '@mui/material';
import { SearchField } from '../../components/form/SearchField';
import { SimpleButton } from '../../components/button/SimpleButton';
import { OutlinedButton } from '../../components/button/OutlinedButton';
import { BalanceWidget } from '../../components/balance-widget/BalanceWidget';
import paginate from '../../utils/paginate';
import { dummyItems } from '../dashboard/orders/dummy';
import { Pagination } from '../../components/pagination';
import { WalletTable } from '../../components/wallet/WalletTable';
import { WithdrawalModalContainer } from '../../components/modals/WithdrawalModalContainer';
import { SettlementForm } from '../../components/wallet/SettlementForm';
import { WithdrawalFormState } from '../../components/wallet/WithdrawalFormState';
import { SelectFundingMethod } from '../../components/wallet/SelectFundingMethod';
import { IRootReducerState } from '../../redux/IRootReducer';
import {
  getTotalSalesAmount,
  getTotalWithdrawalAmount,
  getTransactions,
  getWalletBalanceAmount,
  handleCloseModal,
  handleOpenModal,
  submitWalletFund
} from '../../redux/slice/wallet/wallet.slice';
import { WalletFundingAmount } from '../../components/wallet/WalletFundingAmount';
import { WalletCardFunding } from '../../components/wallet/WalletCardFunding';
import { WalletAddCard } from '../../components/wallet/WalletAddCard';
import { fetchSettlement } from '../../redux/slice/update-profile/profileUpdateAction';

const WalletScreen = () => {
  const dispatch = useDispatch();

  const [paginated, setPaginated] = React.useState<any[]>([]);
  const [tempOrders, setTempOrders] = React.useState<any[]>([]);
  const [pages, setPages] = React.useState<number>(0);
  const [hasSettlementAccount, setHasSettlementAccount] = React.useState<boolean>(false);
  const [addSettlementModal, setAddSettlementModal] = React.useState<boolean>(false);
  const [openWithdrawalModal, setOpenWithdrawalModal] = React.useState<boolean>(false);

  const { fundingModal, amountModal, cardFundingModal, addCardModal, transactionHistory } = useSelector(
    (state: IRootReducerState) => state.wallet
  );

  const { user } = useSelector((state: IRootReducerState) => state.auth);
  const { loading, walletBalance, totalSales, totalWithdrawal } = useSelector(
    (state: IRootReducerState) => state.wallet
  );
  const { getSettlement } = useSelector((state: IRootReducerState) => state.profileUpdate);

  useEffect(() => {
    dispatch(getWalletBalanceAmount({ user_id: user.id }));
    dispatch(getTotalWithdrawalAmount({ user_id: user.id }));
    dispatch(getTotalSalesAmount({ user_id: user.id }));
    dispatch(getTransactions({ user_id: user.id }));
    dispatch(fetchSettlement(user?.id));
  }, [user]);

  useEffect(() => {
    setTempOrders(paginate(transactionHistory, 10));
  }, [transactionHistory]);

  useEffect(() => {
    if (getSettlement.length > 0) {
      setHasSettlementAccount(true);
    }
  }, [getSettlement]);

  useEffect(() => {
    if (tempOrders.length > 0) setPaginated(tempOrders[pages]);
  }, [tempOrders]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPages(newPage - 1);
  };

  const handleSearch = (search: string) => {
    if (search === '') {
      setTempOrders(paginate(dummyItems, 10));
    } else {
      const filtered = tempOrders[pages].filter((order: any) => order.orderId.includes(search));
      setTempOrders(paginate(filtered, 10));
    }
  };

  const onNextPage = () => {
    if (pages < tempOrders.length - 1) {
      setPages(pages + 1);
    }
    return null;
  };

  const onPreviousPage = () => {
    if (pages > 0) {
      setPages(pages - 1);
    }
    return null;
  };

  const openSettlementModal = () => setAddSettlementModal(true);
  const handleOpenWithdrawal = () => setOpenWithdrawalModal(true);

  const handleSettlementSubmit = () => {
    setAddSettlementModal(false);
    setTimeout(() => {
      setOpenWithdrawalModal(true);
    }, 1000);
  };

  const submitAfterFunding = (res: any) => {
    let status;

    if (res.status === 'success') {
      status = 'success';
    }

    if (res.status === 'successful') {
      status = 'success';
    }

    dispatch(
      submitWalletFund({
        user_id: user.id,
        amount: res.amount,
        status,
        reference: res?.flw_ref ?? res?.trxref
      })
    );
  };

  return (
    <>
      {loading && <Loader loading={loading} />}
      <WithdrawalModalContainer
        modalTitle='Fund Money'
        onClose={() => dispatch(handleOpenModal('amountModal'))}
        open={amountModal}
        id='amount-modal'
      >
        <WalletFundingAmount onSuccessFunc={submitAfterFunding} />
      </WithdrawalModalContainer>

      <WithdrawalModalContainer
        modalTitle='Fund With Card'
        onClose={() => dispatch(handleCloseModal('cardFundingModal'))}
        open={cardFundingModal}
        id='card-funding-modal'
        showCloseIcon
      >
        <WalletCardFunding />
      </WithdrawalModalContainer>

      <WithdrawalModalContainer
        modalTitle='Add new card'
        onClose={() => dispatch(handleCloseModal('addCardModal'))}
        open={addCardModal}
        id='add-card-modal'
        showCloseIcon
      >
        <WalletAddCard />
      </WithdrawalModalContainer>

      <AppWrapper title='Wallet'>
        <Box paddingY={5} paddingX={3} height='100%'>
          <Stack alignItems={'center'} flexDirection={'row'} justifyContent={'space-between'}>
            <Box flex={1}>
              <SearchField
                placeholder='Search for transaction ID, Type or Amount'
                onChange={(e) => handleSearch(e.target.value)}
                width={400}
              />
            </Box>

            <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Box mr={2}>
                <OutlinedButton
                  label='Fund Account'
                  padding={'.55rem 1.4rem'}
                  onClick={() => dispatch(handleOpenModal('fundingModal'))}
                />
                <WithdrawalModalContainer
                  open={fundingModal}
                  onClose={() => dispatch(handleCloseModal('fundingModal'))}
                  modalTitle='Fund Account'
                  showCloseIcon
                >
                  <SelectFundingMethod />
                </WithdrawalModalContainer>
              </Box>
              <Box>
                <SimpleButton
                  label='Withdraw'
                  onClick={hasSettlementAccount ? handleOpenWithdrawal : openSettlementModal}
                />
                <WithdrawalModalContainer
                  open={addSettlementModal}
                  onClose={() => setAddSettlementModal(false)}
                  modalTitle='Add settlement account'
                  onSubmit={handleSettlementSubmit}
                >
                  <SettlementForm onSubmit={handleSettlementSubmit} onClose={() => setAddSettlementModal(false)} />
                </WithdrawalModalContainer>

                <WithdrawalModalContainer
                  open={openWithdrawalModal}
                  onClose={() => setOpenWithdrawalModal(false)}
                  modalTitle='Withdraw'
                  onSubmit={handleSettlementSubmit}
                >
                  <WithdrawalFormState
                    onClose={() => {
                      setOpenWithdrawalModal(false);
                    }}
                  />
                </WithdrawalModalContainer>
              </Box>
            </Stack>
          </Stack>
          <Box marginY={3} display={'flex'} gap={'20px'} width={'100%'}>
            <Box flexGrow={1}>
              <BalanceWidget
                label='Wallet balance'
                amount={walletBalance}
                analytics={{
                  label: 'Total Income',
                  amount: walletBalance,
                  percentage: 0.5,
                  type: 'increase'
                }}
              />
            </Box>
            <Box flexGrow={1}>
              <BalanceWidget
                label='Total Income'
                amount={totalSales}
                analytics={{
                  label: 'Total Income',
                  amount: totalSales,
                  percentage: 0.5,
                  type: 'increase'
                }}
              />
            </Box>
            <Box flexGrow={1}>
              <BalanceWidget
                label='Total Withdrawn'
                amount={totalWithdrawal}
                analytics={{
                  label: 'Total Income',
                  amount: totalWithdrawal,
                  percentage: 0.5,
                  type: 'increase'
                }}
              />
            </Box>
          </Box>

          <Box marginY={5}>
            <WalletTable listData={tempOrders[pages] || []} />
          </Box>

          <Box marginBottom={4}>
            <Divider />
          </Box>
          {tempOrders.length > 0 && (
            <Pagination
              pageCount={tempOrders.length}
              handleChange={handleChangePage}
              onNext={onNextPage}
              onPrev={onPreviousPage}
              page={pages + 1}
            />
          )}
        </Box>
      </AppWrapper>
    </>
  );
};

export default WalletScreen;
