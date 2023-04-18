// import Footer from "./Footer";
import Logo from "./Logo";
import Nav from "./Nav";
import { useGlobalState } from "../src/context/GlobalState";
import axios from 'axios';
import request from './services/api.request';

function MyBookshelf() {
    const [state, dispatch] = useGlobalState();

    const loadBookshelf = async () => {
        try {
            // going to edit - Josh
            // This is the same thing as you have on lines 31-40 however
            // it is utilizing the AuthService and some other cool axios features to 
            // send your credentials of your logged in user to the backend.
            let options = {
                url: `my-books/`, // because you have API_URL defined in api.constants, this just attaches to the end of it
                method: 'GET', // This makes the request set up to be axios.post()
            }
            let response = await request(options)
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
        console.log('clicked')
        console.log(state.currentUser.user_id)
    }
    loadBookshelf();

    return (
        <>
        <Nav />
        <Logo />
        
        <div className="results container text-center">
        books will populate here / boarder for placement reference
        
        </div>
        {/* <Footer /> */}
        </>
    )
}

export default MyBookshelf;