import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';
import Logo from './Logo';
import { useGlobalState } from "../src/context/GlobalState";
import request from './services/api.request';
import { NavLink } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const BookRandomizer = ({setLoggedIn}) => {
  const [selectedBook, setSelectedBook] = useState(null);
  // eslint-disable-next-line
  const [state, dispatch] = useGlobalState();
  const [books, setBooks] = useState();

  //------------------------

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
    const storedBooks = localStorage.getItem('bookshelf');
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
    // eslint-disable-next-line
  }, [])

  const handleClick = async () => {
    const isDuplicate = books.find(newBook => newBook.title === selectedBook.volumeInfo.title);
    console.log(selectedBook.volumeInfo.title)
    if (!isDuplicate) {
      try {
        let options = {
          url: 'save-book/',
          method: 'POST',
          data: {
            title: selectedBook.volumeInfo.title,
            author: selectedBook.volumeInfo.authors[0],
            description: selectedBook.volumeInfo.description,
            date_published: selectedBook.volumeInfo.publishedDate,
            marked_read: false,
            image_link: selectedBook.volumeInfo.imageLinks?.smallThumbnail,
            saved_by: state.currentUser.user_id,
            preview_link: selectedBook.volumeInfo.previewLink
          }
        }
        let response = await request(options)
        console.log(response.data)
        toast.success(`${selectedBook.volumeInfo.title} has been added to your Bookshelf!`)
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Book already exists");
      toast.error(`${selectedBook.volumeInfo.title} is already in your Bookshelf!`)
    }
    loadBookshelf();

    // console.log('clicked')
    // console.log(state.currentUser.user_id)
    // navigate('/my-bookshelf');
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
      <div className="container-fluid">
        <div className="text-center btnDiv">
          {!selectedBook &&
        <h4 className="text-center botw">Unsure of what to read next? Let us figure that out!</h4>
          }
          {selectedBook &&
            <h4 className="text-center botw">Will it be this one?</h4>
          }
          <button className="btn bookshelfButton" onClick={getRandomBook}>Get Random Book</button>
          {selectedBook && state.currentUser &&
            <button onClick={handleClick} className="btn bookshelfButton">Add to my bookshelf!</button>
          }
          {selectedBook && !state.currentUser && <NavLink to="/login" className="btn bookshelfButton">Log in to add to your bookshelf!</NavLink>}
        </div>
        {selectedBook && (
          <div className="book-details container-fluid">
            <div key={selectedBook.id} className="cardPadding col-sm-12 col-md-6 col-lg-4">
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