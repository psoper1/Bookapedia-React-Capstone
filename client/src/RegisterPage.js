import Logo from "./Logo";
import Nav from "./Nav";
import athena from "../src/imgs/athena.webp";
import AuthService from "../src/services/auth.service";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from "../src/context/GlobalState";


const RegisterPage = () => {
    const [state, dispatch] = useGlobalState();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        password: "",
        passwordConf: "",
        firstName: "",
        lastName: "",
        email: "",
      })

    const handleChange = (key, value) => {
        setUser({
        ...user,
        [key]: value
        })
      }
      
    const handleRegister = (e) => {
        e.preventDefault();
        AuthService.register(user)
        // dispatch({
        //     currentUserToken: state.currentUserToken,
        //     currentUser: state.currentUser.user_id,
        // })
        navigate('/login');
        window.location.reload(true);
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

                                <form id="formstyle" onSubmit={handleRegister}>

                                    <h3 id="h3style" className="fw-normal mb-3 pb-3">Register</h3>

                                    <div className="form-outline mb-4">
                                        <input 
                                        type="email" 
                                        id="email" 
                                        className="form-control form-control-lg"
                                        onChange={(e) => handleChange('email', e.target.value)} />
                                        <label className="form-label" htmlFor="email">Email address</label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input 
                                        type="password" 
                                        id="password" 
                                        className="form-control form-control-lg" 
                                        onChange={(e) => handleChange('password', e.target.value)} />
                                        <label className="form-label" htmlFor="form2Example28">Password</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input 
                                        type="passConf" 
                                        id="passConf" 
                                        className="form-control form-control-lg" 
                                        onChange={(e) => handleChange('passwordConf', e.target.value)} />
                                        <label className="form-label" htmlFor="form2Example28">Confirm Password</label>
                                    </div>

                                    <div className="pt-1 mb-4">
                                        {/* After clicking Sign up and the account gets created, route the user to the home page */}
                                        <input
                                        type="submit"
                                        value="Register"
                                        className="btn btn-info btn-lg btn-block" 
                                        disabled={(
                                            user.password === user.passwordConf &&
                                            user.email
                                        ) ? false : true}
                                        />
                                    </div>

                                    {/* <p>Don't have an account? <a href="#!" className="link-secondary">Register here</a></p> */}

                                </form>

                            </div>

                        </div>
                        <div className="col-sm-6 px-0 d-none d-sm-block">
                            <img id="loginimage" src={athena}
                                alt="Login" className="w-100 vh-100"/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RegisterPage;