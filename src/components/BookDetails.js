import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BOOK_DETAILS_URL } from './API';

const BookDetails = () => {

const {id} = useParams();

const [book, setBook] = useState({})

useEffect(()=>{
axios.get(`${BOOK_DETAILS_URL}/${id}`)
.then(res=>{
    setBook(res.data);})
.catch((err)=> console.log(err))
},[id]);

  return (
    <div className="book-details">
      <div className='book-image'>
        <h2>{book.title}</h2>
        <img src={book.image_url} alt="about book" />
      </div>
      <div className='book-description'>
        <h2>Description</h2>
        <p>{book.description}</p>
        <h2>Authors</h2>
        <p>{book.authors}</p>
        <h2>Genres</h2>
        <p>{book.genres}</p>
        <h2>Pages</h2>
        <p>{book.num_pages}</p>
      </div>
    </div>
  );
}

export default BookDetails