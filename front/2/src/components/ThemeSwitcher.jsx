import React, { useContext } from "react";
import { THEME_TYPE } from "../constants";
import { ThemeContext } from "../providers/ThemeProvider";

const ThemeSwitcher = () => {
  // No need to change *return* part
  // You have to set themeMode based on context
  const themeContext = useContext(ThemeContext);
  const themeMode = themeContext.themeMode;

  const handleThemeChange = (e) => {
    if (themeMode === THEME_TYPE.LIGHT) {
      themeContext.setTheme(THEME_TYPE.DARK);
    } else {
      themeContext.setTheme(THEME_TYPE.LIGHT);
    }
  };

  return (
    <div className="switch-container">
      <label className="switch">
        <input
          data-testid="theme-changer"
          type="checkbox"
          checked={themeMode === THEME_TYPE.DARK}
          onChange={handleThemeChange}
        />
        <span className="slider round"></span>
      </label>
      <span className="text-color bold">Dark mode</span>
    </div>
  );
};

export default ThemeSwitcher;
