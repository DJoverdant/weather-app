import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<div className="not-found">404</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
