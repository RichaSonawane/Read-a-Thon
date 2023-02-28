import { useState, useEffect, useContext } from "react";
import axios from "axios";
import LoadingModal from "./LoadingModal";

import AuthContext from "../store/authContext";

const AllReviews = () => {
  const { userId } = useContext(AuthContext);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("/reviews")
      .then((res) => {
        // console.log("allreviews",res.data)
        // if (userId) {
        //   const otherUsersReviews = res.data.filter(
        //     (review) => userId !== review.userId
        //   );
        //   setReviews(otherUsersReviews);
        // } else {
          setReviews(res.data);
        }
      )
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const mappedReviews =reviews.map((review) => {
    return (
      <div key={review.id} className="post-card">
        <h2>{review.title}</h2>
        <h4>By: {review.user.username}</h4>
        <p>{review.content}</p>
      </div>
    );
  });

  return mappedReviews.length >= 1 ? (
    <main>
      <h3>All Reviews</h3>
      {mappedReviews}
    </main>
  ) : (
    <main>
      <LoadingModal />
    </main>
  );
}


export default AllReviews;
