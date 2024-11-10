import { useEffect, useState } from "react";
import TeachersList from "../../components/TeachersList/TeachersList";

import LanguageSelector from "../../components/Selector/LanguageSelector/LanguageSelector";
import CostSelector from "../../components/Selector/CostSelector/CostSelector";
import LevelSelector from "../../components/Selector/LevelSelector/LevelSelector";
import css from "./TheachersPageContent.module.css";
import LoaderSpinner from "../../components/LoaderSpinner/LoaderSpinner";
import { useGetAllTeachersQuery } from "../../services/apiTeachers";

const TheachersPageContent = () => {
  const { data, isLoading } = useGetAllTeachersQuery();
  // console.log(" data: ", data);
  const [dataToShow, setDataToShow] = useState([]);
  const [visibleItemsCount, setVisibleItemsCount] = useState(4);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const itemsPerPage = 4;
  // У каждого объекта учителя будет уникальное поле id, и компонент TeachersItem
  //   сможет использовать его для корректного добавления и удаления из избранного.
  useEffect(() => {
    if (data) {
      const dataWithIds = data.map((item, index) => ({
        ...item,
        id: index + 1,
      }));
      setFilteredData(dataWithIds);
      setDataToShow(dataWithIds.slice(0, visibleItemsCount));
    }
  }, [data, visibleItemsCount]);
  useEffect(() => {
    if (filteredData.length > 0) {
      setDataToShow(filteredData.slice(0, visibleItemsCount));
      setIsLoadingMore(false);
    }
  }, [visibleItemsCount, filteredData]);

  //   const filterByPrice = (value) => {
  //     const filteredAdverts = data.filter(
  //       (item) => item.price_per_hour === +value
  //     );
  //     setFilteredData(filteredAdverts);
  //     setDataToShow(filteredAdverts.slice(0, visibleItemsCount));
  //   };

  const filterByLanguage = (lang) => {
    const filteredAdvertsByLanguage = data.filter((item) =>
      item.languages.includes(lang)
    );
    setFilteredData(filteredAdvertsByLanguage);
    setDataToShow(filteredAdvertsByLanguage.slice(0, visibleItemsCount));
  };

  //   const filterByLevel = (level) => {
  //     const filteredAdvertsByLevel = data.filter((item) =>
  //       item.levels.includes(level)
  //     );
  //     setFilteredData(filteredAdvertsByLevel);
  //     setDataToShow(filteredAdvertsByLevel.slice(0, visibleItemsCount));
  //   };

  const onloadMore = () => {
    setIsLoadingMore(true);
    setVisibleItemsCount((prevState) => prevState + itemsPerPage);
  };

  return (
    <section className={css.teachersSection}>
      <div className="container">
        {data && (
          <>
            <div className={css.filters}>
              <LanguageSelector filterByLanguage={filterByLanguage} />
              <LevelSelector filterByLevel={filterByLevel} />
              <CostSelector filterByPrice={filterByPrice} />
            </div>
            <TeachersList data={dataToShow} active={false} />
            {dataToShow.length === visibleItemsCount && (
              <button className={css.button} type="button" onClick={onloadMore}>
                {isLoadingMore ? <LoaderSpinner /> : "Load more"}
              </button>
            )}
            {dataToShow.length > 0 ||
              (!isLoading && <p>No any matches for your request</p>)}
          </>
        )}
      </div>
    </section>
  );
};

export default TheachersPageContent;
