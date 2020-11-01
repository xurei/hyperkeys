import { combineReducers } from 'redux';
import macros from './macros';
import metadatas from './metadatas';
import latestRelease from './latest-release';

const App = combineReducers({
    macros,
    metadatas,
    latestRelease,
});

export default App;
