import { orderHeader } from '../../types/interfaces';

interface TableRowProps {
  orderItem: orderHeader;
}

function TableRow({ orderItem }: TableRowProps) {
  return (
    <div className="table-row">
      <div className="table-row__cell">{orderItem.orderHeaderId}</div>
      <div className="table-row__cell">{orderItem.pickupName}</div>
      <div className="table-row__cell">{orderItem.pickupPhoneNumber}</div>
      <div className="table-row__cell">{orderItem.orderTotal!.toFixed(2)}</div>
      <div className="table-row__cell">{orderItem.totalItems}</div>
      <div className="table-row__cell">
        {new Date(orderItem.orderDate!).toLocaleDateString()}
      </div>
      <div className="table-row__cell">{orderItem.status}</div>
    </div>
  );
}

export default TableRow;
