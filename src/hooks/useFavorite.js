import { useSelector } from "react-redux";

export function useFavorite() {
  const favorite = useSelector((state) => state.favorite.favorite);

  return {
    isFavorite: !!favorite.length,
    favorite,
  };
}
