import { useTheme } from "next-themes";
import { useState } from "react";
import Select from "react-select";

import { customThemeStyles, themes } from "../../services/selectedFilterStyles";
import css from "./ThemeChanger.module.css";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();
  const [selectedThemeOption, setSelectedThemeOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedThemeOption(selectedOption);
    setTheme(selectedOption.value);
  };

  return (
    <Select
      value={selectedThemeOption}
      defaultValue={selectedThemeOption}
      onChange={handleChange}
      options={themes}
      className={css.select}
      styles={customThemeStyles}
      placeholder={theme}
    />
  );
};

export default ThemeChanger;
