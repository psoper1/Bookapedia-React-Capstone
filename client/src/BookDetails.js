import React from 'react';
import Nav from './Nav';
import Logo from './Logo';

const BookDetails = ({ book }) => {
    return (
        <>
            <Nav />
            <Logo />
            <div className="book-details">
                <div key={book.id} className="cardPadding col-md-4">
                <button className="btn justify-content-center">Add to my bookshelf!</button>
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
            </div>
        </>
    );
};

export default BookDetails;