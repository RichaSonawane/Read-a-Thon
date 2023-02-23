import React,{useState, useEffect,useContext} from 'react';
import {API_URL} from './API';
import axios from 'axios';
import { useAppContext } from './context/appContext';
import {useNavigate} from 'react-router-dom'
import AllReviews from './AllReviews';
import AuthContext from "../store/authContext";
import Star from './Star';


const Booklist = () => {

    const [books, setBooks]= useState([])

    const {favorites , addToFavorites, removeFromFavorites}= useAppContext();
    const { token, userId } = useContext(AuthContext);
    //console.log("favorite books are", favorites)
    const navigate = useNavigate();

    const favoriteChecker= (id) =>{
        const boolean = favorites.some((book) => book.id === id);
        return boolean;
    }

    useEffect(()=>{
        axios.get(API_URL)
        .then(res=>{
            console.log(res.data);
            setBooks(res.data)
        }).catch(err=>console.log(err))   
        

     
    },[])



  return (
    <div>
      <div className="book-list">
        {books.map((book) => (
          <div key={book.id} className="book">
            <div>
              <h4>{book.title}</h4>
            </div>
            <div>
              <img
                src={book.image_url}
                alt="#"
                id="bookImg"
                onClick={() => navigate(`/books/${book.id}`)}
              />
            </div>
            <Star stars={book.rating} reviews={book.review_count} />
            <div>
              {favoriteChecker(book.id) ? (
                <button onClick={() => removeFromFavorites(book.id)}>
                  Remove from Favorites
                </button>
              ) : (
                <button onClick={() => addToFavorites(book)}>
                  Add to Favorites
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Booklist