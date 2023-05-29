import Nav from "../Nav"
import Logo from "../Logo"

function Page({ setBook, setView, setLoggedIn, loggedIn, children }) {

  return (
    <>
        <Nav setView={setView} setLoggedIn={setLoggedIn} />
        <Logo />
        {children}
    </>
  )
}

export default Page