import { NavLink } from "react-router-dom";
import { useGlobalState } from "../src/context/GlobalState";
import AuthService from "../src/services/auth.service";
import { useNavigate } from 'react-router-dom';

function Nav() {
    const [state, dispatch] = useGlobalState();
    // const [bookshelfClicked, setBookshelfClicked] = useState(false)
    let navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        AuthService.logout();
        navigate('/logged-out');
        dispatch({
            currentUserToken: null,
            currentUser: null
        })
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <NavLink to="/" className="nav-link active">Bookapedia Home</NavLink>
                    <div className="nav justify-content-end navbar-collapse" id="navbarNavAltMarkup">
                        <ul className="navbar-nav">
                            {state.currentUser &&
                            <li className="nav-item">
                                <NavLink to="/my-bookshelf" className="nav-link">My Bookshelf</NavLink>
                            </li>
                            }
                            <li className="nav-item">
                                <NavLink to="/book-randomizer" className="nav-link">Book Randomizer</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about" className="nav-link">About</NavLink>
                            </li>
                            {!state.currentUser && <li className="nav-item">
                                <NavLink to="/login" className="nav-link">Log in</NavLink>
                            </li>}
                            {state.currentUser && <><li className="nav-item">
                                <NavLink to="/profile" className="nav-link">Profile</NavLink>
                            </li>
                                <li className="nav-item">
                                    <NavLink onClick={handleLogout} className="nav-link">Log out</NavLink>
                                </li>
                            </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav;