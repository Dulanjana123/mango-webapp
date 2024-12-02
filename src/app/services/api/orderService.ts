import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const orderService = createApi({
    reducerPath:"orderService",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/",
        prepareHeaders: (headers) => {
          const token = localStorage.getItem("token"); 
          if (token) {
            headers.set("authorization", `Bearer ${token}`); 
          }
          return headers;
        },
    }),
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
        })
    }),
});
 
export const {useGetAllOrdersQuery, useGetOrderDetailsQuery} = orderService
export default orderService;