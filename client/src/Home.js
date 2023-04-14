import Logo from "./Logo";
import Nav from "./Nav";
// import Results from "./Results";
import React, { useState, useEffect } from 'react';


function Home() {
    const [responseData, setResponseData] = useState([]);
    const [clicked, setClicked] = useState(false)

    // let response = Array.from(responseData)


  const fetchData = async () => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${document.getElementById('input').value}&filter=paid-ebooks&maxResults=40&key=AIzaSyBxNrFOBZF9ZWmiqHf69n8CQEuRuFJttoU`);
    const data = await response.json();
    setResponseData(data);
    console.log(responseData)
    console.log(data?.items?.[0]?.volumeInfo?.title)
    console.log(document.getElementById('input').value)
  }

  useEffect(() => {
    if (document.getElementById('input').value == "") {
        console.log('if statement')
    }
    else {
        fetchData();
    }
    // fetchData();
  }, []);

  const handleClickEvent = (e) => {
    e.preventDefault()
    setClicked(true)
    fetchData();
}

    // let responseResult = responseData.map((data) => <h3>{data?.items?.[0]?.volumeInfo?.description}</h3>)

    return (
        <>
            <Nav />
            <Logo />
            <div className="form-outline">
                <form className="d-flex">
                    <input id="input" className="inputField form-control me-2" type="search" placeholder="Search for a Book Title" aria-label="Search" />
                    <button onClick={handleClickEvent} className="btn" type="submit">Search</button>
                </form>
            </div>
            {/* <Results /> */}
            <div className="results container text-center">
                {responseData?.items?.[0]?.volumeInfo?.description}
            </div>
        </>
    )
}

// responseData?.items?.[0]?.volumeInfo?.description

// {clicked && responseData?.filter((data) => data?.items?.volumeInfo?.title.includes(document.getElementById('input').value).map((data2) => 
//                 <h5>{data2?.items?.[0]?.volumeInfo?.title}</h5>
                
//                 ))}


export default Home;