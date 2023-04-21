// import Footer from "./Footer";
import Logo from "./Logo";
import Nav from "./Nav";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SyncLoader from 'react-spinners/SyncLoader'

function Home({ book, setBook, setView, user }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [clicked, setClicked] = useState(false)

    const fetchSearchResults = async () => {
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=40`
        );
        const data = await response.json();
        setSearchResults(data.items || []);
    };

    useEffect(() => {
        if (document.getElementById('input').value === "") {
            // console.log('if statement')
        }
        else {
            fetchSearchResults();
        }
        // eslint-disable-next-line
    }, [searchQuery]);

    const handleClick = (e) => {
        e.preventDefault()
        setSearchQuery(document.getElementById('input').value)
        setClicked(true)
        fetchSearchResults();
    }

    const handleBookClick = (book) => {
        setBook(book);
        console.log(book)
        // console.log('in handle book function')
        // console.log(book)
    };

    const handlePageReload = () => {
        window.location.reload(false)
    }

    const override = {
        justifyContent: "center"
    }

    return (
        <>
            <Nav setView={setView} />
            <Logo />
            <div className="form-outline text-center">
                <form className="d-flex">
                    <input
                        id="input"
                        className="inputField form-control me-2"
                        type="text"
                        placeholder="Type here to search for a book! :)"
                    />
                    <button onClick={handleClick} className="btn btn2" type="submit">Search</button>
                    <button onClick={handlePageReload} className="btn btn2">Reset Search</button>
                </form>
            </div>
            <div className="results container text-center">
                <div className="row">
                    {clicked && searchResults.length === 0 && 
                    <SyncLoader 
                    color="#FFD966" 
                    cssOverride={override}
                    />}
                    {clicked && searchResults.map((book) =>
                        <div key={book.id} className="col cardPadding col-lg-4">
                            <div className="card text-center">
                                <img className="cardImage card-img-top" src={book.volumeInfo.imageLinks?.smallThumbnail} alt="bookImage" />
                                <div className="card-body">
                                    <h5 className="card-title">{book.volumeInfo.title}</h5>
                                    <p className="card-text">{book.volumeInfo.authors?.[0]}</p>
                                    <p className="card-text text-muted">{book.volumeInfo.industryIdentifiers?.[0].type}</p>
                                    <p className="card-text text-muted">{book.volumeInfo.industryIdentifiers?.[0].identifier}</p>
                                    <NavLink to="/chosen-book" className="btn stretched-link" onClick={() => handleBookClick(book)}>More Info</NavLink>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* <Footer /> */}

        </>
    )
}

export default Home;