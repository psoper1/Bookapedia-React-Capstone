import Logo from "./Logo";
import Nav from "./Nav";
import Results from "./Results";


function Home() {
    return (
        <>
            <Nav />
            <Logo />
            <div className="form-outline">
                <form className="d-flex">
                    <input className="inputField form-control me-2" type="search" placeholder="Search for a Book Title" aria-label="Search" />
                    <button className="btn" type="submit">Search</button>
                </form>
            </div>
            <Results />
        </>
    )
}

export default Home;