import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosRequestConfig, AxiosError } from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if(token){
            config.headers["authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


const axiosBaseQuery =(): BaseQueryFn<{url: string; method?: AxiosRequestConfig["method"]; data?: AxiosRequestConfig["data"]; params?: AxiosRequestConfig["params"];},unknown,unknown> =>
  async ({ url, method = "GET", data, params }) => {
    try {
      const result = await axiosInstance({ url, method, data, params });
      return { data: result.data.result }; 
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

  
const orderService = createApi({
    reducerPath:"orderService",
    baseQuery: axiosBaseQuery(),
    tagTypes: ["Orders"], 
    endpoints: (builder) => ({
        getAllOrders : builder.query({
            query: (userId?:string) => ({
                url:"order",
                params:userId?{userId} : {},
            }),
            providesTags:["Orders"]
        }),
        getOrderDetails : builder.query({
            query: (id) => ({
                url:`order/${id}`,
            }),
            providesTags:["Orders"]
        }),
        createOrder: builder.mutation({
            query: (orderData: { items: Array<any>; total: number }) => ({
              url: "order",
              method: "POST",
              data: orderData, // Pass the payload in the `data` field
            }),
            invalidatesTags: ["Orders"], // Invalidate orders to refetch the list
          }),
    }),
});
 
export const {useGetAllOrdersQuery, useGetOrderDetailsQuery} = orderService
export default orderService;