const redux = require('redux');
let store = redux.createStore(require('./reducers'), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

module.exports = store;