import { createContext, useContext } from "react";
import { useState } from "react";
import axios from "axios";


const AppContext = createContext(null);

export const  useAppContext=()=>{
 const context = useContext(AppContext);
 
 if(context === undefined){
    throw new Error('Error in AppContext');
 }

 return context;
}


const AppContextProvider = (props)=>{
    const [favorites, setFavorites]= useState([])

const addToFavorites = (book)=>{
    const oldFavorites = [...favorites];

    const newFavorites= oldFavorites.concat(book);

    setFavorites(newFavorites);

   

}
const removeFromFavorites = (id) =>{

    const oldFavorites =[...favorites];
    const newFavorites= oldFavorites.filter((book)=> book.id !== id);

    setFavorites(newFavorites);
}

return (
  <AppContext.Provider
    value={{ favorites , addToFavorites, removeFromFavorites }}
  >
    {props.children}
  </AppContext.Provider>
);

}
export default AppContextProvider;