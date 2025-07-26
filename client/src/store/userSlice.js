import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    name: "",
    email: "",
    avatar: "",
    mobile: "",
    verify_email: "",
    last_login_date: "",
    status: "",
    address_details: [],
    role: ""
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state._id = action.payload._id || "";
            state.name = action.payload.name || "";
            state.email = action.payload.email || "";
            state.avatar = action.payload.avatar || "";
            state.mobile = action.payload.mobile || "";
            state.verify_email = action.payload.verify_email || false;
            state.last_login_date = action.payload.last_login_date || "";
            state.status = action.payload.status || "";
            state.address_details = action.payload.address_details || [];
            state.orderHistory = action.payload.orderHistory || [];
            state.role = action.payload.role || "";
            state.createdAt = action.payload.createdAt || "";
            state.updatedAt = action.payload.updatedAt || "";
        },
        clearUserDetails: (state) => {
            state._id = "";
            state.name = "";
            state.email = "";
            state.avatar = "";
            state.mobile = "";
            state.verify_email = false;
            state.last_login_date = "";
            state.status = "";
            state.address_details = [];
            state.orderHistory = [];
            state.role = "";
            state.createdAt = "";
            state.updatedAt = "";
        },
        updateUserField: (state, action) => {
            const { field, value } = action.payload;
            if (field in state) {
                state[field] = value;
            }
        }
    }
});

export const { setUserDetails, clearUserDetails, updateUserField } = userSlice.actions;
export default userSlice.reducer;