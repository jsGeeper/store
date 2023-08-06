type Order = 'asc' | 'desc';

interface Data {
  orderId: string;
  product: string;
  quantity: string;
  date: Date;
  status: string;
  amount: number;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'orderId',
    numeric: false,
    disablePadding: true,
    label: 'Order ID'
  },
  {
    id: 'product',
    numeric: false,
    disablePadding: false,
    label: 'Product'
  },
  {
    id: 'quantity',
    numeric: false,
    disablePadding: false,
    label: 'Quantity'
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'Date'
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status'
  },
  {
    id: 'amount',
    numeric: true,
    disablePadding: false,
    label: 'Amount'
  }
];

export { headCells };
export type { EnhancedTableProps, Data };
export type { Order };
