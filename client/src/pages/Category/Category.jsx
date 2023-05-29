import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { Link } from "react-router-dom";
import gBooksRequest from "../../services/api.googleBooks";
import BookCard from "../../components/BookCard/BookCard";
import { useGlobalState } from "../../context/GlobalState";

const Category = () => {
    const { category } = useParams();
    const [categoryBooks, setCategoryBooks] = useState([]);
    const [, dispatch] = useGlobalState();

    const setBook = async (book) => {
        await dispatch({chosenBook: book})
    }

    const handleBookClick = (book) => {
        setBook(book);
    };

    useEffect(() => {
        const opts = {
            url: `volumes?q=subject:${category}&maxResults=5`
        }
        gBooksRequest(opts).then(data => setCategoryBooks(data?.data?.items || []))
    }, [category]);

  return (
    <main className="container">
        <Link to='/categories'>Catgeories</Link>
        <article>
            <h1 className="text-center">{category}</h1>
            <div className="row">
                {categoryBooks.map(book => <BookCard book={book} handleBookClick={handleBookClick} />)}
            </div>
        </article>
    </main>
  )
}

export default Category