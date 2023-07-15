
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
// --- HW7
// реализовать функционал, по сохранению поста при нажатии на кнопочку Bookmark
// сохраненные посты помезаются в массив и удаляются из него (savedPosts)
// --- HW8 step 3
// => в postSlice необходимо создать еще один action на получение данных
// (которые получаем из сервера через get-запрос)
// action в сагах - пустые
// ---
// полученные посты из сервера нам необходимо отправить в редакс
// помещаем их в редакс через put в саге
// yield put(setPostsList(response.data.results))
// а так как нам необходимо поместить в редакс и работа будет с action, то 
// в postSlice необходима функция, которая ловит экшен и помещает в редакс (setPostsList)
// ---
//  step 7 46 (single post = selected post)
//  так как работаем с данными 
// => необходимо создать экшен в postSlice(step 7)
// --- 
// step 6 Lesson 50 пагинация (нумерическая)
// в postsSlice создаем экшен setPostsListLoading (чтобы работал Loader)
// обновляем экшены getPostsList и setPostsList
// ---
// step 3 Lesson 50 пагинация (бесконечная прокрутка)
// обновляем экшены getSearchedPosts и setSearchedPosts с учетом бесконечной прокрутки



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
import { LikeStatus, Post, PostsList, SaveStatus } from "src/@types";
import { GetPostsPayload, GetSearchedPostsPayload, SetPostsListPayload, SetSearchedPostsPayload } from "../@types";
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
// ---
// для Bookmark (savedPosts) типизация - массив наших постов PostsList из @types 
// ---
// типизация postsList (полученные посты с помощью get-запроса) - массив наших постов PostsList из @types
// типизация singlePost  - наш пост или null (так как его может и быть)
// типизация myPost - полученные посты с помощью get-запроса - массив постов PostsList из @types
// типизация searchedPosts - полученные посты с помощью get-запроса - массив постов PostsList из @types
// типизация isPostsListLoading -  boolean;
// типизация totalCount - общее количество постов - number
// типизация totalSearchedCount - общее количество постов при поиске- number

