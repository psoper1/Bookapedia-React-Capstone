import bookapedialogo from "./imgs/bookapedialogo.png";

function Logo() {
    return (
        <>
        
            <img className="img-fluid rounded mx-auto d-block" src={bookapedialogo} alt="bookapedialogo" />
            {/* <div className="container justify-content-center logo-container">
            <h1 className="logo-text">BOOKAPEDIA</h1>
            </div> */}
        </>
    )
}

export default Logo;