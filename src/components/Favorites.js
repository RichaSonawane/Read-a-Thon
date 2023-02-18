import React from 'react'
import { useAppContext } from "./context/appContext";

const Favorites = () => {

    const { favorites, addToFavorites, removeFromFavorites } = useAppContext();

    console.log("favorite books are", favorites);

    const favoriteChecker = (id) => {
      const boolean = favorites.some((book) => book.id === id);
      return boolean;
    };


  return (
    <div className="favorites">
      {favorites.length>0 ?  favorites.map((book) => (
        <div key={book.id} className="book">
          <div>
            <h4>{book.title}</h4>
          </div>
          <div>
            <img src={book.image_url} alt="#" id="bookImg" />
          </div>
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
      )) : <h1>There is no books in your reading list!</h1>}
    </div>
  );
}

export default Favorites