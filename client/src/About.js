// import Footer from "./Footer";
import Logo from "./Logo";
import Nav from "./Nav";

function About() {
    return (
        <>
            <Nav />
            <Logo />
            <h2 className="text-center">About Us</h2>
            <div className="container">
                    <h3 className="text-center">
                        Bookapedia is a website that allows you to search through the vast amount of books from the Google Books API. Traverse a fresh modern UI,
                        find books to purchase and save books to your own personal virtual bookshelf!
                        </h3> 
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default About;