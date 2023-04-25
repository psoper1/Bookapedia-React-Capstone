// import Footer from "./Footer";
import Logo from "./Logo";
import Nav from "./Nav";
import { NavLink } from "react-router-dom";
import { useGlobalState } from "../src/context/GlobalState";
import request from './services/api.request';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import xbutton from '../src/imgs/x-button.png';

function MyBookshelf({ book, setBook, setShelfBook, setLoggedIn }) {
    // eslint-disable-next-line
    const [state, dispatch] = useGlobalState();
    const [data, setData] = useState([]);
    const [books, setBooks] = useState([])

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

    const handleDelete = async (shelfBook) => {
        const bookIndex = books.findIndex(book => book.title === shelfBook.title);

        if (bookIndex !== -1) {
            const updatedBooks = [...books.slice(0, bookIndex), ...books.slice(bookIndex + 1)];
            localStorage.setItem('bookshelf', JSON.stringify(updatedBooks));
            setBooks(updatedBooks);
        } else {
            console.log('Book not found in the bookshelf');
        }
        try {
            let options = {
                url: `books/${shelfBook.id}`,
                method: 'DELETE',
            }
            let response = await request(options)
            console.log(response.data)
            setData(data.filter(b => shelfBook.id !== b.id))
            toast.success(`${shelfBook.title} has been removed to your Bookshelf!`)
        } catch (error) {
            console.log(error);
        }
        // console.log('clicked')
        // console.log(shelfBook.id)
    }

    const handleRead = async (shelfBook) => {
        console.log('in handleRead')
        try {
            let options = {
                url: `books/${shelfBook.id}/`,
                method: 'PATCH',
                data: {
                    marked_read: true
                }
            }
            let response = await request(options)
            console.log(response.data)
            setData(response.data)
        } catch (error) {
            console.log(error);
        }
        setData(data.filter(b => shelfBook.id !== b.id))
        loadBookshelf()
        // console.log('clicked')
        // console.log(shelfBook.id)
    }

    const handleNotRead = async (shelfBook) => {
        console.log('in handleRead')
        try {
            let options = {
                url: `books/${shelfBook.id}/`,
                method: 'PATCH',
                data: {
                    marked_read: false
                }
            }
            let response = await request(options)
            console.log(response.data)
            setData(response.data)
        } catch (error) {
            console.log(error);
        }
        setData(data.filter(b => shelfBook.id !== b.id))
        loadBookshelf()
        // console.log('clicked')
        // console.log(shelfBook.id)
    }

    const getRead = async () => {
        try {
            let options = {
                url: `read-books/`,
                method: 'GET',
            }
            let response = await request(options)
            console.log(response.data)
            setData(response.data)
        } catch (error) {
            console.log(error);
        }
        // console.log('clicked')
        // console.log(data)
    }

    const getUnread = async () => {
        try {
            let options = {
                url: `unread-books/`,
                method: 'GET',
            }
            let response = await request(options)
            console.log(response.data)
            setData(response.data)
        } catch (error) {
            console.log(error);
        }
        // console.log('clicked')
        // console.log(data)
    }

    const handleBookClick = (shelfBook) => {
        setShelfBook(shelfBook);
        // console.log('in handle book function')
        // console.log(shelfBook)
    };


    return (
        <>
            <div className="bgImage">
                <Nav setLoggedIn={setLoggedIn} />
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
                <div className="results container text-center">
                    <div className="text-center btnDiv">
                        <NavLink to="/my-bookshelf" onClick={loadBookshelf} className="btn bookshelfButton">Show All</NavLink>
                        <NavLink to="/my-bookshelf/read" onClick={getRead} className="btn bookshelfButton">Read</NavLink>
                        <NavLink to="/my-bookshelf/unread" onClick={getUnread} className="btn bookshelfButton">Unread</NavLink>
                    </div>
                    <div className="row">
                        {data.map((shelfBook) =>
                        <div key={shelfBook.id} className="col-12 cardPadding col-lg-4">
                            <div className="card text-center">
                                <div className="row g-0">
                                    <div className="col-6">
                                        <img className="card-image card-img-top" src={shelfBook.image_link} alt="bookImage" />
                                    </div>
                                    <div className="col-6">
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{shelfBook.title}</h5>
                                            <p className="card-text">{shelfBook.author}</p>
                                            {shelfBook.marked_read &&
                                            <p>Read!</p>
                                            }
                                            <div className="bookshelf-buttons">
                                            {!shelfBook.marked_read &&
                                        <NavLink className="btn btn-sm mark-read" onClick={() => handleRead(shelfBook)}>Mark Read</NavLink>
                                    }
                                    {shelfBook.marked_read &&
                                        <>
                                            {/* <NavLink className="btn btn-sm read">Read!</NavLink> */}
                                            <NavLink className="btn btn-sm mark-unread" onClick={() => handleNotRead(shelfBook)}>Mark Unread</NavLink>
                                        </>
                                    }
                                    <NavLink to="/bookshelf-book-details" className="btn btn-sm more-info" onClick={() => handleBookClick(shelfBook)}>More Info</NavLink>
                                            {/* <button className="random-button" onClick={() => handleDelete(shelfBook)}>
                                                <img className="delete-item" src={xbutton} alt="delete"/>
                                            </button> */}
                                        </div>
                                        <button className="random-button" onClick={() => handleDelete(shelfBook)}>
                                                <img className="delete-item" src={xbutton} alt="delete"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        </>
    )
}

export default MyBookshelf;