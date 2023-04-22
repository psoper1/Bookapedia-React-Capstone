import React, { useState, useEffect } from 'react';
import { useGlobalState } from "../src/context/GlobalState";
import request from './services/api.request';
import axios from 'axios';
import Nav from './Nav';
import Logo from './Logo';
import { NavLink } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import SyncLoader from 'react-spinners/SyncLoader'

const WeeklyBook = () => {
    const [book, setBook] = useState(null);
    // eslint-disable-next-line
    const [state, dispatch] = useGlobalState();
    const [books, setBooks] = useState();

    const loadBookshelf = async () => {
        try {
            let options = {
                url: `my-books/`,
                method: 'GET',
            }
            let response = await request(options)
            console.log(response.data)
            setBooks(response.data)
            localStorage.setItem('bookshelf', JSON.stringify(response.data));
        } catch (error) {
            console.log(error);
        }
        // console.log('clicked')
        // console.log(state.currentUser.user_id)
    }

    useEffect(() => {
        loadBookshelf()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const storedBooks = localStorage.getItem('bookshelf');
        if (storedBooks) {
            setBooks(JSON.parse(storedBooks));
        }
    }, []);

    const handleClick = async () => {
        const isDuplicate = books.find(newBook => newBook.title === book?.volumeInfo?.title);
        if (!isDuplicate) {
            try {
                let options = {
                    url: 'save-book/',
                    method: 'POST',
                    data: {
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
                toast.success(`${book.volumeInfo.title} has been added to your Bookshelf!`)
                loadBookshelf()
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Book already exists");
            toast.error(`${book?.volumeInfo?.title} is already in your Bookshelf!`)
        }

        // console.log('clicked')
        // console.log(state.currentUser.user_id)
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

    const override = {
        justifyContent: "center"
    }

    if (!book) {
        return <div className="text-center" style={{ padding: "300px 0" }}><SyncLoader
            color="#FFD966"
            cssOverride={override}
        /></div>;
    }

    return (
        <>
            <Nav />
            <div>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                    toastOptions={{
                        style: {
                            background: '#fff6db'
                        }
                    }}
                />
            </div>
            <Logo />
            <h1 className="text-center">Random Book of the Week</h1>
            {book && !state.currentUser && <div className="text-center btnDiv">
                <NavLink to="/login" className="btn bookshelfButton">Log in to add to your bookshelf!</NavLink>
            </div>}
            {book && state.currentUser &&
                <div className="text-center btnDiv">
                    <button onClick={handleClick} className="btn bookshelfButton">Add to my bookshelf!</button>
                </div>
            }
            <div key={book.id} className="weekly-book cardPadding col-md-4">
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