import React from 'react';
import Nav from './Nav';
import Logo from './Logo';
import { useGlobalState } from "../src/context/GlobalState";
import request from './services/api.request';
// import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';

const BookDetails = ({ book, shelfBook }) => {
    // eslint-disable-next-line
    const [state, dispatch] = useGlobalState();
    // let navigate = useNavigate();
    const [books, setBooks] = useState();

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
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Book already exists");
            toast.error(`${book?.volumeInfo?.title} is already in your Bookshelf!`)
        }

        // console.log('clicked')
        // console.log(state.currentUser.user_id)
        // navigate('/my-bookshelf');
    }

    // const handleModal = () => {
    //     navigate('/my-bookshelf');
    // }

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
            {state.currentUser &&
                <div className="text-center btnDiv">
                    <button onClick={handleClick} className="btn bookshelfButton">Add to my bookshelf!</button>
                </div>
            }
            {book &&
                <div className="book-details text-center">
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
                </div>}
        </>
    );
};

export default BookDetails;