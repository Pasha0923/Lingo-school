import { useEffect, useState } from "react";
import TeachersList from "../../components/TeachersList/TeachersList";

import LanguageSelector from "../../components/Selector/LanguageSelector/LanguageSelector";
import PriceSelector from "../Selector/PriceSelector/PriceSelector";
import LevelOfKnowledgeSelector from "../Selector/LevelOfKnowledgeSelector/LevelOfKnowledgeSelector";
import css from "./TheachersPageContent.module.css";
import LoaderSpinner from "../../components/LoaderSpinner/LoaderSpinner";
import { useGetAllTeachersQuery } from "../../services/apiTeachers";

const TheachersPageContent = () => {
  const { data, isLoading } = useGetAllTeachersQuery();

  const [dataToShow, setDataToShow] = useState([]);
  const [visibleItemsCount, setVisibleItemsCount] = useState(4);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const itemsPerPage = 4;
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  const addUniqueIds = (data) =>
    data.map((item, index) => ({
      ...item,
      id: `${item.name}-${index}`,
    }));
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

  const resetFilters = () => {
    const dataWithIds = addUniqueIds(data);
    console.log("Reset Filters Data:", dataWithIds);
    setFilteredData(dataWithIds);
    setDataToShow(dataWithIds.slice(0, itemsPerPage));
    setVisibleItemsCount(itemsPerPage);
    setSelectedLanguage("");
    setSelectedPrice("");
    setSelectedLevel("");
  };

  const filterByPrice = (value) => {
    const filteredAdverts = data.filter(
      (item) => item.price_per_hour === +value
    );

    const filteredWithIds = addUniqueIds(filteredAdverts);

    setFilteredData(filteredWithIds);

    setDataToShow(filteredWithIds.slice(0, visibleItemsCount));
  };

  const filterByLanguage = (lang) => {
    const filteredAdvertsByLanguage = data.filter((item) =>
      item.languages.includes(lang)
    );

    const filteredWithIds = addUniqueIds(filteredAdvertsByLanguage);

    setFilteredData(filteredWithIds);

    setDataToShow(filteredWithIds.slice(0, visibleItemsCount));
  };

  const filterByLevel = (level) => {
    const filteredAdvertsByLevel = data.filter((item) =>
      item.levels.some((lvl) => lvl.toLowerCase() === level.toLowerCase())
    );

    const filteredWithIds = addUniqueIds(filteredAdvertsByLevel);

    setFilteredData(filteredWithIds);

    setDataToShow(filteredWithIds.slice(0, visibleItemsCount));
  };

  const onloadMore = () => {
    setIsLoadingMore(true);
    setVisibleItemsCount((prevState) => prevState + itemsPerPage);
  };

  const shouldShowResetButton =
    selectedLanguage || selectedPrice || selectedLevel;
  return (
    <section className={css.teachersSection}>
      <div className="container">
        {data && (
          <>
            <div className={css.filters}>
              <LanguageSelector
                filterByLanguage={(lang) => {
                  setSelectedLanguage(lang);
                  filterByLanguage(lang);
                }}
                selectedLanguage={selectedLanguage}
              />
              <LevelOfKnowledgeSelector
                filterByLevel={(level) => {
                  setSelectedLevel(level);
                  filterByLevel(level);
                }}
                selectedLevel={selectedLevel}
              />
              <PriceSelector
                filterByPrice={(value) => {
                  setSelectedPrice(value);
                  filterByPrice(value);
                }}
                selectedPrice={selectedPrice}
              />

              {/* Добавляем кнопку сброса с проверкой на выбранные фильтры */}
              {shouldShowResetButton && (
                <button className={css.resetFilters} onClick={resetFilters}>
                  Reset Filters
                </button>
              )}
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
