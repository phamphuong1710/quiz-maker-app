import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import Quiz from "./pages/Quiz";
import './index.scss';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/result" element={<Quiz />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
