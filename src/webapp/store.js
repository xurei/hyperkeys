import { createStore } from 'redux';
import reducers from './reducers';

const store = createStore(reducers, global.__REDUX_DEVTOOLS_EXTENSION__ && global.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
