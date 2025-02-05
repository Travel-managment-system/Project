import React from 'react';
import './Reviews.css'; // Import the CSS file

const reviewsData = [
  {
    name: "John Doe",
    rating: 4.5,
    comment: "Amazing deals on prices! I found the best hotels at unbeatable rates. Highly recommend Travent!",
    category: "Prices"
  },
  {
    name: "Jane Smith",
    rating: 5,
    comment: "Travent offers the best hotel options with excellent customer service. My stay was wonderful!",
    category: "Best Hotels"
  },
  {
    name: "Alex Johnson",
    rating: 4,
    comment: "Great offers and discounts on the website. I saved a lot on my trip. Thanks, Travent!",
    category: "Offers"
  },
  {
    name: "Michael Brown",
    rating: 4.7,
    comment: "Travent made planning my vacation so easy. The prices were unbeatable and the service was top-notch!",
    category: "Prices"
  },
  {
    name: "Emily Davis",
    rating: 5,
    comment: "I found the best hotels through Travent. They have a wide variety of options to choose from!",
    category: "Best Hotels"
  },
  {
    name: "Chris Wilson",
    rating: 4.3,
    comment: "The offers on Travent are amazing. I got a great deal on my hotel booking!",
    category: "Offers"
  }
];

const Reviews = () => {
  return (
    <div className="reviews-container">
      <h2>User Reviews</h2>
      {reviewsData.map((review, index) => (
        <div key={index} className="review-card">
          <div className="review-header">
            <h3>{review.name}</h3>
            <div className="review-rating">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < review.rating ? "star filled" : "star"}>★</span>
              ))}
            </div>
          </div>
          <p className="review-category">{review.category}</p>
          <p className="review-comment">"{review.comment}"</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
