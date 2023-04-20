// import Footer from "./Footer";
import Logo from "./Logo";
import Nav from "./Nav";
import { NavLink } from "react-router-dom";
import { useGlobalState } from "../src/context/GlobalState";
import request from './services/api.request';
import { useState, useEffect } from 'react';

function MyBookshelf({ book, setBook, setShelfBook }) {
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
        // console.log('clicked')
        // console.log(state.currentUser.user_id)
    }

    useEffect(() => {
        loadBookshelf()
        // eslint-disable-next-line
    }, [])

    const handleDelete = async (shelfBook) => {
        try {
            let options = {
                url: `books/${shelfBook.id}`,
                method: 'DELETE',
            }
            let response = await request(options)
            console.log(response.data)
            setData(data.filter(b => shelfBook.id !== b.id))
            // setData(response.data)
        } catch (error) {
            console.log(error);
        }
        // setData(data.filter(b => shelfBook.id !== b.id)) // you can use this line to replace line 43
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
        // console.log('clicked')
        // console.log(shelfBook.id)
        // window.location.reload(false);  // Doing this reload works but looks messy, noting this to change in the future
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
        // console.log('clicked')
        // console.log(shelfBook.id)
        // window.location.reload(false);  // Doing this reload works but looks messy, noting this to change in the future
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
            <Nav />
            <Logo />
            <div className="results container text-center">
                <div className="text-center btnDiv">
                    <button onClick={loadBookshelf} className="btn mybookshelfButton">Show All</button>
                    <button onClick={getRead} className="btn mybookshelfButton">Read</button>
                    <button onClick={getUnread} className="btn mybookShelfButton">Unread</button>
                </div>
                <div className="row">
                    {data.map((shelfBook) =>
                        <div key={shelfBook.id} className="cardPadding col-md-4">
                            <div className="card text-center">
                                <button className="delete-item" onClick={() => handleDelete(shelfBook)}>
                                    x
                                </button>
                                <img className="cardImage card-img-top" src={shelfBook.image_link} alt="bookImage" />
                                <div className="card-body">
                                    <h5 className="card-title">{shelfBook.title}</h5>
                                    <p className="card-text">{shelfBook.author}</p>
                                    {!shelfBook.marked_read &&
                                        <NavLink className="btn" onClick={() => handleRead(shelfBook)}>Mark Read</NavLink>
                                    }
                                    {shelfBook.marked_read &&
                                        <>
                                            <NavLink className="btn">Read!</NavLink>
                                            <NavLink className="btn" onClick={() => handleNotRead(shelfBook)}>Mark Unread</NavLink>
                                        </>
                                    }
                                    <NavLink to="/bookshelf-book-details" className="btn" onClick={() => handleBookClick(shelfBook)}>More Info</NavLink>
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