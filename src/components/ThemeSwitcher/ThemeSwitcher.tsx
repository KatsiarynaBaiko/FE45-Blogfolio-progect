import classNames from "classnames";
import React from "react";
import { Theme } from "../../@types";
import { MoonIcon, SunIcon } from "../../assets/icons";
import { useThemeContext } from "../../context/Theme";
import styles from './ThemeSwitcher.module.scss';

// step 5 
// стилизуем с помощью className
// когда делаем стиль для activeButton использкем classNames
// ---
// и когда activeButton, то у нас тема будет светлой 
// => styles.activeButton]: themeValue === Theme.Light
// по аналогии и для темной темы

// step 6
// прописываем функцию onClick чтобы менять тему по нажатию на кнопочки
// onClick={onChangeTheme(Theme.Light/Dark)}

// step 1
// в ThemeSwitcher сразу же приходит
// const { themeValue, onChangeTheme } = useThemeContext();
// для переключения используются кнопочки с луной и солнышком
// =>  создаем их в icon

const ThemeSwitcher = () => {
    const { themeValue, onChangeTheme } = useThemeContext();
    return (
        <div className={styles.container}>
            <div className={classNames(styles.button,
                { [styles.activeButton]: themeValue === Theme.Light })}
                onClick={onChangeTheme(Theme.Light)} 
                >
                <SunIcon />
            </div>
            <div className={classNames(styles.button,
                { [styles.activeButton]: themeValue === Theme.Dark })}
                onClick={onChangeTheme(Theme.Dark)}
                >
                <MoonIcon />
            </div>
        </div>
    )
}

// step 2
export default ThemeSwitcher

// step 4 вызываем в App и смотрим отображение