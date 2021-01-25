import './App.css';
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Register from './components/Auth/Register/Register'
import Login from './components/Auth/Login/Login'
import { Provider } from 'react-redux'
import { store } from './redux/store'
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Route component={Login} path="/login"></Route>
          <Route component={Register} path="/register"></Route>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
