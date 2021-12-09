import { createStore } from 'redux';
import rootReducer from './reducers/index';
const middleware = {}//such as saga or thunk
const store = createStore(
    rootReducer,
    middleware,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;