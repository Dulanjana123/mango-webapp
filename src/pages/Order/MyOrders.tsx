import { withAuth } from '../../HOC'
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/Redux/store';
import { useGetAllOrdersQuery } from '../../app/services/api/orderService';
import OrderList from './OrderList';
import { MainLoader } from '../../app/layout/Page/ProductItems/Common';

function MyOrders() {

  const userId = useSelector((state: RootState) => state.userAuthStore.id);

  const {data, isLoading} = useGetAllOrdersQuery(userId)

  console.log(data);

  return (
    <>
      {isLoading && <MainLoader/>}
      {!isLoading && (<OrderList isLoading={isLoading} orderData={data.result}></OrderList>)}
    </>
  )
}

export default withAuth(MyOrders)