type InitialState = {
  isSelectedPostModalOpened: boolean;
  // selectedPost: Card | null;  //было Card, на 43 уроке конфликт - замена на Post в @types
  selectedPost: Post | null;
  selectedImage: string;
  likedPosts: PostsList;
  dislikedPosts: PostsList;
  savedPosts: PostsList;
  postsList: PostsList;
  singlePost: Post | null;
  singlePostLoading: boolean;
  myPosts: PostsList;
  searchedPosts: PostsList;
  isPostsListLoading: boolean;
  totalCount: number;
  totalSearchedCount: number;
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
// ---
// Bookmark (savedPosts)
// для Bookmark будет один массив куда ьуду помещаться/удаляться посты
// ---
// postsList - полученные посты с помощью get-запроса из сервера
// singlePost - полученный пост с помощью get-запроса из сервера
// myPosts - полученный пост с помощью get-запроса из сервера
// myPosts - полученные посты с помощью get-запроса из сервера
// isPostsListLoading: false (первоначальное значение у boolean - это false)
// totalCount - первоначальное значение = 0 (так как сперва 0 постов)
// totalSearchedCount - первоначальное значение = 0 (так как сперва 0 постов)

const initialState: InitialState = {
  isSelectedPostModalOpened: false,
  selectedPost: null,
  selectedImage: '',
  likedPosts: [],
  dislikedPosts: [],
  savedPosts: [],
  postsList: [],
  singlePost: null,
  singlePostLoading: false,
  myPosts: [],
  searchedPosts: [],
  isPostsListLoading: false,
  totalCount: 0,
  totalSearchedCount: 0,
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
// ---
// Bookmark (savedPosts)
// логика мысли аналогична Like & Dilslike
// за исключением того, что не будет разветвления действий
// для Bookmark (savedPosts) мы либо кладем пост, либо его удаляем
// ---
// HW8 step 3
// action на получение данных (которые получаем из сервера через get-запрос)
// action в сагах - пустые
// так как нам ничего не нужно передавать, то тип action: undefined 
// => getPostsList: (state, action: PayloadAction<undefined>) => { }
// или getPostsList: (_, __: PayloadAction<undefined>) => { } (_ - когда не нужно использовать дальше)
// ---
// полученные посты из сервера (get-запрос) нам необходимо отправить в редакс 
// =>  нужна функция, которая ловит экшен и отправляет его setPostsList 
// ---
// step 7 Lesson 46 (single post = selected post)
// нам необходимо создать экшен для singlePost (getSinglePost)
// у нас будет пустой экшен и PayloadAction<string>
// ---
// step 8 Lesson 46 (single post = selected post)
// так как данные нужно еще положить в редакс. то 
// создаем еще один экшен setSinglePost
// ---
// Lesson 48 work with Loader (SelectedPost)
// для того, чтобы работал Loader нам необходим action setSinglePostLoading
// также прописываем селектор getSinglePostLoading
// ---
// step 2 HW10 MyPosts
// создаем action для получения данных в postSlice getMyPosts. 
// Так как нам ничего не нужно передавать => тип экшена undefined
// ---
// step 3 HW10 MyPosts
// создаем  action setMyPosts, который будет ложить данные в редакс, 
// также в initialState создаем myPosts. Это массив - первоначальное состояние - []
// и типизируем action PayloadAction<PostsList>
// ---
// step 4 HW10 MyPosts
// создаем селектор getMyPosts для myPosts 
// ---
// step 4 step 1 Lesson 49 search (по нажатию на кнопку)
// в reducers -> postSlice и создаем action на получение данных getSearchedPosts
// также данные необходимо положить в редакс => нежен еще один action setSearchedPosts и селектор к нему
/// ---
// step 6 Lesson 50 пагинация (нумерическая)
// в postsSlice создаем экшен setPostsListLoading
// => добавляем в initialState - isPostsListLoading
// обновляем экшены getPostsList и setPostsList
// для setPostsList типизируем payload в setPostsListPayload @types
// для setPostsList добавляем в initialState - totalCount - общее количество постов
// в setPostsList нам необходимо прописать условие 
// если перезапись, то присвоить вместо страрого массива новый маасив 
// то есть его запушить =>  state.postsList.push(...postsList);
// => ...postsList - мы разворачиваем массив и допихиваем туда элементы массива
// если не применять оператор ... (spred) то вышел бы массив в массивк
// и возвращаемся к работе в postsSaga воркера getPostsWorker
// ---
// step 3 Lesson 50 пагинация (бесконечная прокрутка)
// в postSlice обновляем экшены getSearchedPosts и setSearchedPosts 
// с учетом добавления бесконечной прокрутки. 
// Также прописываем типы payload GetSearchedPostsPayload и SetSearchedPostsPayload в @types
// ---
// step 9 Lesson 50 пагинация (бесконечная прокрутка)
//  возникает косячок, что результаты старого запроса сохраняются 
// и на него накладывается новый 
// это решается через очистку предыдущего запроса при предотправке запроса к
// => в Header в handleSearchOpened и передаем функцию очистки dispatch(clearSearchedPosts());
// в postSlice прописываем экшен на очистку => clearSearchedPosts


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
    },

    // setSavedStatus - version 1
    // setSavedStatus: (state, action: PayloadAction<{ card: Post; status: SaveStatus }>) => {
    //   const { card, status } = action.payload;

    //   const savedIndex = state.savedPosts.findIndex(
    //     (item) => item.id === card.id
    //   );

    //   const isSaved = status === SaveStatus.Saved

    //   const mainIndex = isSaved ? savedIndex : 1

    //   if (mainIndex === -1) {
    //     state.savedPosts.push(card)
    //   } else
    //     state.savedPosts.splice(mainIndex, 1)
    // },

    // setSavedStatus - version 2
    setSavedStatus: (state, action: PayloadAction<{ card: Post }>) => {
      const { card } = action.payload;

      const savedIndex = state.savedPosts.findIndex(
        (item) => item.id === card.id
      );

      if (savedIndex === -1) {
        state.savedPosts.push(card)
      } else
        state.savedPosts.splice(savedIndex, 1)
    },

    // getPostsList: (_, __: PayloadAction<undefined>) => { },

    // setPostsList: (state, action: PayloadAction<PostsList>) => {
    //   state.postsList = action.payload;
    // },

    getPostsList: (_, __: PayloadAction<GetPostsPayload>) => { },

    setPostsList: (state, action: PayloadAction<SetPostsListPayload>) => {
      const { total, isOverwrite, postsList } = action.payload;
      state.totalCount = total;
      if (isOverwrite) {
        state.postsList = postsList;
      } else {
        state.postsList.push(...postsList);
      }
    },

    getSinglePost: (_, __: PayloadAction<string>) => { },

    setSinglePost: (state, action: PayloadAction<Post | null>) => {
      state.singlePost = action.payload;
    },

    setSinglePostLoading: (state, action: PayloadAction<boolean>) => {
      state.singlePostLoading = action.payload;
    },

    getMyPosts: (_, __: PayloadAction<undefined>) => { },

    setMyPosts: (state, action: PayloadAction<PostsList>) => {
      state.myPosts = action.payload;
    },

    // getSearchedPosts: (_, __: PayloadAction<string>) => { },

    // setSearchedPosts: (state, action: PayloadAction<PostsList>) => {
    //   state.searchedPosts = action.payload;
    // },

    getSearchedPosts: (_, __: PayloadAction<GetSearchedPostsPayload>) => { },
    
    setSearchedPosts: ( state,action: PayloadAction<SetSearchedPostsPayload>) => {
      const { total, postsList } = action.payload;
      state.totalSearchedCount = total;
      state.searchedPosts.push(...postsList);
    },

    setPostsListLoading: (state, action: PayloadAction<boolean>) => {
      state.isPostsListLoading = action.payload;
    },

    clearSearchedPosts: (state) => {
      state.searchedPosts = [];
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
// тут сперва необходимо поменять (обработать) в App 
// используем dispatch
// ---
// для SelectedPost - обрабатываем в SelectedPostModal 
// ---
// добавляем экшен setSelectedImage и обрабатываем его в SelectedImageModal
// добавляем экшен setLikeStatus и обрабатываем его в CardList
// добавляем экшен setSavedStatus и обрабатываем его в CardList
// экспортируем getPostsList и setPostsList
// экспортируем getSinglePost и setSinglePost
// экспортируем setPostsListLoading

export const { setSelectedPostModalOpened, setSelectedPost,
  setSelectedImage, setLikeStatus, setSavedStatus,
  getPostsList, setPostsList,
  getSinglePost, setSinglePost, setSinglePostLoading,
  getMyPosts, setMyPosts,
  getSearchedPosts, setSearchedPosts,
  setPostsListLoading,
  clearSearchedPosts, } =
  postSlice.actions;
// а вот тут живут сами экшены, которые рождаются библиотекой исходя
// из названия ф-ии, которая их ловит


// step 6 
// вынесли объект, где ключ - это функция
// ---
// создаем getSelectedPost для SelectedPost
// создаем  getSelectedImage для selectedImage
// getLikedPosts и getDislikedPosts для SelectedPost
// создаем getSavedPosts для SavedPosts
// создаем getPostsList для PostsList
// создаем getSinglePost для SinglePost
// создаем getMyPosts для MyPosts 
// создаем getPostsListLoading для PostsList
// ---
// step 8 Lesson 50 пагинация (нумерическая)
// нам нужно получить итоговое количество постов, которое есть => создаем селектор getTotalPostsCount
// и в Home вызываем через useSelector
// ---
// step 5 Lesson 50 пагинация (бесконечная прокрутка)
// нам нужно получить итоговое количество постов, которые есть при поиске => создаем селектор getTotalSearchedPosts
// в InitialState добавляем totalSearchedCount
// и в search вызываем через useSelector

export const PostSelectors = {
  getSelectedPostModalOpened: (state: RootState) =>
    state.postReducer.isSelectedPostModalOpened,
  getSelectedPost: (state: RootState) => state.postReducer.selectedPost,
  getSelectedImage: (state: RootState) => state.postReducer.selectedImage,
  getLikedPosts: (state: RootState) => state.postReducer.likedPosts,
  getDislikedPosts: (state: RootState) => state.postReducer.dislikedPosts,
  getSavedPosts: (state: RootState) => state.postReducer.savedPosts,
  getPostsList: (state: RootState) => state.postReducer.postsList,
  getSinglePost: (state: RootState) => state.postReducer.singlePost,
  getSinglePostLoading: (state: RootState) => state.postReducer.singlePostLoading,
  getMyPosts: (state: RootState) => state.postReducer.myPosts,
  getSearchedPosts: (state: RootState) => state.postReducer.searchedPosts,
  getPostsListLoading: (state: RootState) => state.postReducer.isPostsListLoading,
  getTotalPostsCount: (state: RootState) => state.postReducer.totalCount,
  getTotalSearchedPosts: (state: RootState) =>state.postReducer.totalSearchedCount,
};
// вот отсюда мы достаем данные, которые заранее видоизменили снежками (экшенами)


// step 7
// и теперь все это необходимо обработать в SelectedPostModal 
// обрабатываем image в SelectedImageModal
// Like & Dilslike необходимо обработать в CardList
// SavedPosts необходимо обработать в CardList
// postsList обрабатываем в Home

// step 2
export default postSlice.reducer; // это мы группу функций экспортируем единым объектом
// чтобы потом запихнуть в store и чтобы редакс видел, куда ему дальше
// распределять экшены (снежки)


