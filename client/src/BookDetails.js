import React from 'react';
import Nav from './Nav';
import Logo from './Logo';
import { useGlobalState } from "../src/context/GlobalState";
import request from './services/api.request';
import { useNavigate } from 'react-router-dom';

const BookDetails = ({ book, shelfBook }) => {
    // eslint-disable-next-line
    const [state, dispatch] = useGlobalState();
    let navigate = useNavigate();

    const handleClick = async () => {
        try {
            // going to edit - Josh
            // This is the same thing as you have on lines 31-40 however
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
                    saved_by: state.currentUser.user_id
                }
            }
            let response = await request(options)
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
        console.log('clicked')
        console.log(state.currentUser.user_id)
        navigate('/my-bookshelf');
    }


    return (
        <>
            <Nav />
            <Logo />
            {state.currentUser &&
            <div className="text-center btnDiv">
                <button onClick={handleClick} className="btn bookshelfButton">Add to my bookshelf!</button>
            </div>
            }
            {book &&
                <div className="book-details">
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