
// нам необходимо реализовать предпросмотр поста
// по клику на кнопочку "три точечки" (DotsMenuIcon)
// у нас открывается модальное окно (попап) с нашим постом
// и выбранный пост должен лежат в redux

// preparing - сделать модальное окно (можно через react-modal)
// далее создаем компонент Modal
// ---
// также в папке pages -> Home создаем папку SelectedPostModal
// где и будет наш выбранный пост в модальном окне
// нам нужно отследить вызвано ли модальное окно и какой пост в него положили
// создаем reducer в котором все это будет происходить => postSlice (по аналогии с themeSlice)

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// было Card, на 43 уроке конфликт - замена на Post в @types
// import { Card } from "src/@types";
import { Post } from "src/@types";
import { RootState } from "../store";

// step 4 
// создаем тип для initialState (для корректной работы в App)
// для модального окна
// значение boolea - так как модальное окно или открыто, или закрыто
// ---
// накже нам нужен пост, который мы вибираем
// значение: наш пост - то есть Card  или null - так как его может и быть 
// у объектов всегда исходное состояние null

type InitialState = {
    isSelectedPostModalOpened: boolean;
    // selectedPost: Card | null;  //было Card, на 43 уроке конфликт - замена на Post в @types
    selectedPost: Post | null;
};

// step 3
// initialState как константа
// в initialState должна быть переменная и ее начальное состояние
// ---
// у нас есть данные, но также нам необходима функция, 
// которая и будет менять их => прописываем ее в reducers
// ---
// у объектов всегда исходное состояние null => selectedPost: null

const initialState: InitialState = {
    isSelectedPostModalOpened: false,
    selectedPost: null,
};

// step 1
// создаем postSlice
// у Slice есть опции: имя, initialState, reducers
// имя postReducer - не забываем выносить в наш store (как один из этажей)
// --- 
// у нас есть данные (в initialState), но также нам необходима функция, 
// которая и будет менять (по аналогии с useState) => прописываем ее в reducers
// в эту функцию приходит state и action
// setSelectedPostModalOpened - это и есть reducer
// напрямую присваемваем значению те данные: которые у нас в payload
// ---
// у action будет тип PayloadAction и в него мы кладем то, что у нас в payload - это boolean значенме
// => action: PayloadAction<boolean>
// ---
// после того, как добавили еще selectedPost (данные), то 
// прописываем еще один reducer (функцию) в reducers
// так как как только появились данные, то сразу же функция, которая меняет их
// в эту функцию приходит state и action


const postSlice = createSlice({
    name: "postReducer",
    initialState,
    reducers: {
      setSelectedPostModalOpened: (state, action: PayloadAction<boolean>) => {
        state.isSelectedPostModalOpened = action.payload; //тут данные ловятся и кладутся на нужное место
      },
      setSelectedPost: (state, action: PayloadAction<Post | null>) => {
        state.selectedPost = action.payload;
      },
    }, // вот тут живут функции, которые ловят экшены по типу(т.е. по названию ф-и)
  });


// step 5
// с помощью библиотеки toolkit автоматически генерируются/ создаются action 
// по названию функции setSelectedPostModalOpened 
// далее работаем с этим экшеном (а именно setSelectedPostModalOpened)
// ---
// добавляем функцию setSelectedPost для SelectedPost в export
// ---
// тут сперва необходимо поменять в App 
// используем dispatch

export const { setSelectedPostModalOpened, setSelectedPost } =
  postSlice.actions;
// а вот тут живут сами экшены, которые рождаются библиотекой исходя
// из названия ф-ии, которая их ловит


// step 6 
// вынесли объект, где ключ - это функция
// ---
// создаем getSelectedPost для SelectedPost

export const PostSelectors = {
    getSelectedPostModalOpened: (state: RootState) =>
      state.postReducer.isSelectedPostModalOpened,
    getSelectedPost: (state: RootState) => state.postReducer.selectedPost,
  };
// вот отсюда мы достаем данные, которые заранее видоизменили снежками (экшенами)


// step 7
// и теперь все это необходимо обработать в SelectedPostModal 

// step 2
export default postSlice.reducer; // это мы группу функций экспортируем единым объектом
// чтобы потом запихнуть в store и чтобы редакс видел, куда ему дальше
// распределять экшены (снежки)


