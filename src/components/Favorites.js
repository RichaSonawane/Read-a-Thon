import React,{useEffect, useContext,useCallback} from 'react'
import { useAppContext } from "./context/appContext";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/authContext";
import axios from 'axios';
import Star from './Star';

const Favorites = () => {
 
    const { favorites, addToFavorites, removeFromFavorites } = useAppContext();

    console.log("favorite books are", favorites);

     const navigate = useNavigate();
    const favoriteChecker = (id) => {
      const boolean = favorites.some((book) => book.id === id);
      return boolean;
    };

     const { token, userId } = useContext(AuthContext);
      
    useEffect(() => {

    

        favorites.map((book) => {
          console.log(
            "book",
            book["title"],
            book["id"],
            book["image_url"],
            userId
          );
          let body = {
            bookId: book["id"],
            title: book["title"],
            image: book["image_url"],
            userId: userId,
          };
          axios
            .put("/userList", body, {
              headers: {
                authorization: token,
              },
            })
            .then((res) => console.log(res.data))
            .catch((err) => console.log("error in post"));
        });
      
    }, [[favorites]]);


  return (
    <div className="favorites">
      {favorites.length > 0 ? (
        favorites.map((book) => (
          <div key={book.id} className="book">
            <div>
              <h4>{book.title}</h4>
            </div>
            <div>
              <img src={book.image_url} alt="#" id="bookImg" />
              <Star stars={book.rating} reviews={book.review_count} />
            </div>

            <div>
              {favoriteChecker(book.id) ? (
                <div>
                  <button onClick={() => removeFromFavorites(book.id)}>
                    Remove from Favorites
                  </button>
                  <button onClick={() => navigate(`/books/${book.id}/log`)}>
                    Log
                  </button>
                </div>
              ) : (
                <button onClick={() => addToFavorites(book)}>
                  Add to Favorites
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <h1>There is no books in your reading list!</h1>
      )}
    </div>
  );
}

export default Favorites