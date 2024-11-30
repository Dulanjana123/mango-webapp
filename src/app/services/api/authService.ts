import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const authService = createApi({
    reducerPath:"authService",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/api/"
    }),
    endpoints: (builder) => ({

        loginUser : builder.mutation({
            query: (userCredentials) => ({
                url:"login",
                method: "POST",
                headers: {
                    "Content-type":"application/json",
                },
                body:userCredentials
            }),
        }),
    }),
});
 
export const {useLoginUserMutation} = authService
export default authService;