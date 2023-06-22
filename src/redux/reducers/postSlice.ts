
// нам необходимо реализовать предпросмотр поста
// по клику на кнопочку "три точечки" (DotsMenuIcon)
// у нас открывается модальное окно (попап) с нашим постом
// и выбранный пост должен лежат в redux
// --- HW6
// реализовать функционал, где при нажатии на картинку появляется
// модальное окно и в ней картинка из поста
// --- Lesson 44
// реализовать функционал like & dislike. 
// like - ставится при нажатии и убирается при повторно
// аналогично и с dislike
// если уже есть like  и нажимается dislike, то
// => like -1, а dislike +1 и наоборот
// у нас будет 2 массива: лайкнутые и дизлайкнутые посты,
// которые создаются в initialState (это наши данные)


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
import { LikeStatus, Post, PostsList } from "src/@types";
import { RootState } from "../store";

// step 4 
// создаем тип для initialState (для корректной работы в App)
// для модального окна
// значение boolea - так как модальное окно или открыто, или закрыто
// ---
// накже нам нужен пост, который мы вибираем
// значение: наш пост - то есть Card  или null - так как его может и быть 
// у объектов всегда исходное состояние null
// ---
// для картинки selectedImage - значение строка (string)
// ---
// для likedPosts и dislikedPosts типизация будет массив наших постов
// то есть PostsList из @types 


type InitialState = {
  isSelectedPostModalOpened: boolean;
  // selectedPost: Card | null;  //было Card, на 43 уроке конфликт - замена на Post в @types
  selectedPost: Post | null;
  selectedImage: string;
  likedPosts: PostsList;
  dislikedPosts: PostsList;
};

// step 3
// initialState как константа
// в initialState должна быть переменная и ее начальное состояние
// ---
// у нас есть данные, но также нам необходима функция, 
// которая и будет менять их => прописываем ее в reducers
// ---
// у объектов всегда исходное состояние null => selectedPost: null
// ---
// у картинки selectedImage - исходное состояние будет пустая строка
// ---
// Like & Dilslike action
// у нас будет 2 массива: лайкнутые и дизлайкнутые посты,
// которые создаются в initialState (это наши данные)
// исходное значение у массива - пустой массив

