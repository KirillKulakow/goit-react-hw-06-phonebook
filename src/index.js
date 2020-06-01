import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import { store } from './redux/store';
import { storeToolKit } from './redux/modules/store';
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={storeToolKit}>
      <App />
    </Provider>,
  document.getElementById('root')
);
