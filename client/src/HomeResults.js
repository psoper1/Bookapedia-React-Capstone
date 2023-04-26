import { NavLink } from 'react-router-dom';
import questionMark from '../src/imgs/question.png';

function HomeResults({ book, handleBookClick }) {
    return (
        <>
            <div key={book.id} className="col-12 cardPadding col-lg-4">
                <div className="card text-center">
                    <div className="row g-0">
                        <div className="col-6">
                            <img className="card-image card-img-top" src={book.volumeInfo.imageLinks?.smallThumbnail} alt="bookImage" />
                        </div>
                        <div className="col-6">
                            <div className="card-body">
                                <h5 className="card-title">{book.volumeInfo.title}</h5>
                                <p className="card-text">{book.volumeInfo.authors?.[0]}</p>
                                <p className="card-text text-muted">{book.volumeInfo.industryIdentifiers?.[0].type}</p>
                                <p className="card-text text-muted">{book.volumeInfo.industryIdentifiers?.[0].identifier}</p>
                                <NavLink to="/chosen-book" className="more-info-home" onClick={() => handleBookClick(book)}><img src={questionMark} alt="More Info" /></NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeResults;