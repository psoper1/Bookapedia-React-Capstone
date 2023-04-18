// import Footer from "./Footer";
import Logo from "./Logo";
import Nav from "./Nav";
import { useGlobalState } from "../src/context/GlobalState";
// import axios from 'axios';
import request from './services/api.request';
import { useState, useEffect } from 'react';
// import { NavLink } from "react-router-dom";

function MyBookshelf() {
    // eslint-disable-next-line
    const [state, dispatch] = useGlobalState();
    const [data, setData] = useState([]);

    const loadBookshelf = async () => {
        try {
            let options = {
                url: `my-books/`,
                method: 'GET',
            }
            let response = await request(options)
            console.log(response.data)
            setData(response.data)
        } catch (error) {
            console.log(error);
        }
        console.log('clicked')
        console.log(state.currentUser.user_id)
    }

    useEffect(() => {
        loadBookshelf()
        // eslint-disable-next-line
    }, [])

    const handleDelete = async () => {
        console.log('clicked')
    }


    return (
        <>
            <Nav />
            <Logo />
            <div className="results container text-center">
                <div className="row">
                    {data.map((shelfBook) =>
                        <div key={shelfBook.id} className="cardPadding col-md-4">
                            <div className="card text-center">
                            <button className="delete-item" onClick={handleDelete}>
                                x
                            </button>
                                <img className="cardImage card-img-top" src={shelfBook.image_link} alt="bookImage" />
                                <div className="card-body">
                                    <h5 className="card-title">{shelfBook.title}</h5>
                                    <p className="card-text">{shelfBook.author}</p>
                                    {/* <p className="card-text text-muted">{book.industryIdentifiers[0].type}</p>
                            <p className="card-text text-muted">{book.industryIdentifiers[0].identifier}</p> */}
                                    {/* <NavLink to="/chosen-book" className="btn stretched-link" onClick={() => handleBookClick(book)}>More Info</NavLink> */}
                                </div>
                            </div>
                        </div>)}
                </div>
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default MyBookshelf;