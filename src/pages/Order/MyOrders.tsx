import { withAuth } from '../../hoc'
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/Redux/store';
import { useGetAllOrdersQuery } from '../../app/services/api/orderService';
import OrderList from './OrderList';
import { MainLoader } from '../../app/layout/Page/ProductItems/Common';

function MyOrders() {
  const userId = useSelector((state: RootState) => state.userAuthStore.id);

  const { data, isLoading, error } = useGetAllOrdersQuery({userId});

  console.log("API Response:", data);

  if (isLoading) return <MainLoader />;
  if (error) return <div>Error loading orders</div>;

  const orderList = data?.result || []; // Handle undefined result safely

  return (
    <>
    <div className='all-orders-container'>
      <h1 className="order-list__title">My Orders</h1>
    </div>
    <OrderList isLoading={isLoading} orderData={orderList || []}></OrderList>
    </>
    
);
}

export default withAuth(MyOrders);
