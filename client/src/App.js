import { HashRouter as Router, Routes, Route } from "react-router-dom";
import About from "./About";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import MyBookshelf from "./MyBookshelf";
import Home from "./Home";

function App() {
    return (
        <>
      <Router basename="/">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/my-bookshelf" element={<MyBookshelf />} />
        </Routes>
      </Router>
    </>
    )
}

export default App;