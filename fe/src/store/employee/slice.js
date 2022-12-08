import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  error: "",
  loading: false,
  employees: [],
};
const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    getEmployeeSuccess(state, { payload }) {
      state.loading = false;
      state.employees = payload;
    },

    apiError(state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const employeeActions = employeeSlice.actions;
export const employeeSelector = {
  loading: (state) => state["employee"].loading,
  error: (state) => state["employee"].error,
};
const employeeReducer = employeeSlice.reducer;

export default employeeReducer;
