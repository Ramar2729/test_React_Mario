import './App.css';
import Navigator from './containers/Navigator';
import { Provider } from 'react-redux';
import AppStore from './redux/store';

function App() {
  return (
    <Provider store={AppStore}>
      <div className="App">
        <Navigator/>
      </div>
    </Provider>
  );
}

export default App;
