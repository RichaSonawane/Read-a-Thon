import React, {useState, useEffect,useContext} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BOOK_DETAILS_URL } from './API';
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/authContext";

const Log = () => {
  const { id } = useParams();

  const [book, setBook] = useState({});
  let [reviewStatus, setReviewStatus]= useState(false);
   
  const { token, userId } = useContext(AuthContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState(true);



  useEffect(() => {
    axios
      .get(`${BOOK_DETAILS_URL}/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);



 const handleSubmit = e => {
        e.preventDefault()
setTitle(book.title);

console.log("i m here", title)
         axios
          .post(
            "http://localhost:5000/reviews",
            { title, content,status, userId },
            {
              headers: {
                authorization: token,
              },
            }
          )
          .then(() => {
            navigate("/reviews");
          })
          .catch((err) => console.log(err));
    }

 


  return (
    <div className="book-details">
      <div className="book-image">
        <h2>{book.title}</h2>
        <img src={book.image_url} alt="about book" />
      </div>
      <div className="book-description">
        <h2>Description</h2>
        <p>{book.description}</p>
        <h2>Authors</h2>
        <p>{book.authors}</p>
        <h2>Genres</h2>
        <p>{book.genres}</p>
        <h2>Pages</h2>
        <p>{book.num_pages}</p>
      </div>
      <button onClick={() => setReviewStatus(true)}>Review</button>
      {reviewStatus ? (
        <form onSubmit={handleSubmit}>
          <div>
            <textarea
              type="text"
              placeholder="Write review here"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="form-input add-post-input textarea"
            />
            <div className="flex-row status-container">
              <div className="radio-btn">
                <label htmlFor="private-status">private:</label>
                <input
                  type="radio"
                  name="status"
                  id="private-status"
                  value={true}
                  onChange={(e) => setStatus(e.target.value)}
                  checked={true}
                />
              </div>
              <div className="radio-btn">
                <label htmlFor="public-status">public:</label>
                <input
                  type="radio"
                  name="status"
                  id="public-status"
                  value={false}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </div>
            </div>
            <button className="form-btn">submit</button>
          </div>
        </form>
      ) : (
        <h1> </h1>
      )}
    </div>
  );
      }

export default Log;
