import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store, { persistor } from './reduct/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider } from 'antd';
import App from './App';
import zhCN from 'antd/lib/locale/zh_CN';
import reportWebVitals from './reportWebVitals';
import md5 from 'js-md5'
import PubSub from 'pubsub-js';
import './index.css';
import './assets/css/common.css';




// React.$md5 = md5
// React.$PubSub = PubSub
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <ConfigProvider>
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <App />
//       </PersistGate>
//     </Provider>
//   </ConfigProvider>
// );
// reportWebVitals();
React.$md5 = md5
React.$PubSub = PubSub
ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
);