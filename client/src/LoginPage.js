import Logo from "./Logo";
import Nav from "./Nav";
import athena from "../src/imgs/athena.webp"
import { NavLink } from "react-router-dom";
import React, { useState } from "react"
import AuthService from "../src/services/auth.service";
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from "../src/context/GlobalState";
import jwtDecode from "jwt-decode";
// import Footer from "./Footer";



function LoginPage() {
    let navigate = useNavigate();
    // eslint-disable-next-line
    const [state, dispatch] = useGlobalState();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        console.log("clicked")
        e.preventDefault();

        AuthService
            .login(email, password)
            .then(async (resp) => {
                let data = jwtDecode(resp.access)
                await dispatch({
                    currentUserToken: resp.access,
                    currentUser: data
                })
                console.log('after login')
                console.log(data)
                console.log('after login')
                navigate('/')
            });
    }
    return (
        <>
            <Nav />
            <section className="vh-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6 text-black">

                            <div className="px-5 ms-xl-4">
                                <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"></i>
                                <Logo />
                            </div>

                            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

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
                                        />

                                        <label className="form-label" htmlFor="email">Email address</label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input
                                            type="password"
                                            id="password"
                                            className="form-control form-control-lg"
                                            name="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />

                                        <label className="form-label" htmlFor="password">Password</label>
                                    </div>

                                    <div className="pt-1 mb-4">
                                        <input className="btn btn-info btn-lg" type="submit" value="Sign in" />
                                    </div>

                                    <p>Don't have an account? <NavLink to="/register" className="link-secondary">Register here</NavLink></p>

                                </form>

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