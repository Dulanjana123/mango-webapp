import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
        if (token) {
            config.headers["authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const axiosBaseQuery = (): BaseQueryFn<
    { url: string; method?: AxiosRequestConfig["method"]; data?: AxiosRequestConfig["data"]; params?: AxiosRequestConfig["params"]; },
    unknown,
    unknown
> => async ({ url, method = "GET", data, params }) => {
    try {
        const result = await axiosInstance({ url, method, data, params });
        return { data: result.data }; // Return full data object
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
    baseQuery: axiosBaseQuery(),
    tagTypes: ["Orders"],
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: (queryParams: {userId?: string; searchString?: string; status?: string; pageNumber?: number; pageSize?: number;}) => ({
                url: "order/paginated",
                params: {
                    ...queryParams,
                },
            }),
            transformResponse: (apiResponse: any) => ({
                result: apiResponse.result || [],
                pagination: apiResponse.pagination || { totalRecords: 0, currentPage: 1, pageSize: 10 },
            }), 
            providesTags: ["Orders"],
        }),
        getOrderDetails: builder.query({
            query: (id) => ({
                url: `order/${id}`,
            }),
            providesTags: ["Orders"],
        }),
        getDashboardDetails: builder.query({
            query: () => ({
                url: `order`,
            }),
            providesTags: ["Orders"],
        }),
        createOrder: builder.mutation({
            query: (orderData: { items: Array<any>; total: number }) => ({
                url: "order",
                method: "POST",
                data: orderData,
            }),
            invalidatesTags: ["Orders"], 
        }),
    }),
});

export const { useGetAllOrdersQuery, useGetOrderDetailsQuery, useGetDashboardDetailsQuery, useCreateOrderMutation } = orderService;
export default orderService;
