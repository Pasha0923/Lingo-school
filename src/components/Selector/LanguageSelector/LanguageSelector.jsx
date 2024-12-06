import Select from "react-select";
import css from "./LanguageSelector.module.css";
import { useGetAllTeachersQuery } from "../../../services/apiTeachers";

const LanguageSelector = ({ filterByLanguage, selectedLanguage }) => {
  const { data } = useGetAllTeachersQuery();
  const unicArray = new Set();

  for (const item of data) {
    for (const language of item.languages) {
      unicArray.add(language);
    }
  }
  const uniqueLanguagesArray = Array.from(unicArray);

  const onSelectChange = (selectedOptions) => {
    filterByLanguage(selectedOptions.value);
  };

  const customStyles = {
    placeholder: (provided) => ({
      ...provided,
      color: "var(--primary-black-121417)",
      fontSize: "18px",
      lineHeight: "20px",
      fontWeight: "500",
    }),
    control: (provided) => ({
      ...provided,
      marginTop: "8px",
      backgroundColor: "var(--primary-white-FFFFFF)",
      borderColor: "var(--primary-white-FFFFFF)",
      width: "221px",
      height: "48px",
      boxShadow: "none",
      borderRadius: "14px",
      "&:hover": {
        border: "2px solid var(--primary-green-9FBAAE)",
      },
    }),

    singleValue: (provided) => ({
      ...provided,
      fontSize: "18px",
      lineHeight: "20px",
      fontWeight: "500",
      color: "var(--primary-black-121417)",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "var(--primary-black-121417)",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "10px",
      marginTop: "4px",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: "0",
      borderRadius: "10px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "var( --primary-green-9FBAAE)"
        : "var(--primary-white-FFFFFF)",
      color: state.isSelected
        ? "var(--primary-white-FFFFFF)"
        : "var(--primary-black-121417)",
      "&:hover": {
        backgroundColor: state.isSelected
          ? "var( --primary-green-9FBAAE)"
          : "var(--secondary-green-CBDED3)",
        color: state.isSelected
          ? "var(--primary-white-FFFFFF)"
          : "var(--primary-black-121417)",
      },
    }),
  };
  return (
    <div className={css.filters}>
      <span className={css.text}>Languages</span>
      <Select
        className={css.selector}
        classNamePrefix="selector"
        value={
          selectedLanguage
            ? { label: selectedLanguage, value: selectedLanguage }
            : null
        } // Передаем выбранный язык
        onChange={onSelectChange}
        name="language"
        options={
          Array.isArray(uniqueLanguagesArray) &&
          uniqueLanguagesArray.map((language) => ({
            label: language,
            value: language,
          }))
        }
        placeholder={uniqueLanguagesArray[0]}
        styles={customStyles}
      />
    </div>
  );
};

export default LanguageSelector;
