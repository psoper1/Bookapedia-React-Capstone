import { HashRouter as Router, Routes, Route } from "react-router-dom";
import About from "./About";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import MyBookshelf from "./MyBookshelf";
import Home from "./Home";
import BookDetails from "./BookDetails";
import { useState } from "react";
import RegisterSuccess from "./RegisterSuccess";
import LogoutPage from "./LogoutPage";
import BookRandomizer from "./BookRandomizer";
import WeeklyBook from "./WeeklyBook";
import BookShelfDetails from "./BookShelfDetails";
import Categories from "./pages/Categories/Categories";
import Page from "./pages/Page";
import Category from "./pages/Category";

function App() {
  const [book, setBook] = useState(null);
  const [shelfBook, setShelfBook] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  
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
            <Route path="/chosen-book" element={<BookDetails book={book} shelfBook={shelfBook}/>} setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
            <Route path="/registration-success" element={<RegisterSuccess />} />
            <Route path="/logged-out" element={<LogoutPage />} />
            <Route path="book-randomizer" element={<BookRandomizer setLoggedIn={setLoggedIn} loggedIn={{loggedIn}} />} />
            <Route path="/book-of-the-week" element={<WeeklyBook />} />
            <Route path="/bookshelf-book-details" element={<BookShelfDetails shelfBook={shelfBook}/>} setLoggedIn={setLoggedIn} />
            <Route path="/categories" element={<Page><Categories /></Page>} />
            <Route path="/categories/:category" element={<Page><Category /></Page>} />
          </Routes>
        </Router>
    </>
  )
}

export default App;