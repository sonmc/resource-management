import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  layoutType: "horizontal",
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    changeLayout(state, { payload }) {},
  },
});

export const layoutActions = layoutSlice.actions;
export const layoutSelector = {
  layoutType: (state) => state["layout"].layoutType,
};
const layoutReducer = layoutSlice.reducer;

export default layoutReducer;
