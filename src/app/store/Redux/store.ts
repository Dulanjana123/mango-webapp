import {configureStore} from "@reduxjs/toolkit";
import { productItemReducer } from "./productItemSlice";
import { authService, orderService, productItemService } from "../../services/api";
import { userAuthReducer } from "./authSlice";

const store = configureStore({
    reducer:{
        productItemStore: productItemReducer,
        userAuthStore: userAuthReducer,
        [productItemService.reducerPath]: productItemService.reducer,
        [authService.reducerPath]: authService.reducer,
        [orderService.reducerPath]: orderService.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
        .concat(productItemService.middleware)
        .concat(authService.middleware)
        .concat(orderService.middleware)
});

export type RootState = ReturnType<typeof store.getState>

export default store;