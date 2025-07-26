import React from 'react'; // ⬅️ Tambahkan ini!
import { StrictMode } from 'react'
import ReactDOM from "react-dom/client"; // ⬅️ Baris penting ini harus ada!
import './index.css'
import App from './App.jsx'


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
