import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setFavorites } from "../../redux/favorites/slice"; // Экшен для установки избранного

const useRestoreFavorites = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Проверяем, есть ли данные в localStorage
    const favoriteItems = localStorage.getItem("favoriteItems");

    if (favoriteItems) {
      // Если есть, восстанавливаем их в Redux
      dispatch(setFavorites(JSON.parse(favoriteItems)));
    }
  }, [dispatch]);
};

export default useRestoreFavorites;
