import React,{useState} from 'react';
import Reviews from './Reviews';
import AllReviews from './AllReviews';


const ReviewDisplay = () => {
const [view, setView] = useState("AllReviews");

  return (
    <div className="stack">
      <div className="tab-select">
        <button className="revBtn" onClick={() => setView("Reviews")}>
          Reviews By You
        </button>
        <button className="revBtn" onClick={() => setView("AllReviews")}>
          All Reviews
        </button>
      </div>
      {view === "Reviews" && <Reviews />}
      {view === "AllReviews" && <AllReviews />}
    </div>
  );
}

export default ReviewDisplay