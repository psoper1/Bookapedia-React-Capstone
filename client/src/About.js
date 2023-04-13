import Logo from "./Logo";
import Nav from "./Nav";

function About() {
    return (
        <>
        <Nav />
        <Logo />
        <h2 className="text-center">About Us</h2>
        <div className="container">
            <div className="about card">
        <h3 className="text-center">Bookapedia is a website that allows you to search through the vast amount of books from the Google Books API. Traverse a fresh, modern UI,
        find books to purchase and save books to your wishlist for later!</h3>
        </div>
        </div>
        </>
    )
}

export default About;