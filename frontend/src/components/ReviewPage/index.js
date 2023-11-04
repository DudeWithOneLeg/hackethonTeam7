import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllReviewsThunk } from "../../store/review";
import "./ReviewPage.css";

function ReviewPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllReviewsThunk());
  }, [dispatch]);

  const reviewObj = useSelector((state) => state.review);
  const reviews = Object.values(reviewObj);
  console.log(reviews);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.toLocaleString("default", { month: "short" }); // 'short' gives the abbreviated month name
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Render a filled star
        stars.push(<span key={i}>&#9733;</span>);
      } else {
        // Render an empty star
        stars.push(<span key={i}>&#9734;</span>);
      }
    }
    return stars;
  };

  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 2;
  const totalPageCount = Math.ceil(reviews.length / reviewsPerPage);

  const showNextPage = () => {
    if (currentPage < totalPageCount - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const showPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const displayedReviews = reviews.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage
  );

  return (
    <>
      <div className="review-container">
        <h1>Reviews</h1>
        <div className="review-grid">
          {displayedReviews.map((review) => (
            <div key={review.id} className="review">
              <div className="review-info">
                <li>{renderStars(review.rating)}</li>
              </div>
              <div className="review-info">
                <li>Product: {review.productId}</li>
                <li>{review.review}</li>
              </div>
              <div className="review-info">
                <li>Customer {review.userId}</li>
                <li>{formatDate(review.createdAt)}</li>
              </div>
              {/* <hr></hr> */}
            </div>
          ))}
        </div>
        <div className="pagination">
          <button className="arrow left" onClick={showPrevPage} disabled={currentPage === 0}>
            <i class="bx bxs-chevron-left"></i>
            {/* Previous */}
          </button>
          <button
          className="arrow right"
            onClick={showNextPage}
            disabled={currentPage === totalPageCount - 1}
          >
            {/* Next */}
            <i class="bx bxs-chevron-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default ReviewPage;
