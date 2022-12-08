import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  error: "",
  loading: false,
  filter: {
    searchTerm: "",
    role: "",
  },
  employees: [],
};
const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    getEmployee(state) {
      state.loading = true;
    },
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
  filter: (state) => state["employee"].filter,
};
const employeeReducer = employeeSlice.reducer;

export default employeeReducer;
