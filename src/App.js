import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from "./pages/Quiz";
import './index.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/result" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;
