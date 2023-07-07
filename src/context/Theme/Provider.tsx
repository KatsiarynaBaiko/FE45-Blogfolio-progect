import React, { FC } from "react"
import { Children, Theme } from "../../@types";
import ThemeContext from "./Context"

// step 7
// создаем пропсы для ThemeProvider
// для themeValue тип будет Theme (так как 2 цвета страницы (из @types));
type ThemeProviderProps = {
    children: Children;
    themeValue: Theme;
    onChangeTheme: (value: Theme) => () => void
}


// step 6
// чтобы достучаться до контекста нам нужен контейнерный компонент
// то есть нам нужен компонент, который будет оборачивать 
// и в себя принимать какие-либо значения для этого контекста
// Provider - это то, что помогает нам получить доступ к контексту
// и у него будут children
// так как у нас повторяется сhildren = ReactElement | ReactElement[];
// то выносим в @types и переиспользуем
// ---
// запихиваем пропсы в ThemeProvider 
// но ThemeContext.Provider все равно подчеркивается красным 
// => нам нужен value, в который будет приходить themeValue из пропсов 
// ---
// после действий в App (step 10): также сюда кладем onChangeTheme но ее подсвеживает красным 
// => идем в контекст и прописываем ее в const initialValues

const ThemeProvider: FC <ThemeProviderProps> = ({children, themeValue, onChangeTheme}) => {
    return <ThemeContext.Provider value={{
        themeValue,
        onChangeTheme,
    }}> {children}

    </ThemeContext.Provider>
}

// step 8
export default ThemeProvider

// step 9
// идем в Фзз и оборачиваем наш компонент в ThemeProvider

// step 10 - App

// step 11 
// далее создаем компонент ThemeSwitcher
// в котором прописываем как оно будет переключаться 
