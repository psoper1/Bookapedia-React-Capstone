import Logo from "./Logo";
import Nav from "./Nav";

function About({ setLoggedIn }) {
    return (
        <>
            <Nav setLoggedIn={setLoggedIn} />
            <Logo />
            <h2 className="text-center botw">About Us</h2>
            <div className="container">
                <h3 className="text-center auText">
                    Bookapedia is a website that allows you to search through the vast amount of books from the Google Books API. Traverse a fresh modern UI,
                    find books to purchase and save books to your personal virtual bookshelf!
                </h3>
                <br></br>
                <br></br>
                <br></br>
                <h3 className="text-center auText">
                    Unsure of what to read next? Check out our Book of the Week and our Book Randomizer!
                </h3>

            </div>
        </>
    )
}

export default About;