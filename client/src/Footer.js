function Footer() {
    return (
        <>
            <footer className="footer text-center text-white">

                <div className="container pt-4">

                    <section className="mb-4">

                        <a
                            className="btn btn-link btn-floating btn-lg text-dark m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark">
                            <i className="fab fa-facebook-f" />
                        </a>


                        <a
                            className="btn btn-link btn-floating btn-lg text-dark m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark">
                            <i className="fab fa-twitter" />
                        </a>


                        <a
                            className="btn btn-link btn-floating btn-lg text-dark m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark">
                            <i className="fab fa-instagram" />
                        </a>

                        <a
                            className="btn btn-link btn-floating btn-lg text-dark m-1"
                            href="#!"
                            role="button"
                            data-mdb-ripple-color="dark">
                            <i className="fab fa-github" />
                        </a>
                    </section>
                </div>
                <div className="footer-div text-center text-dark p-3">
                    © 2020
                    <a className="text-dark" href="https://mdbootstrap.com/">-Potato Man</a>
                </div>

            </footer>
        </>
    )
}

export default Footer;