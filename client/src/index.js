import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Message from './Message';
import Nav from './Nav';
import Music from './Music';

ReactDOM.render(
  <React.StrictMode>
    <Nav />
    <Message />
    <Music />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
