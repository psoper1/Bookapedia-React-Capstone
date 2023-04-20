import { NavLink } from "react-router-dom";
import { useGlobalState } from "../src/context/GlobalState";
import AuthService from "../src/services/auth.service";
import { useNavigate } from 'react-router-dom';
import request from './services/api.request';
import { useEffect, useState } from 'react';

function Nav() {
    const [state, dispatch] = useGlobalState();
    const [data, setData] = useState();
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

    const loadUser = async () => {
        try {
            let options = {
                url: `users/${state.currentUser.user_id}/`,
                method: 'GET',
            }
            let response = await request(options)
            console.log(response.data)
            setData(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadUser()
        // eslint-disable-next-line
    }, [])

    // console.log(data)

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <NavLink to="/" className="nav-link active">Bookapedia Home</NavLink>
                    <div className="nav justify-content-end navbar-collapse" id="navbarNavAltMarkup">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to="/book-of-the-week" className="nav-link">Check out the Book of the Week here!</NavLink>
                            </li>
                            {/* {console.log(user.firstName)} */}
                            {state.currentUser && data &&
                            <li className="nav-item">
                                <NavLink to="/my-bookshelf" className="nav-link">{data.first_name}'s Bookshelf</NavLink>
                            </li>
                            }
                            {/* {data.first_name} */}
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