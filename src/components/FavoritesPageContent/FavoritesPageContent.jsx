import TeachersList from "../../components/TeachersList/TeachersList";
import { useFavorite } from "../../hooks/useAuth";
import css from "./FavoritesPageContent.module.css";

const FavoritePage = () => {
  const { isFavorite, favorite } = useFavorite();
  console.log(isFavorite);

  // const isFavorite = favorite.find((item)=> item.id ===)

  return (
    <section className={css.favoriteSection}>
      <div className="container">
        {isFavorite ? <TeachersList data={favorite} /> : <p>No one favorite</p>}
      </div>
    </section>
  );
};

export default FavoritePage;
