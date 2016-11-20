import { combineReducers } from 'redux';
import keybinds from './keybinds';

const App = combineReducers({
	keybinds,
});

module.exports = App;