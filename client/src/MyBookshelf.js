import Logo from "./Logo";
import Nav from "./Nav";

function MyBookshelf({ addBook }) {
    return (
        <>
        <Nav />
        <Logo />
        {console.log(addBook)}
        <div className="results container text-center">
        books will populate here / boarder for placement reference
        </div>
        </>
    )
}

export default MyBookshelf;