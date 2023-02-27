import React, {useState, useEffect,useContext,useCallback} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BOOK_DETAILS_URL } from './API';
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/authContext";
import Progressbar from './Progressbar';
import Star from './Star';
import Confetti from "react-confetti"


const Log = () => {
  const { id } = useParams();

  const [book, setBook] = useState({});
  let [reviewStatus, setReviewStatus]= useState(false);
   
  const { token, userId } = useContext(AuthContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState(true);

  const [rating, setRating] = useState(0);
  const [rating2, setRating2] = useState(0);



const [progress, setProgress] = useState(0);
const [pages, setPages]=useState(0)

const [confetti, setConfetti]=useState(false)
const [showProgress, setShowProgress]= useState(false)


  useEffect(() => {
    axios
      .get(`${BOOK_DETAILS_URL}/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);


const getUsertracker = useCallback(() => {
  axios
    .get(`/tracker/${userId}`, {
      headers: {
        authorization: token,
      },
    })
    .then((res) => {
      console.log("resdata", res.data);

      let result = res.data;

      let data = result.filter((item) => item.bookid == id);
      let lastElement = data.slice(-1);
      let obj = lastElement[0];
      console.log(obj.progress, "lastele");
      setPages(obj.progress);
    
    })
    .catch((err) => console.log(err));
}, [userId]);

useEffect(() => {
  getUsertracker();
}, [getUsertracker]);


// useEffect(() => {
//   if (book.num_pages > 0) {
//     setProgress(Math.round((pages / book.num_pages) * 100));
//   }
// }, [pages]);

// useEffect(() => {
//   axios
//     .get(`/tracker/${userId}`)
//     .then((res) => setProgress(res.data.progress))
//     .catch((err) => console.log(err));

  // if (book.num_pages > 0) {
  //   setProgress(Math.round((pages / book.num_pages) * 100));
  //   // setConfetti(!confetti);
  //   // setTimeout(() => {
  //   //   setConfetti(confetti);
  //   // }, 3500);
  // }
  // if(book.num_pages===pages){
  //   setConfetti(!confetti);
  //   setTimeout(() => {
  //     setConfetti(confetti);
  //   }, 3500);
  // }
  //pages,book.num_pages,
// }, [userId]);

 const handleSubmit = e => {
        e.preventDefault()
setTitle(book.title);
let title= book.title;
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
            navigate("/review");
          })
          .catch((err) => console.log(err));

             
    }


  

// const HandleChange= (e) =>{
//   setPages(e.current.value);
//   console.log("pages", pages);
//   if(book.num_pages>0){
//       setProgress(Math.round(( pages/ book.num_pages) * 100))
//      setConfetti(!confetti)
//      setTimeout(() => {
//       setConfetti(confetti)
//      }, 3500);
//     }

// }
const HandlePageChange=(e)=>{
 //e.preventDefault();
console.log("im fired")
  setPages(e.target.value)
console.log("pages,",pages, book.num_pages)

setShowProgress(true)
  console.log("newpage",pages)
  let body={
    progress:pages,
    bookid: book.id,
    userId
  }
  axios.post("/tracker", body,
            {
              headers: {
                authorization: token,
              },
            }
          )
          .then((res) => {
            console.log(res.data)
            setShowProgress(true);
            setPages(res.data.progress)
          })
          .catch((err) => console.log(err));
 
  
       setProgress(Math.round((pages / book.num_pages) * 100));  
       setPages(pages);
       
 
  // axios
  //   .get(`/tracker/${userId}`, {
  //     headers: {
  //       authorization: token,
  //     },
  //   })
  //   .then((res) => {
  //     console.log("resdata", res.data);

  //     let result = res.data;

  //     let data = result.filter((item) => item.bookid == id);
  //     let lastElement = data.slice(-1);
  //     let obj = lastElement[0];
  //     console.log(obj.progress, "lastele");
  //     setPages(obj.progress);
  //   })
  //   .catch((err) => console.log(err));
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
      <div>
        <h3>Pages read already: {pages}</h3>
        <h3>How many pages did you read today?</h3>
        <input placeholder="number of pages" name="pages" />
        <h3>You are on which page number?</h3>
        <input
          placeholder="number of pages"
          name="pages"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
        />
        <button onClick={HandlePageChange}>Record your Progress</button>
        {showProgress && <Progressbar value={progress} />}
        {confetti && <Confetti wind={0.03} gravity={0.2} />}
      </div>
      <Star stars={book.rating} reviews={book.review_count} />
      <button onClick={() => setReviewStatus(true)}>Review</button>
      {reviewStatus ? (
        <div>
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
        </div>
      ) : (
        <h1> </h1>
      )}
    </div>
  );
      }

export default Log;
