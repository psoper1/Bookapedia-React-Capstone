import Nav from "./Nav";
import athena from "../src/imgs/athena.webp";
import Logo from "./Logo";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from "react-hot-toast";

function RegisterSuccess() {

    let navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            toast.success("Registration success!")
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 4000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line
    }, [])


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
                            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                                <h3 id="h3style" className="fw-normal mb-3 pb-3">Thank you for registering! Routing you back to the login page to login!</h3>
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

export default RegisterSuccess;