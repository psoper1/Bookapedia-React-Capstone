import { HashRouter as Router, Routes, Route } from "react-router-dom";
import About from "./About";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import MyBookshelf from "./MyBookshelf";
import Home from "./Home";
import BookDetails from "./BookDetails";
import { useState } from "react";
import Profile from "./Profile";
// import handleBookClick from "./Home";

function App() {
  const [book, setBook] = useState(null)
  return (
    <>
        <Router basename="/">
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<Home book={book} setBook={setBook} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/my-bookshelf" element={<MyBookshelf />} />
            <Route path="/chosen-book" element={<BookDetails book={book} />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
    </>
  )
}

export default App;