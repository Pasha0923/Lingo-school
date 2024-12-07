import css from "./ReadMore.module.css";
import starIcon from "../../assets/star.svg";
import defaultImage from "../../assets/avatar.webp";

const ReadMore = ({ item, setIsVisibleModal }) => {
  const openBookingModal = () => {
    setIsVisibleModal(true);
  };
  const teacherAvatarUrl = item.avatar_url || defaultImage;
  return (
    <div>
      <ul className={css.list}>
        {item.reviews && item.reviews.length > 0 ? (
          item.reviews.map((review) => {
            const reviewerAvatarUrl =
              review.reviewer_avatar || teacherAvatarUrl;

            return (
              <li className={css.item} key={review.comment}>
                <div className={css.wrapper}>
                  <div className={css.image}>
                    <img
                      className={css.img}
                      src={reviewerAvatarUrl}
                      alt={review.reviewer_name}
                    />
                  </div>
                  <div className={css.textWrapper}>
                    <span className={css.name}>{review.reviewer_name}</span>
                    <div className={css.ratingWrapper}>
                      <img src={starIcon} alt="star" />
                      <span className={css.rating}>
                        {review.reviewer_rating}.0
                      </span>
                    </div>
                  </div>
                </div>
                <p className={css.comments}>{review.comment}</p>
              </li>
            );
          })
        ) : (
          <li className={css.item}>No reviews available</li>
        )}
      </ul>
      <button onClick={openBookingModal} className={css.button}>
        Book trial lesson
      </button>
    </div>
  );
};

export default ReadMore;
