import Logo from "./Logo";
import Nav from "./Nav";
import { useState, useEffect } from "react";

function Home() {
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
            console.log('if statement')
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

    return (
        <>
            <Nav />
            <Logo />
            <div className="form-outline">
                <form className="d-flex">
                    <input
                        id="input"
                        className="inputField form-control me-2"
                        type="text"
                    // value={searchQuery}
                    // onChange={(event) => setSearchQuery(event.target.value)}
                    />
                    <button onClick={handleClick} className="btn" type="submit">Search</button>
                </form>
            </div>
            <div className="results container text-center">
                <div className="row">
                    {clicked && searchResults.length === 0 && <p>Loading restuls or no results were found</p>}
                    {clicked && searchResults.map((book) =>
                        // <div key={book.id} className="row">
                        <div key={book.id} className="cardPadding col-md-4">
                            <div className="card text-center">
                                <img className="cardImage card-img-top" src={book.volumeInfo.imageLinks?.smallThumbnail} alt="bookImage" />
                                <div className="card-body">
                                    <h5 className="card-title">{book.volumeInfo.title}</h5>
                                    <p className="card-text">{book.volumeInfo.authors[0]}</p>
                                    <p className="card-text text-muted">{book.volumeInfo.industryIdentifiers[0].type}</p>
                                    <p className="card-text text-muted">{book.volumeInfo.industryIdentifiers[0].identifier}</p>
                                </div>
                            </div>
                        </div>
                        /* </div> */
                    )}
                </div>
            </div>


        </>
    )
}

export default Home;