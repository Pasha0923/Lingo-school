import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import {
  selectFavoriteTeachers,
  selectFilteredFavoritesTeachers,
  selectFavoritesLangOption,
  selectFavoritesLevelOption,
  selectFavoritesPriceOption,
} from "../../redux/favorites/selectors";

import {
  setFavoritesLangOption,
  setFavoritesLevelOption,
  setFavoritesPriceOption,
} from "../../redux/favorites/slice";
import FilteredMenu from "../FilteredMenu/FilteredMenu";
import TeachersList from "../TeachersList/TeachersList";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import css from "./FavoritesPageContent.module.css";

const FavoritesPageContent = () => {
  const dispatch = useDispatch();

  const [perPage, setPerPage] = useState(4);
  const [perfilteredPage, setPerFilteredPage] = useState(4);
  const [favoriteTeachers, setFavoriteTeachers] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [hasFilteredMore, setHasFilteredMore] = useState(true);

  const amountToPage = 4;

  const favorites = useSelector(selectFavoriteTeachers);
  const filteredFavorites = useSelector(selectFilteredFavoritesTeachers);

  const langOption = useSelector(selectFavoritesLangOption);
  const levelOption = useSelector(selectFavoritesLevelOption);
  const priceOption = useSelector(selectFavoritesPriceOption);

  const noSelectedFilters = !langOption && !levelOption && !priceOption;

  // console.log(langOption);

  useEffect(() => {
    setFavoriteTeachers(favorites.slice(0, perPage));
  }, [favorites, perPage]);

  useEffect(() => {
    if (!noSelectedFilters) {
      setFilteredList(filteredFavorites.slice(0, perfilteredPage));
    }
  }, [perfilteredPage, filteredFavorites, noSelectedFilters]);

  useEffect(() => {
    setHasMore(
      favorites.length > 0 &&
        favorites.length > amountToPage &&
        perPage / amountToPage < favorites.length / amountToPage
        ? true
        : false
    );
  }, [favorites.length, perPage]);

  useEffect(() => {
    setHasFilteredMore(
      filteredFavorites.length > 0 &&
        filteredFavorites.length > amountToPage &&
        perfilteredPage / amountToPage < filteredFavorites.length / amountToPage
        ? true
        : false
    );
  }, [filteredFavorites.length, perfilteredPage]);

  const handleLoadMore = () => {
    setPerPage((prev) => prev + 4);
  };

  const handleFilteredLoadMore = () => {
    setPerFilteredPage((prev) => prev + 4);
  };

  const handleLangChange = (option) => {
    dispatch(setFavoritesLangOption(option));
  };

  const handleLevelChange = (option) => {
    dispatch(setFavoritesLevelOption(option));
  };

  const handlePriceChange = (option) => {
    dispatch(setFavoritesPriceOption(option));
  };

  const listToRender = noSelectedFilters ? favoriteTeachers : filteredList;

  return (
    <>
      <div className={css.container}>
        <div className={css.listContainer}>
          <FilteredMenu
            langOption={langOption}
            levelOption={levelOption}
            priceOption={priceOption}
            handleLangChange={handleLangChange}
            handleLevelChange={handleLevelChange}
            handlePriceChange={handlePriceChange}
          />
          <TeachersList
            list={listToRender}
            active={true}
            levelOption={levelOption}
          />
        </div>

        {noSelectedFilters && hasMore && (
          <LoadMoreBtn handleClick={handleLoadMore} />
        )}

        {!noSelectedFilters && hasFilteredMore && (
          <LoadMoreBtn handleClick={handleFilteredLoadMore} />
        )}
      </div>
    </>
  );
};

export default FavoritesPageContent;
