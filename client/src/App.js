import './App.css';
import React from 'react'
import { Provider } from 'react-redux'
//import { store } from './redux/store'
import store from './modules/store'
import MainRoute from './components/Routes/MainRoute'
function App() {
  return (
    <div className="App">
        <Provider store={store}>
          <MainRoute></MainRoute>
        </Provider>
    </div>
  );
}

export default App;
