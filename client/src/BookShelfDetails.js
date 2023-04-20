import Logo from "./Logo";
import Nav from "./Nav";

function BookShelfDetails({shelfBook}) {
    return (
        <>
        <Nav />
        <Logo />
        <div className="book-details">
                <div key={shelfBook.id} className="cardPadding col-md-4">
                    <div className="details-card text-center">

                        <img className="cardImage card-img-top" src={shelfBook.image_link} alt="bookImage" />
                        <div className="card-body">
                            <h5 className="card-title">{shelfBook.title}</h5>
                            <p className="card-text">{shelfBook.author}</p>
                            {/* <p className="card-text text-muted">{shelfBook.volumeInfo.industryIdentifiers[0].type}</p>
                            <p className="card-text text-muted">{shelfBook.volumeInfo.industryIdentifiers[0].identifier}</p> */}
                            {/* <p className="card-text">{shelfBook.volumeInfo.publisher}</p> */}
                            <p className="card-text">{shelfBook.date_published}</p>
                            <p className="card-text">{shelfBook.description}</p>
                            {shelfBook.preview_link &&
                                <a href={shelfBook.preview_link}>Preview Book!</a>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookShelfDetails;