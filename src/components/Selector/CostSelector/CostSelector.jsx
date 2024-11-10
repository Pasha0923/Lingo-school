import Select from "react-select";
// import { useGetAllTeachersQuery } from "../../../redux/servises";
import css from "./CostSelectors.module.css";
import { useGetAllTeachersQuery } from "../../../services/apiTeachers";

const CostSelector = ({ filterByPrice }) => {
  const { data } = useGetAllTeachersQuery();

  const unicPrice = {};
  data.forEach(({ price_per_hour }) => {
    unicPrice[price_per_hour] = true;
  });
  const unicPriceArray = Object.keys(unicPrice);

  const onSelectChange = (selectedOptions) => {
    filterByPrice(selectedOptions.value);
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
      width: "124px",
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
      color: "var(--primary-black-121417)", // Колір обраного значення
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "var(--primary-black-121417)", // Колір стрілочки
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "10px",
      //   borderRadius: '0',
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
      <span className={css.text}>Price</span>
      <Select
        className={css.selector}
        classNamePrefix="selector"
        onChange={onSelectChange}
        name="price"
        options={
          Array.isArray(unicPriceArray) &&
          unicPriceArray.map((price) => ({
            label: `${price} $`,
            value: price,
          }))
        }
        placeholder={`${unicPriceArray[0]} $`}
        styles={customStyles}
      />
    </div>
  );
};

export default CostSelector;
