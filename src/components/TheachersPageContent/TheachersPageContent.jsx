import { useEffect, useState } from "react";
import TeachersList from "../../components/TeachersList/TeachersList";

import LanguageSelector from "../../components/Selector/LanguageSelector/LanguageSelector";
import PriceSelector from "../Selector/PriceSelector/PriceSelector";
import LevelOfKnowledgeSelector from "../Selector/LevelOfKnowledgeSelector/LevelOfKnowledgeSelector";
import css from "./TheachersPageContent.module.css";
import LoaderSpinner from "../../components/LoaderSpinner/LoaderSpinner";
import { useGetAllTeachersQuery } from "../../services/apiTeachers";

const TheachersPageContent = () => {
  //
  const { data, isLoading } = useGetAllTeachersQuery(); // отправляем запрос на получение всех преподавателей с сервера.
  console.log("isLoading: ", isLoading);
  console.log(" data: ", data);
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
        id: index + 1, // Присваиваем уникальный ID
      }));
      setFilteredData(dataWithIds); // Сохраняем полные данные для фильтрации
      setDataToShow(dataWithIds.slice(0, visibleItemsCount)); // Отображаем первые N элементов
    }
  }, [data, visibleItemsCount]);
  useEffect(() => {
    if (filteredData.length > 0) {
      setDataToShow(filteredData.slice(0, visibleItemsCount));
      setIsLoadingMore(false);
    }
  }, [visibleItemsCount, filteredData]);
  // 1. Фильтруем по цене
  const filterByPrice = (value) => {
    const filteredAdverts = data.filter(
      (item) => item.price_per_hour === +value
    );
    setFilteredData(filteredAdverts);
    setDataToShow(filteredAdverts.slice(0, visibleItemsCount));
  };
  // 2. Фильтруем по языкам
  const filterByLanguage = (lang) => {
    const filteredAdvertsByLanguage = data.filter((item) =>
      item.languages.includes(lang)
    );
    setFilteredData(filteredAdvertsByLanguage);
    setDataToShow(filteredAdvertsByLanguage.slice(0, visibleItemsCount));
  };
  // 3. Фильтруем по уровню знаний языка
  const filterByLevel = (level) => {
    const filteredAdvertsByLevel = data.filter((item) =>
      item.levels.includes(level)
    );
    setFilteredData(filteredAdvertsByLevel);
    setDataToShow(filteredAdvertsByLevel.slice(0, visibleItemsCount));
  };

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
              <LevelOfKnowledgeSelector filterByLevel={filterByLevel} />
              <PriceSelector filterByPrice={filterByPrice} />
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
