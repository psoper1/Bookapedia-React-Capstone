import Logo from "./Logo";
import Nav from "./Nav";
import athena from "../src/imgs/athena.webp";
import AuthService from "../src/services/auth.service";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
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
        AuthService.register(user).then(() => {
            navigate('/registration-success');
            window.location.reload(true);
        })
        // navigate('/registration-success');
        // window.location.reload(true);
    }

    return (
        <>
            <Nav user={user} />
            <section className="vh-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6 text-black">

                            <div className="px-5 ms-xl-4">
                                <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4"></i>
                                <Logo />
                            </div>

                            <div className="container d-flex mx-auto mb-2">

                                <form id="formstyle" onSubmit={handleRegister}>

                                    <h3 id="h3style" className="fw-normal mb-3 pb-3">Register</h3>

                                    <div className="form-outline mb-4">
                                        <input
                                            type="text"
                                            id="first_name"
                                            className="form-control form-control-lg inputField"
                                            onChange={(e) => handleChange('firstName', e.target.value)}
                                            placeholder="First Name" />
                                        <label className="form-label" htmlFor="firstName"></label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input
                                            type="text"
                                            id="last_name"
                                            className="form-control form-control-lg inputField"
                                            onChange={(e) => handleChange('lastName', e.target.value)}
                                            placeholder="Last Name" />
                                        <label className="form-label" htmlFor="lastName"></label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input
                                            type="email"
                                            id="email"
                                            className="form-control form-control-lg inputField"
                                            onChange={(e) => handleChange('email', e.target.value)}
                                            placeholder="Email Address" />
                                        <label className="form-label" htmlFor="email"></label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input
                                            type="password"
                                            id="password"
                                            className="form-control form-control-lg inputField"
                                            onChange={(e) => handleChange('password', e.target.value)}
                                            placeholder="Password" />
                                        <label className="form-label" htmlFor="form2Example28"></label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input
                                            type="password"
                                            id="passConf"
                                            className="form-control form-control-lg inputField"
                                            onChange={(e) => handleChange('passwordConf', e.target.value)}
                                            placeholder="Confirm Password" />
                                        <label className="form-label" htmlFor="form2Example28"></label>
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
        </>
    )
}

export default RegisterPage;