import { HashRouter as Router, Routes, Route } from "react-router-dom";
import About from "./About";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import MyBookshelf from "./MyBookshelf";
import Home from "./Home";
import BookDetails from "./BookDetails";
import { useState } from "react";
// import Profile from "./Profile";
import RegisterSuccess from "./RegisterSuccess";
import LogoutPage from "./LogoutPage";
import BookRandomizer from "./BookRandomizer";
import WeeklyBook from "./WeeklyBook";
import BookShelfDetails from "./BookShelfDetails";

function App() {
  const [book, setBook] = useState(null)
  const [shelfBook, setShelfBook] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  
  return (
    <>
        <Router basename="/">
          <Routes>
            <Route path="/" element={<Home book={book} setBook={setBook} setLoggedIn={setLoggedIn} loggedIn={loggedIn} />} />
            <Route path="/about" element={<About setLoggedIn={setLoggedIn} />} />
            <Route path="/login" element={<LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/my-bookshelf" element={<MyBookshelf book={book} setBook={setBook} setShelfBook={setShelfBook} setLoggedIn={setLoggedIn} />} />
            <Route path="/my-bookshelf/read" element={<MyBookshelf book={book} setBook={setBook} setShelfBook={setShelfBook}/>} setLoggedIn={setLoggedIn} />
            <Route path="/my-bookshelf/unread" element={<MyBookshelf book={book} setBook={setBook} setShelfBook={setShelfBook}/>} setLoggedIn={setLoggedIn} />
            <Route path="/chosen-book" element={<BookDetails book={book} shelfBook={shelfBook}/>} setLoggedIn={setLoggedIn} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/registration-success" element={<RegisterSuccess />} />
            <Route path="/logged-out" element={<LogoutPage />} />
            <Route path="book-randomizer" element={<BookRandomizer setLoggedIn={setLoggedIn} />} />
            <Route path="/book-of-the-week" element={<WeeklyBook setLoggedIn={setLoggedIn} />} />
            <Route path="/bookshelf-book-details" element={<BookShelfDetails shelfBook={shelfBook}/>} setLoggedIn={setLoggedIn} />
          </Routes>
        </Router>
    </>
  )
}

export default App;