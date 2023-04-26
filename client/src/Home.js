import Logo from "./Logo";
import Nav from "./Nav";
import { useState, useEffect } from "react";
import SyncLoader from 'react-spinners/SyncLoader'
import request from './services/api.request';
import HomeResults from "./HomeResults";

function Home({ setBook, setView, setLoggedIn, loggedIn }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [inputText, setInputText] = useState("");
    // eslint-disable-next-line
    const [data, setData] = useState([])

    console.log(loggedIn)

    const loadBookshelf = async () => {
        try {
            let options = {
                url: `my-books/`,
                method: 'GET',
            }
            let response = await request(options)
            console.log(response.data)
            setData(response.data)
            localStorage.setItem('bookshelf', JSON.stringify(response.data));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadBookshelf()
        // eslint-disable-next-line
    }, [])

    const fetchSearchResults = async () => {
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&maxResults=40`
        );
        const data = await response.json();
        setSearchResults(data.items || []);
        localStorage.setItem('searchResults', JSON.stringify(data.items));
    };

    const savedSearchResults = localStorage.getItem('searchResults');
    useEffect(() => {
        if (savedSearchResults) {
            setSearchResults(JSON.parse(savedSearchResults));
        }
        // eslint-disable-next-line
    }, []);

    window.addEventListener('beforeunload', (event) => {
        if (event.persisted) {
            event.preventDefault();
            return;
        }
        localStorage.removeItem('searchResults');
    })

    useEffect(() => {
        if (document.getElementById('input').value === "") {
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
    };

    const handlePageReload = () => {
        localStorage.removeItem('searchResults');
        setSearchResults([])
        setClicked(false)
        setInputText("")
    }

    const override = {
        justifyContent: "center"
    }

    return (
        <>
            <Nav setView={setView} setLoggedIn={setLoggedIn} />
            <Logo />
            <div className="form-outline text-center container">
                <form className="row justify-content-center">
                    <div className="col-12">
                        <input
                            id="input"
                            className="inputField form-control mx-auto mb-2"
                            type="text"
                            placeholder="Type here to search for a book! :)"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                        />
                    </div>
                    <div className="col-12 d-flex flex-row justify-content-center">
                        <button onClick={handleClick} className="btn btn2" type="submit">Search</button>
                        <button onClick={handlePageReload} className="btn btn2">Clear</button>
                    </div>
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
                        <HomeResults book={book} handleBookClick={handleBookClick} />
                    )}
                    {searchResults && searchResults.map((book) =>
                        <HomeResults book={book} handleBookClick={handleBookClick} />
                    )}
                </div>
            </div>
        </>
    )
}

export default Home;