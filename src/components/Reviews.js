import { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AuthContext from "../store/authContext";


const Reviews = () => {
  const { userId, token } = useContext(AuthContext);

  const [reviews, setReviews] = useState([]);

  const getUserReviews = useCallback(() => {
    axios
      .get(`/userreviews/${userId}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err))
  }, [userId]);

  useEffect(() => {
    getUserReviews();
  }, [getUserReviews]);

  const updateReview = (id, status) => {
    axios
      .put(
        `/reviews/${id}`,
        { status: !status },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then(() => {
        getUserReviews();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteReview = (id) => {
    axios
      .delete(`/reviews/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then(() => {
        getUserReviews();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const mappedReviews = reviews.map((review) => {
    return (
      <div key={review.id} className="post-card">
        <h2>Book:{review.title}</h2>
        <h4>Reviewed by: {review.user.username}</h4>
        <p>{review.content}</p>
        {userId === review.userId && (
          <div>
            <button
              className="form-btn"
              onClick={() => updateReview(review.id, review.privateStatus)}
            >
              {review.privateStatus ? "make public" : "make private"}
            </button>
            <button
              className="form-btn"
              style={{ marginLeft: 10 }}
              onClick={() => deleteReview(review.id)}
            >
              delete Review
            </button>
          </div>
        )}
      </div>
    );
  });

  return mappedReviews.length >= 1 ? (
    <main>{mappedReviews}</main>
  ) : (
    <main>
      <h1>Loading</h1>
    </main>
  );
}

export default Reviews;

// YOU WILL BE INSTRUCTED WHEN YOU SHOULD
// UNCOMMENT THIS CODE

// import {useState, useContext} from 'react'
// import axios from 'axios'
// import {useNavigate} from 'react-router-dom'

// import AuthContext from '../store/authContext'

// const Form = () => {
//     const {token, userId} = useContext(AuthContext)
//     const navigate = useNavigate()

//     const [title, setTitle] = useState('')
//     const [content, setContent] = useState('')
//     const [status, setStatus] = useState(true)

//     const handleSubmit = e => {
//         e.preventDefault()

//         axios.post('/posts', {title, content, status, userId}, {
//             headers: {
//                 authorization: token
//             }
//         })
//             .then(() => {
//                 navigate('/profile')
//             })
//             .catch(err => console.log(err))
//     }

//     return (
//         <main>
//             <form className='form add-post-form' onSubmit={handleSubmit}>
//                 <input
//                     type='text'
//                     placeholder='title'
//                     value={title}
//                     onChange={e => setTitle(e.target.value)}
//                     className='form-input add-post-input'
//                 />
//                 <textarea
//                     type='text'
//                     placeholder='content'
//                     value={content}
//                     onChange={e => setContent(e.target.value)}
//                     className='form-input add-post-input textarea'
//                 />
//                 <div className='flex-row status-container'>
//                     <div className='radio-btn'>
//                         <label htmlFor='private-status'>
//                             private:
//                         </label>
//                         <input
//                             type='radio'
//                             name='status'
//                             id='private-status'
//                             value={true}
//                             onChange={e => setStatus(e.target.value)}
//                             checked={true}
//                         />
//                     </div>
//                     <div className='radio-btn'>
//                         <label htmlFor='public-status'>
//                             public:
//                         </label>
//                         <input
//                             type='radio'
//                             name='status'
//                             id='public-status'
//                             value={false}
//                             onChange={e => setStatus(e.target.value)}
//                         />
//                     </div>
//                 </div>
//                 <button className='form-btn'>submit</button>
//             </form>
//         </main>
//     )
// }

// export default Form
