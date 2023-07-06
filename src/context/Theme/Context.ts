import { createContext, useContext } from "react";
import { Theme } from "../../@types";


// step 4
// так как у нас тема может быть 2 вариантов, то создаем для нее enum в @types

// step 1
// значение по умолчанию (например светлая тема)
// ---
// после создания enum  записываем в {}
// страндартная тема  - обычно Light
// ---
// после действий в App (step 10) прописываем функцию onChangeTheme и указываем тип
const initialValues = {
    themeValue: Theme.Light,
    // onChangeTheme: (value: Theme) => {}
    // если мы хотим передать переменную, но не хотим именовать (так как может ругаться React)
    // пишем нижнее подчеркивание (unused-переменная)
    onChangeTheme: (_: Theme) => () => {},
}

// step 2 
// создаем контекст для Темы (так как есть светлая и темная темы)
// то есть это наше хранилище
const ThemeContext = createContext(initialValues);

// step 5
// Так как у нас есть контекст, 
// то должна быть и функция, которая достает что-то из констекста
// и чтобы обратиться к конкретному контексту используется хук useContext
// ---
// const { themeValue } = useContext(ThemeContext)
// чтобы постоянно не писать/обращаться useContext(ThemeContext)
// можно создать маленький кастомный хук: const useThemeContext

export const useThemeContext = () => useContext(ThemeContext);

// step 3
export default ThemeContext;


// step 6 идем в Provider
// чтобы достучаться до контекста нам нужен контейнерный компонент