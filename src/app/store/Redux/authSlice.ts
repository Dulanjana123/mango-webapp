import { createSlice } from "@reduxjs/toolkit";
import { userModel } from "../../../types/interfaces";

export const emptyUserState : userModel = {
    name: "",
    id: "",
    email: "",
};    

export const userAuthSlice = createSlice({
    name:"userAuth",
    initialState:emptyUserState,
    reducers:{
        setLoggedInUser: (state, action) => {
            state.name = action.payload.name;
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.role = action.payload.role;
        },
    },
});

export const {setLoggedInUser} = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;