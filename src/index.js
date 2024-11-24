// // src/index.js
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './index.css';
// import { UserProvider } from './UserContext';  // นำเข้า UserProvider
// import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <UserProvider>
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//       </Routes>
//     </Router>
//   </UserProvider>
// );

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UserProvider } from './UserContext';  // นำเข้า UserProvider

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>  {/* ห่อแอปด้วย UserProvider */}
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

