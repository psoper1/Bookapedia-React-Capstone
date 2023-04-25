import Logo from "./Logo";
import Nav from "./Nav";

function BookShelfDetails({shelfBook, setLoggedIn}) {
    return (
        <>
        <Nav setLoggedIn={setLoggedIn} />
        <Logo />
            <div className="container">
                <div className="flex-container">
                    <div className="flex-child">
                        <img className="details-card-image card-img-top" src={shelfBook.image_link} alt="bookImage" />
                    </div>
                    <div className="flex-child text-center">
                            <h5>{shelfBook.title}</h5>
                            <p>{shelfBook.author}</p>
                            <p>{shelfBook.date_published}</p>
                            <p>{shelfBook.description}</p>
                            <a href={shelfBook.preview_link}>Preview Book!</a>
                    </div>
                </div>
                </div>
        </>
    )
}

export default BookShelfDetails;