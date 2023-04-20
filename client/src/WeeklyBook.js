import React, { useState, useEffect } from 'react';
import { useGlobalState } from "../src/context/GlobalState";
import request from './services/api.request';
import axios from 'axios';
import Nav from './Nav';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';

const WeeklyBook = () => {
    const [book, setBook] = useState(null);
    // eslint-disable-next-line
    const [state, dispatch] = useGlobalState();
    let navigate = useNavigate();

    const handleClick = async () => {
        try {
            // going to edit - Josh
            // it is utilizing the AuthService and some other cool axios features to 
            // send your credentials of your logged in user to the backend.
            let options = {
                url: 'save-book/', // because you have API_URL defined in api.constants, this just attaches to the end of it
                method: 'POST', // This makes the request set up to be axios.post()
                data: { // this is everything that you want to send to the backend
                    title: book.volumeInfo.title,
                    author: book.volumeInfo.authors[0],
                    description: book.volumeInfo.description,
                    date_published: book.volumeInfo.publishedDate,
                    marked_read: false,
                    image_link: book.volumeInfo.imageLinks?.smallThumbnail,
                    saved_by: state.currentUser.user_id,
                    preview_link: book.volumeInfo.previewLink
                }
            }
            let response = await request(options)
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
        // console.log('clicked')
        // console.log(state.currentUser.user_id)
        navigate('/my-bookshelf');
    }

    useEffect(() => {
        const fetchWeeklyBook = async () => {
            const response = await axios.get(
                'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=40'
            );
            const books = response.data.items;
            const randomIndex = Math.floor(Math.random() * books.length);
            const selectedBook = books[randomIndex];

            const lastUpdated = localStorage.getItem('lastUpdated');
            const now = Date.now();
            const oneWeek = 604800000;
            if (!lastUpdated || now - lastUpdated > oneWeek) {
                localStorage.setItem('book', JSON.stringify(selectedBook));
                localStorage.setItem('lastUpdated', now);
                setBook(selectedBook);
            } else {
                const storedBook = JSON.parse(localStorage.getItem('book'));
                setBook(storedBook);
            }
        };

        fetchWeeklyBook();

        const interval = setInterval(() => {
            fetchWeeklyBook();
        }, 604800000);

        return () => clearInterval(interval);
    }, []);

    if (!book) {
        return <div className="text-center">Loading Book of the Week...</div>;
    }

    return (
        <>
            <Nav />
            <Logo />
            {/* {
                !book &&
                <div className="text-center">Loading...</div>
            } */}
            <h1 className="text-center">Random Book of the Week</h1>
            {book && <div className="text-center btnDiv">
                <button onClick={handleClick} className="btn bookshelfButton">Add to my bookshelf!</button>
            </div>}
            <div key={book.id} className="cardPadding col-md-4">
                <div className="details-card text-center">

                    <img className="cardImage card-img-top" src={book.volumeInfo.imageLinks?.smallThumbnail} alt="bookImage" />
                    <div className="card-body">
                        <h5 className="card-title">{book.volumeInfo.title}</h5>
                        <p className="card-text">{book.volumeInfo.authors[0]}</p>
                        <p className="card-text text-muted">{book.volumeInfo.industryIdentifiers[0].type}</p>
                        <p className="card-text text-muted">{book.volumeInfo.industryIdentifiers[0].identifier}</p>
                        <p className="card-text">{book.volumeInfo.publisher}</p>
                        <p className="card-text">{book.volumeInfo.publishedDate}</p>
                        <p className="card-text">{book.volumeInfo.description}</p>
                        <a href={book.volumeInfo.previewLink}>Preview Book!</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WeeklyBook;