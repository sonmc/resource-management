import { createSlice } from '@reduxjs/toolkit';
import { layoutTypes, leftSidebarTypes, layoutModeTypes, layoutWidthTypes, layoutPositionTypes, topbarThemeTypes, leftsidbarSizeTypes, leftSidebarViewTypes } from '../../Components/constants/layout';
const initialState = {
    layoutType: layoutTypes.HORIZONTAL,
    leftSidebarType: leftSidebarTypes.DARK,
    layoutModeType: layoutModeTypes.LIGHTMODE,
    layoutWidthType: layoutWidthTypes.FLUID,
    layoutPositionType: layoutPositionTypes.FIXED,
    topbarThemeType: topbarThemeTypes.LIGHT,
    leftsidbarSizeType: leftsidbarSizeTypes.DEFAULT,
    leftSidebarViewType: leftSidebarViewTypes.DEFAULT,
};

const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        changeLayout(state, { payload }) {
            state.layoutType = payload;
        },
        changeLayoutMode(state, { payload }) {
            state.layoutModeType = payload;
        },
        changeSidebarTheme(state, { payload }) {
            state.leftSidebarType = payload;
        },
        changeLayoutWidth(state, { payload }) {
            state.layoutWidthType = payload;
        },
        changeLayoutPosition(state, { payload }) {
            state.layoutPositionType = payload;
        },
        changeTopbarTheme(state, { payload }) {
            state.topbarThemeType = payload;
        },

        changeLeftsidebarSizeType(state, { payload }) {
            state.leftsidbarSizeType = payload;
        },

        changeLeftsidebarViewType(state, { payload }) {
            state.leftSidebarViewType = payload;
        },
    },
});

export const layoutActions = layoutSlice.actions;
export const layoutSelector = {
    layoutType: (state) => state['layout'].layoutType,
    leftSidebarType: (state) => state['layout'].leftSidebarType,
    layoutModeType: (state) => state['layout'].layoutModeType,
    layoutWidthType: (state) => state['layout'].layoutWidthType,
    layoutPositionType: (state) => state['layout'].layoutPositionType,
    topbarThemeType: (state) => state['layout'].topbarThemeType,
    leftsidbarSizeType: (state) => state['layout'].leftsidbarSizeType,
    leftSidebarViewType: (state) => state['layout'].leftSidebarViewType,
};
const layoutReducer = layoutSlice.reducer;

export default layoutReducer;
