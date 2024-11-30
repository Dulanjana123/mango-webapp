import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const productItemApi = createApi({
    reducerPath:"productItemApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/"
    }),
    tagTypes: ["ProductItems"], 
    endpoints: (builder) => ({
        getProductItems : builder.query({
            query: () => ({
                url:"productitem"
            }),
            providesTags:["ProductItems"]
        }),
        getProductItemById : builder.query({
            query: (id) => ({
                url:`productitem/${id}`,
            }),
            providesTags:["ProductItems"]
        })
    }),
});
 
export const {useGetProductItemsQuery, useGetProductItemByIdQuery} = productItemApi
export default productItemApi;