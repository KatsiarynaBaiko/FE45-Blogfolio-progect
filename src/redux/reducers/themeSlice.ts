import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Theme } from "src/@types";
import { RootState } from "../store";

// step 5 (начало в App)
// создаем тип для 
type InitialState = {
    themeValue: Theme
}

// step 2
// initialState как константа
// ---
// в initialState должна быть переменная (themeValue) темы и ее начальное состояние (Theme.Light)
// у нас есть данные, но также нам необходима функция, 
// которая и будет менять (по аналогии с useState) => прописываем ее в reducers

const initialState: InitialState = {
    themeValue: Theme.Light
};

// step 1
// создаем themeSlice
// Slice-это объект, в котором хранятся reducer и reducers
// у Slice есть опции: имя,  initialState, reducers
// initialState можно задать объектом или вынести в отдельную константу
// --- 
// reducer - этаж
// reducers - кабинетики
// ---
// задача далее перенести управление темой из state в Redux
// --- 
// у нас есть данные (в initialState), но также нам необходима функция, 
// которая и будет менять (по аналогии с useState) => прописываем ее в reducers
// в эту функцию приходит state и action (из лекции - reducer)
// setThemeValue - это и есть reducer
// преимущество библиотеки - не надо писать return и разворачивать state
// поэтому можно прописать state.themeValue = action.payload, то есть
// напрямую присваемваем значению те данные: которые у нас в payload
// ---
// типизируем наш стор и там: export type RootState = ReturnType<typeof store.getState>;
// у action будет тип PayloadAction и в него мы кладем то, что у нас в payload - это Theme
// => action: PayloadAction<Theme>

const themeSlice = createSlice({
    name: 'themeReducer',
    initialState,
    reducers: {
        setThemeValue: (state, action: PayloadAction<Theme>) => {
            state.themeValue = action.payload //тут данные ловятся и кладутся на нужное место
        }
    },
});


// step 4
// с помощью библиотеки toolkit автоматически генерируются action 
// по названию функции setThemeValue
// и дальше оно автоматически находит эту функцию по названию 
// далее работаем с этим экшеном (а именно setThemeValue)
// ---
// тут сперва необходимо поменять в App 
// используем dispatch
export const { setThemeValue } = themeSlice.actions;

// step 6 (начало в App)
// вынесли объект, где ключ - это функция
export const ThemeSelectors = {
    getThemeValue: (state: RootState) => state.themeReducer.themeValue,
  }

// step 3
export default themeSlice.reducer;


