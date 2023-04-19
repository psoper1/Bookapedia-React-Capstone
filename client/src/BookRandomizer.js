import React, { useState } from 'react';
import axios from 'axios';
import Nav from './Nav';
import Logo from './Logo';
import { useGlobalState } from "../src/context/GlobalState";
import request from './services/api.request';

const BookRandomizer = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  // eslint-disable-next-line
  const [state, dispatch] = useGlobalState();

    const handleClick = async () => {
        try {
            // going to edit - Josh
            // it is utilizing the AuthService and some other cool axios features to 
            // send your credentials of your logged in user to the backend.
            let options = {
                url: 'save-book/', // because you have API_URL defined in api.constants, this just attaches to the end of it
                method: 'POST', // This makes the request set up to be axios.post()
                data: { // this is everything that you want to send to the backend
                    title: selectedBook.volumeInfo.title,
                    author: selectedBook.volumeInfo.authors[0],
                    description: selectedBook.volumeInfo.description,
                    // genre: book.volumeInfo.categories[0],
                    date_published: selectedBook.volumeInfo.publishedDate,
                    marked_read: false,
                    image_link: selectedBook.volumeInfo.imageLinks?.smallThumbnail,
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
    }

  const getRandomBook = async () => {
    const response = await axios.get(
      'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=40'
    );
    const books = response.data.items;
    const randomIndex = Math.floor(Math.random() * books.length);
    const selected = books[randomIndex];
    setSelectedBook(selected);
  };

  return (
    <>
    <Nav />
    <Logo />
    <div>
    <div className="text-center btnDiv">
      <button className="btn bookshelfButton" onClick={getRandomBook}>Get Random Book</button>
      {selectedBook && <button onClick={handleClick} className="btn bookshelfButton">Add to my bookshelf!</button>}
      </div>
      {selectedBook && (
        <div className="book-details">
        <div key={selectedBook.id} className="cardPadding col-md-4">
            <div className="details-card text-center">

                <img className="cardImage card-img-top" src={selectedBook.volumeInfo.imageLinks?.smallThumbnail} alt="bookImage" />
                <div className="card-body">
                    <h5 className="card-title">{selectedBook.volumeInfo.title}</h5>
                    <p className="card-text">{selectedBook.volumeInfo.authors[0]}</p>
                    <p className="card-text text-muted">{selectedBook.volumeInfo.industryIdentifiers[0].type}</p>
                    <p className="card-text text-muted">{selectedBook.volumeInfo.industryIdentifiers[0].identifier}</p>
                    <p className="card-text">{selectedBook.volumeInfo.publisher}</p>
                    <p className="card-text">{selectedBook.volumeInfo.publishedDate}</p>
                    <p className="card-text">{selectedBook.volumeInfo.description}</p>
                    <a href={selectedBook.volumeInfo.previewLink}>Preview Book!</a>
                </div>
            </div>
        </div>
    </div>
      )}
    </div>
    </>
  );
};

export default BookRandomizer;