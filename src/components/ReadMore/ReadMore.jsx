// import css from "./ReadMore.module.css";
// import starIcon from "../../assets/star.svg";
// import defaultImage from "../../assets/avatar.webp";

// const ReadMore = ({ item, setIsVisibleModal }) => {
//   const openBookingModal = () => {
//     setIsVisibleModal(true);
//   };
//   console.log(item.reviews); // Добавьте это для проверки содержимого
//   const defaultImg = `${defaultImage}`;
//   return (
//     <div>
//       <ul className={css.list}>
//         {item.reviews.map((review) => {
//           console.log(review);
//           // Выводим объект review в консоль
//           return (
//             <li className={css.item} key={review.comment}>
//               <div className={css.wrapper}>
//                 <div className={css.image}>
//                   <img
//                     className={css.img}
//                     src={review.avatar_url}
//                     alt={`${review.reviewer_name} avatar`}
//                     onError={(e) => {
//                       e.target.src = defaultImg;
//                     }} // Заменяем изображение, если не удалось загрузить
//                   />
//                   {/* {review.reviewer_name.charAt(0).toUpperCase()} */}
//                 </div>
//                 <div className={css.textWrapper}>
//                   <span className={css.name}>{review.reviewer_name}</span>
//                   <div className={css.ratingWrapper}>
//                     <img src={starIcon} alt="star" loading="lazy" />
//                     <span className={css.rating}>
//                       {review.reviewer_rating}.0
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <p className={css.comments}>{review.comment}</p>
//             </li>
//           );
//         })}
//       </ul>
//       <button onClick={openBookingModal} className={css.button}>
//         Book trial lesson
//       </button>
//     </div>
//   );
// };

// export default ReadMore;
import css from "./ReadMore.module.css";
import starIcon from "../../assets/star.svg";
import defaultImage from "../../assets/avatar.webp";

const ReadMore = ({ item, setIsVisibleModal }) => {
  console.log(" item: ", item);
  const openBookingModal = () => {
    console.log("openBookingModal: ", openBookingModal);
    setIsVisibleModal(true);
  };

  const defaultImg = `${defaultImage}`;

  return (
    <div>
      <ul className={css.list}>
        {item.reviews && item.reviews.length > 0 ? (
          item.reviews.map((review) => {
            // Проверяем наличие avatar_url и устанавливаем значение по умолчанию
            // const avatarUrl = review.avatar_url;
            console.log("Avatar URL for review:", review.avatar_url);
            return (
              <li className={css.item} key={review.comment}>
                <div className={css.wrapper}>
                  <div className={css.image}>
                    <img
                      className={css.img}
                      src={review.avatar_url ? review.avatar_url : defaultImg}
                      alt={review.reviewer_name}
                      // onError={(e) => {
                      //   e.target.src = defaultImg; // Заменяем изображение, если не удалось загрузить
                      // }}
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
          <li className={css.item}>No reviews available</li> // Сообщение, если нет отзывов
        )}
      </ul>
      <button onClick={openBookingModal} className={css.button}>
        Book trial lesson
      </button>
    </div>
  );
};

export default ReadMore;
