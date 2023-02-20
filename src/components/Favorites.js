import React,{useEffect, useContext} from 'react'
import { useAppContext } from "./context/appContext";
import { useNavigate } from "react-router-dom";



const Favorites = () => {
 
    const { favorites, addToFavorites, removeFromFavorites } = useAppContext();

    console.log("favorite books are", favorites);

     const navigate = useNavigate();
    const favoriteChecker = (id) => {
      const boolean = favorites.some((book) => book.id === id);
      return boolean;
    };


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