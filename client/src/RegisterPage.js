import Logo from "./Logo";
import Nav from "./Nav";
import athena from "../src/imgs/athena.webp"


function RegisterPage() {
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

                                <form id="formstyle">

                                    <h3 id="h3style" className="fw-normal mb-3 pb-3">Register</h3>

                                    <div className="form-outline mb-4">
                                        <input type="email" id="form2Example18" className="form-control form-control-lg" />
                                        <label className="form-label" htmlFor="form2Example18">Email address</label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="password" id="form2Example28" className="form-control form-control-lg" />
                                        <label className="form-label" htmlFor="form2Example28">Password</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input type="password" id="form2Example28" className="form-control form-control-lg" />
                                        <label className="form-label" htmlFor="form2Example28">Confirm Password</label>
                                    </div>

                                    <div className="pt-1 mb-4">
                                        {/* After clicking Sign up and the account gets created, route the user to the home page */}
                                        <button className="btn btn-info btn-lg btn-block" type="button">Sign Up</button>
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