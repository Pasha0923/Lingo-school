import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setFavorites } from "../../redux/favorites/slice";
const useRestoreFavorites = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const favoriteItems = localStorage.getItem("favoriteItems");

    if (favoriteItems) {
      dispatch(setFavorites(JSON.parse(favoriteItems)));
    }
  }, [dispatch]);
};

export default useRestoreFavorites;
