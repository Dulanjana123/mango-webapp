import { withAuth } from '../../HOC';
import { useGetAllOrdersQuery } from '../../app/services/api/orderService';
import OrderList from './OrderList';
import { MainLoader } from '../../app/layout/Page/ProductItems/Common';
import { useEffect, useState } from 'react';
import inputHelper from '../../Helper/inputHelper';
import { OrderStatus } from '../../types/enums/order-status';


const filterOptions = ["All", OrderStatus.Confirmed, OrderStatus.Pending, OrderStatus.Cancelled];

function AllOrders() {
  const [filters, setFilters] = useState<{ searchString: string; status: string }>({
    searchString: "",
    status: "",
  });

  const[orderData, setOrderData] = useState([]);

  const [pageOptions, setPageOptions] = useState({
    pageNumber: 1,
    pageSize: 5,
    totalRecords: 0,
  });

  const [apiFilters, setApiFilters] = useState({
    searchString: "",
    status: "",
  });

  const { data, isLoading, error } = useGetAllOrdersQuery({
    searchString: apiFilters.searchString,
    status: apiFilters.status,
    pageNumber: pageOptions.pageNumber,
    pageSize: pageOptions.pageSize,
  });

  useEffect(() => {
    if (data) {

      setOrderData(data.result);

      setPageOptions((prev) => ({
        ...prev,
        totalRecords: data.pagination.totalRecords,
      }));
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const tempValue = inputHelper(e, filters);
    setFilters(tempValue);
  };

  const handleFilters = () => {
    setApiFilters(filters);
    setPageOptions((prev) => ({
      ...prev,
      pageNumber: 1, // Reset to first page on new filter
    }));
  };

  const handlePageChange = (newPage: number) => {
    setPageOptions((prev) => ({ ...prev, pageNumber: newPage }));
  };

  if (isLoading) return <MainLoader />;
  if (error) return <div>Error loading orders</div>;

  const orderList = data?.result || [];
  const numberOfPages = pageOptions.totalRecords / pageOptions.pageSize;
  const totalPages = Math.ceil(numberOfPages);

  const getPageDetails = () => {
    const dataStartNumber = (pageOptions.pageNumber - 1) * pageOptions.pageSize + 1;
    const dataEndNumber = pageOptions.pageNumber * pageOptions.pageSize;
    const totalPages = pageOptions.totalRecords / pageOptions.pageSize;
  };

  function setCurrentPageSize(setpageSize: number) {
    setPageOptions((prev) => ({ ...prev, pageNumber: setpageSize }));
    
  }

  return (
    <div className="all-orders-container">

      <div className="filter-bar">
        <h1 className="order-list__title">All Orders</h1>
        <div className="filter-inputs">
          <input
            type="text"
            className="form-control"
            placeholder="Search Name, Email or Phone"
            name="searchString"
            onChange={handleChange}
          />
          <select className="form-select" onChange={handleChange} name="status">
            {filterOptions.map((item, index) => (
              <option key={index} value={item === "All" ? "" : item}>
                {item}
              </option>
            ))}
          </select>
          <button className="btn btn-outline-success" onClick={handleFilters}>
            Filter
          </button>
        </div>
      </div>

      <OrderList isLoading={isLoading} orderData={orderList}></OrderList>
      <div className="pagination">
        <div>Rows per page: </div> 
        <div className="Rows">
          <select className="form-select mx-2"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setCurrentPageSize(Number(e.target.value))
          }}
          >
          </select>
        </div>
        <button
          className="btn btn-outline-primary"
          disabled={pageOptions.pageNumber === 1}
          onClick={() => handlePageChange(pageOptions.pageNumber - 1)}
        >
          Previous
        </button>
        <span>
          Page {pageOptions.pageNumber} of {totalPages}
        </span>
        <button
          className="btn btn-outline-primary"
          disabled={pageOptions.pageNumber === totalPages}
          onClick={() => handlePageChange(pageOptions.pageNumber + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default withAuth(AllOrders);
