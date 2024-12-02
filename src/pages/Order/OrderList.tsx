import { MainLoader } from '../../app/layout/Page/ProductItems/Common';
import { orderHeader } from '../../types/interfaces';
import TableHeader from '../../shared-components/molecules/TableHeader';
import TableRow from '../../shared-components/molecules/TableRow';

interface OrderListProps {
  isLoading: boolean;
  orderData: orderHeader[];
}

function OrderList({ isLoading, orderData }: OrderListProps) {
  return (
    <>
      {isLoading && <MainLoader />}
      {!isLoading && (
        <div className="order-list">
          <h1 className="order-list__title">Orders List</h1>
          
          <div className="order-list__table">
            <TableHeader />
            {orderData.map((orderItem: orderHeader) => (
              <TableRow key={orderItem.orderHeaderId} orderItem={orderItem} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default OrderList;
