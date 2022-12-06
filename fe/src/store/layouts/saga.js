// @flow
import { all, call, fork, takeEvery } from 'redux-saga/effects';
import { layoutActions } from './slice';

/**
 * Changes the body attribute
 */
function changeHTMLAttribute(attribute, value) {
    if (document.documentElement) document.documentElement.setAttribute(attribute, value);
    return true;
}

/**
 * Changes the layout type
 * @param {*} param0
 */
function* changeLayoutTheme({ payload }) {
    try {
        document.documentElement.removeAttribute('data-sidebar-size');
        yield call(changeHTMLAttribute, 'data-layout', payload);
    } catch (error) {
        // console.log(error);
    }
}

/**
 * Changes the layout mode
 * @param {*} param0
 */
function* changeLayoutMode({ payload }) {
    try {
        yield call(changeHTMLAttribute, 'data-layout-mode', payload);
    } catch (error) {
        // console.log(error);
    }
}

/**
 * Changes the left sidebar theme
 * @param {*} param0
 */
function* changeLeftSidebarTheme({ payload }) {
    try {
        yield call(changeHTMLAttribute, 'data-sidebar', payload);
    } catch (error) {
        // console.log(error);
    }
}

/**
 * Changes the layout width
 * @param {*} param0
 */
function* changeLayoutWidth({ payload }) {
    try {
        if (payload === 'lg') {
            yield call(changeHTMLAttribute, 'data-layout-width', 'fluid');
        } else {
            yield call(changeHTMLAttribute, 'data-layout-width', 'boxed');
        }
        // yield call(changeHTMLAttribute, "data-sidebar-size", layoutWidth);
    } catch (error) {
        // console.log(error);
    }
}

/**
 * Changes the layout position
 * @param {*} param0
 */
function* changeLayoutPosition({ payload }) {
    try {
        yield call(changeHTMLAttribute, 'data-layout-position', payload);
    } catch (error) {
        // console.log(error);
    }
}

/**
 * Changes the topbar themes
 * @param {*} param0
 */
function* changeTopbarTheme({ payload }) {
    try {
        yield call(changeHTMLAttribute, 'data-topbar', payload);
    } catch (error) {
        // console.log(error);
    }
}

/**
 * Changes the topbar themes
 * @param {*} param0
 */
function* changeLeftsidebarSizeType({ payload }) {
    try {
        switch (payload) {
            case 'lg':
                yield call(changeHTMLAttribute, 'data-sidebar-size', 'lg');
                break;
            case 'md':
                yield call(changeHTMLAttribute, 'data-sidebar-size', 'md');
                break;
            case 'sm':
                yield call(changeHTMLAttribute, 'data-sidebar-size', 'sm');
                break;
            case 'sm-hover':
                yield call(changeHTMLAttribute, 'data-sidebar-size', 'sm-hover');
                break;
            default:
                yield call(changeHTMLAttribute, 'data-sidebar-size', 'lg');
        }
    } catch (error) {
        // console.log(error);
    }
}

/**
 * Changes the topbar themes
 * @param {*} param0
 */
function* changeLeftSidebarViewType({ payload }) {
    try {
        yield call(changeHTMLAttribute, 'data-layout-style', payload);
    } catch (error) {
        // console.log(error);
    }
}

/**
 * Watchers
 */
export function* watchChangeLayoutType() {
    yield takeEvery(layoutActions.changeLayout, changeLayoutTheme);
}
export function* watchChangeLayoutMode() {
    yield takeEvery(layoutActions.changeLayoutMode, changeLayoutMode);
}
export function* watchChangeLeftSidebarTheme() {
    yield takeEvery(layoutActions.changeSidebarTheme, changeLeftSidebarTheme);
}
export function* watchChangeLayoutWidth() {
    yield takeEvery(layoutActions.changeLayoutWidth, changeLayoutWidth);
}
export function* watchChangeLayoutPosition() {
    yield takeEvery(layoutActions.changeLayoutPosition, changeLayoutPosition);
}
export function* watchChangeTopbarTheme() {
    yield takeEvery(layoutActions.changeTopbarTheme, changeTopbarTheme);
}
export function* watchChangeLeftsidebarSizeType() {
    yield takeEvery(layoutActions.changeLeftsidebarSizeType, changeLeftsidebarSizeType);
}
export function* watchChangeLeftSidebarViewType() {
    yield takeEvery(layoutActions.changeLeftsidebarViewType, changeLeftSidebarViewType);
}

function* LayoutSaga() {
    yield all([fork(watchChangeLayoutType), fork(watchChangeLeftSidebarTheme), fork(watchChangeLayoutMode), fork(watchChangeLayoutWidth), fork(watchChangeLayoutPosition), fork(watchChangeTopbarTheme), fork(watchChangeLeftsidebarSizeType), fork(watchChangeLeftSidebarViewType)]);
}

export default LayoutSaga;
