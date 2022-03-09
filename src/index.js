import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MemesProvider } from './context/memes_context'
import { UserProvider } from './context/user_context'


ReactDOM.render(
  <UserProvider>
    <MemesProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </MemesProvider>
  </UserProvider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();