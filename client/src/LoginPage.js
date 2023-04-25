import Logo from "./Logo";
import Nav from "./Nav";
import athena from "../src/imgs/athena.webp"
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react"
import AuthService from "../src/services/auth.service";
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from "../src/context/GlobalState";
import jwtDecode from "jwt-decode";
import { Toaster } from 'react-hot-toast';
// import Footer from "./Footer";



function LoginPage({loggedIn, setLoggedIn}) {
    let navigate = useNavigate();
    // eslint-disable-next-line
    const [state, dispatch] = useGlobalState();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        // console.log("clicked")
        e.preventDefault();

        AuthService
            .login(email, password)
            .then(async (resp) => {
                let data = jwtDecode(resp.access)
                await dispatch({
                    currentUserToken: resp.access,
                    currentUser: data
                })
                // console.log('after login')
                // console.log(data)
                // console.log('after login')
                // navigate('/')
                setLoggedIn(true)
            });
    }

    useEffect(() => {
        if (loggedIn) {
        const timer = setTimeout(() => {
          navigate('/');
        }, 2000);
        return () => clearTimeout(timer);
    }
      }, [navigate, loggedIn]);

    return (
        <>
            <Nav />
            <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: '#fff6db'
            }
          }}
        />
            <section className="vh-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6 text-black">

                            <div className="px-5 ms-xl-4">
                                <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"></i>
                                <Logo />
                            </div>

                            <div className="container d-flex mx-auto mb-2">

                                {!loggedIn && 
                                <form id="formstyle" onSubmit={handleLogin}>

                                    <h3 id="h3style" className="fw-normal mb-3 pb-3">Log in</h3>

                                    <div className="form-outline mb-4">
                                        <input
                                            type="email"
                                            id="email"
                                            className="form-control form-control-lg"
                                            name="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            placeholder="Email Address"
                                        />

                                        <label className="form-label" htmlFor="email"></label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input
                                            type="password"
                                            id="password"
                                            className="form-control form-control-lg"
                                            name="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            placeholder="Password"
                                        />

                                        <label className="form-label" htmlFor="password"></label>
                                    </div>

                                    <div className="pt-1 mb-4">
                                        <input className="btn btn-info btn-lg" type="submit" value="Sign in" />
                                    </div>

                                    <p>Don't have an account? <NavLink to="/register" className="link-secondary">Register here</NavLink></p>

                                </form>}
                                {loggedIn && <div className="mx-auto">Thank you for logging in! Redirecting to the Home page of Bookapedia!</div>}

                            </div>

                        </div>
                        <div className="col-sm-6 px-0 d-none d-sm-block">
                            <img id="loginimage" src={athena}
                                alt="Login" className="w-100 vh-100" />
                        </div>
                    </div>
                </div>
            </section>
            {/* <Footer /> */}
        </>
    )
}

export default LoginPage;