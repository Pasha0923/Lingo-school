import TeachersList from "../../components/TeachersList/TeachersList";
import { useFavorite } from "../../hooks/useFavorite";

import css from "./FavoritesPageContent.module.css";

const FavoritePage = () => {
  const { isFavorite, favorite } = useFavorite();
  console.log(isFavorite);

  return (
    <section className={css.favoriteSection}>
      <div className="container">
        {isFavorite ? <TeachersList data={favorite} /> : <p>No one favorite</p>}
      </div>
    </section>
  );
};

export default FavoritePage;
