import Logo from "./Logo";
import Nav from "./Nav";
import { toast, Toaster } from "react-hot-toast";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {

  let navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      toast.success("You have logged out")
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
      <Logo />
      <h2 className="text-center">You have successfully logged out!</h2>
      <p className="text-center">Re-routing back to the home page</p>
    </>
  )
}

export default LogoutPage;