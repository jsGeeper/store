export interface IWallet {
  fundingModal: boolean;
  cardFundingModal: boolean;
  addCardModal: boolean;
  amountModal: boolean;
  amount: number;
  selectedMethod: 'card' | 'paystack' | '';
  loading: boolean;
  error: any;
  walletBalance: number;
  totalWithdrawal: number;
  totalSales: number;
  transactionHistory: any[];
}
