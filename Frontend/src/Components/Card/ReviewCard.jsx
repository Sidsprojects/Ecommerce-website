import React from 'react'
import ReactRating from "react-rating-stars-component"
import Profile from "../../assets/placeholder.jpeg"

const ReviewCard = ( {review} ) => {
  const options = {
        size: "large",
        value: review.rating,
        readOnly: true,
        precision: 0.5,
    };
    return (
        <div className="reviewCard">
          <img src={Profile} alt="User" />
          <p>{review.name}</p>
          <ReactRating {...options} />
          <span className="reviewCardComment">{review.comment}</span>
        </div>
      );
    };

export default ReviewCard
