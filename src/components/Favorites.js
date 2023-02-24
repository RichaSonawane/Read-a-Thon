import React,{useEffect, useContext,useCallback, useState} from 'react'
import { useAppContext } from "./context/appContext";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/authContext";
import axios from 'axios';


const Favorites = () => {
 
    const { favorites, addToFavorites, removeFromFavorites } = useAppContext();
    const [favBooks, setFavBooks]=useState([...favorites])
    console.log("favorite books are", favBooks);

     const navigate = useNavigate();
    const favoriteChecker = (id) => {
      const boolean = favorites.some((book) => book.id === id);
      return boolean;
    };

     const { token, userId } = useContext(AuthContext);
      console.log(userId)

//rev
 const getUserBooks = useCallback(() => {
   axios
     .get(`/userList/${userId}`,{
      headers: {
         authorization: token,
      }})
     .then((res) => {
      console.log("i m in getbook", res.data)
      setFavBooks(res.data)})
     .catch((err) => console.log(err));
 }, [userId]);

 useEffect(() => {
   getUserBooks();
 }, [getUserBooks]);



    const handleDelete=(book)=> {

  removeFromFavorites(book.bookid);
     const bookid= book.id
     console.log("i m in delete")
    axios
      .delete(`/userList/${bookid}`,{
      headers: {
         authorization: token,
      }})
      .then((res) =>{
        console.log("i m in delete",res.data)
        //setFavBooks(res.data)
        getUserBooks()})
      .catch((err) => console.log("error in delete book", err));

    }

  return (
    <div className="favorites">
      {favBooks.length > 0 ? (
        favBooks.map((book) => (
          <div key={book.id} className="book">
            <div>
              <h4>{book.title}</h4>
            </div>
            <div>
              <img src={book.imageurl} alt="bookimage" id="bookImg" />
            </div>

            <div>
              {favoriteChecker(book.bookid) ? (
                <div>
                  <button onClick={() => handleDelete(book)}>
                    Remove from Favorites
                  </button>
                  <button onClick={() => navigate(`/books/${book.id}/log`)}>
                    Log
                  </button>
                </div>
              ) : (
                <div>
                  <button onClick={() => handleDelete(book)}>
                    Remove from Favorites
                  </button>
                  <button onClick={() => navigate(`/books/${book.bookid}/log`)}>
                    Log
                  </button>
                </div>
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