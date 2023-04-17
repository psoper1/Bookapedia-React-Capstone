import { NavLink, Navigate } from "react-router-dom";
import { useGlobalState } from "../src/context/GlobalState";
import AuthService from "../src/services/auth.service";
import { useNavigate } from 'react-router-dom';

function Nav() {
    const [ state, dispatch ] = useGlobalState();
    let navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        AuthService.logout();
        navigate('/');
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
                        <li className="nav-item">
                            {/* Will check if they are logged in, if not, will route user to the Log in page */}
                                <NavLink to="/my-bookshelf" className="nav-link">My Bookshelf</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about" className="nav-link">About</NavLink>
                            </li>
                            {!state.currentUser && <li className="nav-item">
                                 <NavLink to="/login" className="nav-link">Log in</NavLink>
                            </li>}
                            {state.currentUser && <li className="nav-item">
                                 <NavLink to="/profile" className="nav-link">Profile</NavLink>
                                 <NavLink onClick={handleLogout} className="nav-link">Log out</NavLink>
                            </li>}
                        </ul>
                    </div>
                    {/* <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form> */}
                </div>
            </nav>
        </>
    )
}

export default Nav;