const initialState: InitialState = {
  isSelectedPostModalOpened: false,
  selectedPost: null,
  selectedImage: '',
  likedPosts: [],
  dislikedPosts: [],
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
// ---
// прописываем функцию для картинки, в которую приходит (state, action: PayloadAction<string>) 
// так как тип для картинки - string
// ---
// lesson 44 Like & Dilslike
// прописываем функцию для Like & Dilslike
// у нас есть действия(Like & Dilslike) и нам необходимо 
// класть карточки в массив с постами likedPosts и dislikedPosts или убирать их оттуда
// а также перемещать, если уже есть like и нажимается dislike,
// для этого логично сделать один action и прописать там весь функционал
// ---
// также мы создаем enum в @types, так как Like & Dilslike - жто статичный наьор данных и он не меняется
// ---
// в PayloadAction будет карточка, которую запихиваем в массив 
// и наш LikeStatus (enum) 
// у нас приходит несколько вещей - это объект => {}
// и типизируем его "ключ (card): значение (Post)"
// ---
// достаем из action все, что нам надо (деструктурируем объект)
// ---
// логичным будет первоначально проверить существует ли этот пост в массиве лайков или дизлайков
// это можно сделать с помощью метода поиска в массиве findIndex (indexOf не подойдет)
// findIndex при отсутствии возвращает -1, если  есть - индекс
// и в последующем нам нужно будет вырезать по индексу, если он существует
// => нам нужно будет создать likedIndex и disLikedIndex
// и сравниванием по id с помощью функции
// ---
// также создаем переменную isLike с помощью которой проверяем лайкнут ли пост
// и получается, что все зависит от этой переменной
// у нас получается разветвление на главное и вторичное действие
// также появляется ключ и индекс (основной и вторичный)
// главный ключ принимаем, что это like
// то есть нажимая на лайк (isLike?) - 
// главное действие (ключ) - у нас помещение в массив likedPosts, иначе в массив dislikedPosts
// вторичное действие (ключ) - ситуация наоборот, сперва в dislikedPosts затем в likedPosts 
// (если в dislikedPosts существует пост, то мы его оттуда достаем)
// для индекса логика аналогична
// ---
// если мы ставим лайк => и работаем с запихнуть или убрать из массивов like (результативный массив)
// то мы работаем с mainKey и mainIndex 
// второстепенное действие - проверить есть ли это в противоположном массиве
// и если уже существует, то его оттуда нужно убрвть
// то есть мы хотим изменить наш выбор (заменить like на dislike) - это уже второстепенное действие
// ---
// главное действие - проверяем если ли карточка в массиве
// mainIndex === -1 (где -1 от findIndex) 
// если ее нет => то мы ее пушим, иначе удаляем (= поставить лайк/ или убрать поставленный лайк)
// ---
// второстепенное действие
// если уже лежит карточка (например стоит уже лайк) - это значит 
// что индекс > -1 (карточка уже существует)
// то нам нужноее оттуда убрать (вырезать) через splice




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
    setSelectedImage: (state, action: PayloadAction<string>) => {
      state.selectedImage = action.payload;
    },
    setLikeStatus: (state, action: PayloadAction<{ card: Post; status: LikeStatus }>) => {

      const { card, status } = action.payload; // (деструктурируем объект)

      const likedIndex = state.likedPosts.findIndex(
        (item) => item.id === card.id // функция, для того чтобы найти индек. сравниванием по id
      );

      const disLikedIndex = state.dislikedPosts.findIndex(
        (item) => item.id === card.id
      );

      const isLike = status === LikeStatus.Like

      const mainKey = isLike ? 'likedPosts' : 'dislikedPosts'

      const secondaryKey = isLike ? 'dislikedPosts' : 'likedPosts'

      const mainIndex = isLike ? likedIndex : disLikedIndex

      const secondaryIndex = isLike ? disLikedIndex : likedIndex

      // положить в основную толпу (результирующий массив) - главное действие
      if (mainIndex === -1) {
        state[mainKey].push(card)
      } else {
        state[mainKey].splice(mainIndex, 1) //откуда вырезать и сколько вырезать
      }

      // второстепенное действие
      if (secondaryIndex > -1) {
        state[secondaryKey].splice(secondaryIndex, 1)
      }
    }
  }, // вот тут живут функции, которые ловят экшены по типу(т.е. по названию ф-и)
});


// step 5
// с помощью библиотеки toolkit автоматически генерируются/ создаются action 
// по названию функции setSelectedPostModalOpened 
// далее работаем с этим экшеном (а именно setSelectedPostModalOpened)
// ---
// добавляем функцию setSelectedPost для SelectedPost в export
// ---
// тут сперва необходимо поменять (обработать) в App 
// используем dispatch
// ---
// для SelectedPost - обрабатываем в SelectedPostModal 
// ---
// добавляем экшен setSelectedImage и обрабатываем его в SelectedImageModal
// добавляем экшен setLikeStatus и обрабатываем его в CardList


export const { setSelectedPostModalOpened, setSelectedPost, setSelectedImage, setLikeStatus } =
  postSlice.actions;
// а вот тут живут сами экшены, которые рождаются библиотекой исходя
// из названия ф-ии, которая их ловит


// step 6 
// вынесли объект, где ключ - это функция
// ---
// создаем getSelectedPost для SelectedPost
// создаем  getSelectedImage для selectedImage
// getLikedPosts и getDislikedPosts для SelectedPost

export const PostSelectors = {
  getSelectedPostModalOpened: (state: RootState) =>
    state.postReducer.isSelectedPostModalOpened,
  getSelectedPost: (state: RootState) => state.postReducer.selectedPost,
  getSelectedImage: (state: RootState) => state.postReducer.selectedImage,
  getLikedPosts: (state: RootState) => state.postReducer.likedPosts,
  getDislikedPosts: (state: RootState) => state.postReducer.dislikedPosts
};
// вот отсюда мы достаем данные, которые заранее видоизменили снежками (экшенами)


// step 7
// и теперь все это необходимо обработать в SelectedPostModal 
// обрабатываем image в SelectedImageModal
// Like & Dilslike необходимо обработать в CardList

// step 2
export default postSlice.reducer; // это мы группу функций экспортируем единым объектом
// чтобы потом запихнуть в store и чтобы редакс видел, куда ему дальше
// распределять экшены (снежки)


