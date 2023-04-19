import { HashRouter as Router, Routes, Route } from "react-router-dom";
import About from "./About";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import MyBookshelf from "./MyBookshelf";
import Home from "./Home";
import BookDetails from "./BookDetails";
import { useState } from "react";
import Profile from "./Profile";
import RegisterSuccess from "./RegisterSuccess";
import LogoutPage from "./LogoutPage";
import BookRandomizer from "./BookRandomizer";
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
            <Route path="/my-bookshelf" element={<MyBookshelf book={book} setBook={setBook} />} />
            <Route path="/chosen-book" element={<BookDetails book={book} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/registration-success" element={<RegisterSuccess />} />
            <Route path="/logged-out" element={<LogoutPage />} />
            <Route path="book-randomizer" element={<BookRandomizer />} />
          </Routes>
        </Router>
    </>
  )
}

export default App;