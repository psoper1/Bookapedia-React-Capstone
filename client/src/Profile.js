import React from "react"
import { useGlobalState } from "../src/context/GlobalState";
import Nav from "./Nav";

const Profile = () => {
  const [ state, dispatch ] = useGlobalState();

  return (
    <>
    <Nav />
    <div>
        
      <h1>{state.currentUser.user_id}</h1>
      <h1>Test</h1>
    </div>
    </>
  )
}

export default Profile