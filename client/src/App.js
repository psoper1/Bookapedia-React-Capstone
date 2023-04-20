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
import WeeklyBook from "./WeeklyBook";
import BookShelfDetails from "./BookShelfDetails";

function App() {
  const [book, setBook] = useState(null)
  const [shelfBook, setShelfBook] = useState(null)
  // const [user, setUser] = useState({
  //   password: "",
  //   passwordConf: "",
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  // })
  
  return (
    <>
        <Router basename="/">
          <Routes>
            <Route path="/" element={<Home book={book} setBook={setBook} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/my-bookshelf" element={<MyBookshelf book={book} setBook={setBook} setShelfBook={setShelfBook}/>} />
            <Route path="/chosen-book" element={<BookDetails book={book} shelfBook={shelfBook}/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/registration-success" element={<RegisterSuccess />} />
            <Route path="/logged-out" element={<LogoutPage />} />
            <Route path="book-randomizer" element={<BookRandomizer />} />
            <Route path="/book-of-the-week" element={<WeeklyBook />} />
            <Route path="/bookshelf-book-details" element={<BookShelfDetails shelfBook={shelfBook}/>} />
          </Routes>
        </Router>
    </>
  )
}

export default App;