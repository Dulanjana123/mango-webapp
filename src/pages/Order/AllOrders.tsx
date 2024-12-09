import React, { useEffect, useState } from 'react';
import { withAuth } from '../../hoc';
import { useGetAllOrdersQuery } from '../../app/services/api/orderService';
import OrderList from './OrderList';
import { OrderStatus } from '../../types/enums/order-status';
import inputHelper from '../../helper/inputHelper';
import { MainLoader } from '../../app/layout/Page/ProductItems/Common';
import { Button, InputField, SelectDropdown,  } from '../../shared-components/atoms';

const filterOptions = ["All", OrderStatus.Confirmed, OrderStatus.Pending, OrderStatus.Cancelled];

function AllOrders() {
  const [filters, setFilters] = useState({ searchString: "", status: "" });
  const [orderData, setOrderData] = useState([]);
  const [pageOptions, setPageOptions] = useState({ pageNumber: 1, pageSize: 5, totalRecords: 0 });
  const [apiFilters, setApiFilters] = useState({ searchString: "", status: "" });

  const { data, isLoading, error } = useGetAllOrdersQuery({
    searchString: apiFilters.searchString,
    status: apiFilters.status,
    pageNumber: pageOptions.pageNumber,
    pageSize: pageOptions.pageSize,
  });

  useEffect(() => {
    if (data) {
      setOrderData(data.result);
      setPageOptions((setPage) => ({ ...setPage, totalRecords: data.pagination.totalRecords }));
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const tempValue = inputHelper(e, filters);
    setFilters(tempValue);
  };

  const handleFilters = () => {
    setApiFilters(filters);
    setPageOptions((setPage) => ({ ...setPage, pageNumber: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setPageOptions((setPage) => ({ ...setPage, pageNumber: newPage }));
  };

  if (isLoading) return <MainLoader />;
  if (error) return <div>Error loading orders</div>;

  const orderList = data?.result || [];
  const totalPages = Math.ceil(pageOptions.totalRecords / pageOptions.pageSize);

  return (
    <div className="all-orders-container">
      <div className="filter-bar">
        <h1 className="order-list__title">All Orders</h1>
        <div className="filter-inputs">
          <InputField
            type="text"
            className="form-control"
            placeholder="Search Name, Email or Phone"
            name="searchString"
            value={filters.searchString}
            onChange={handleChange}
          />
          <SelectDropdown
            options={filterOptions}
            name="status"
            value={filters.status}
            onChange={handleChange}
          />
          <Button label="Filter" onClick={handleFilters} className="btn btn-outline-primary" />
        </div>
      </div>

      <OrderList isLoading={isLoading} orderData={orderList} />
      <div className="pagination">
        <Button
          label="Previous"
          onClick={() => handlePageChange(pageOptions.pageNumber - 1)}
          disabled={pageOptions.pageNumber === 1}
          className="btn btn-outline-primary"
        />
        <span>Page {pageOptions.pageNumber} of {totalPages}</span>
        <Button
          label="Next"
          onClick={() => handlePageChange(pageOptions.pageNumber + 1)}
          disabled={pageOptions.pageNumber === totalPages}
          className="btn btn-outline-primary"
        />
      </div>
    </div>
  );
}

export default withAuth(AllOrders);

