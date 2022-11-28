import { combineReducers } from 'redux';

// Front
import Layout from './layouts/reducer';

// Authentication
import Auth from './auth/reducer';

//Form advanced

const rootReducer = combineReducers({
    // public
    Layout,
    Auth,
});

export default rootReducer;
