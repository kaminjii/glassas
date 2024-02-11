import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { canvas } from "./Game";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartLore from "./start_lore";

const root = ReactDOM.createRoot(document.getElementById("root"));
document.body.appendChild(canvas)
root.render(
<React.StrictMode>
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/startlore" element={<StartLore />} />
        </Routes>
    </Router>
    </React.StrictMode>
    );



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
