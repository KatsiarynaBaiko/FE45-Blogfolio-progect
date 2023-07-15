// HW8 (saga)
// Необходимо Реализовать страницу все посты 
// Получаем посты по get-запросу из сервера 
// (лимит 12 - количество постов на страничке по макету)
// => потом необходимо его отправить в редакс, 
// чтобы отображались посты на страничке Home (это вместо массива мокнутых данных)
// ---
// Правило:
// Если что-то получаем с backend - всегда - 2 действия
// Get action - получить данные
// Set action- их отправить через redux

import { ApiResponse } from "apisauce";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { GetPostsPayload, GetSearchedPostsPayload, PostsResponseData } from "../@types";
import API from "src/utils/api";
import { getMyPosts, getPostsList, getSearchedPosts, getSinglePost, setMyPosts, setPostsList, setPostsListLoading, setSearchedPosts, setSinglePost, setSinglePostLoading } from "../reducers/postSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { Post } from "src/@types";
import callCheckingAuth from "./helpers/callCheckingAuth";

// step 1 HW8
// создаем вотчера, который отвечает за посты
// помещаем его в rootSaga для работоспособности кода
// step 2
// так как мы получаем данные с сервера
// то нам нужен get-запрос
// => идем в api и создаем функцию getPosts, которая возвращает get-запрос
// step 3
// когда идет работа с данными - то это всегда action 
// => в postSlice необходимо создать еще один action на получение данных
// (которые получаем из сервера через get-запрос)
// action в сагах - пустые
// step 4
// создаем воркер
// step 5
// полученные посты из сервера нам необходимо отправить в редакс
// помещаем их в редакс через put в саге
// yield put(setPostsList(response.data.results))
// а так как нам необходимо поместить в редакс и работа будет с action, то 
// в postSlice необходима функция, которая ловит экшен и помещает в редакс (setPostsList)
// обрабатываем setPostsList в Home
// ---
// step 6 Lesson 46 (single post = selected post)
// нам необходимо написать сагу
// в postsSaga создаем еще одного вотчера для single post
// ---
// Lesson 48 work with Loader (SelectedPost)
// чтобы работал Loader для SelectedPost в postSaga
// используем yield put(setSinglePostLoading(true));
// ---
// HW10 MyPosts
// нам необходимо написать сагу
// в postsSaga создаем еще одного вотчера для myPosts
// ---
// step 5 Lesson 49 search (по нажатию на кнопку)
// после создания экшенов в postSlice идем в postsSaga и создаем воркера для работы с поиском (SearchedPostsWorker)
// ---
// step 5 Lesson 50 пагинация (нумерическая)
// создаем воркера getPostsWorker для работы с пагинацией
// ---
// step 8 Lesson 50 пагинация (бесконечная прокрутка)
// обновляем getSearchedPostsWorker


// step 4
// создаем воркер
// внутри воркера нам мы работаем с api и response (то, что прилетело с сервера)
// так как необходим запрос в API => API.getPosts (параметров (data) у нас не будет)
// используем ApiResponse и внутрь кладем то, что вернется (типизируем то, что придет из сервера нам)
// ---
// обрабатываем запрос через if и нам его необходимо поместить в redux
// помещаем в редакс через put
// => yield put(setPostsList(response.data.results))
// ---
// step 5 Lesson 50 пагинация (нумерическая)
// воркер  postsSagaWorker = getPostsWorker, 
// только в getPostsWorker добавлен момент с пагинацией 
// => postsSagaWorker можно закоментировать


// function* postsSagaWorker() {

//   const response: ApiResponse<PostsResponseData> = yield call(API.getPosts);

//   if (response.ok && response.data) {
//     yield put(setPostsList(response.data.results)) // yield put - выполняет функцию dispatch
//   } else {
//     console.error("Set PostsList error", response.problem);
//   }
// }


// cоздаем еще одного вотчера для single post
// ---
// нам необходим action, так как работаем с данными 
// => необходимо создать его в postSlice(step 7)
// ---
// после создания action и связываения с вотчером (step 9)
// описываем воркера
// помещаем данные в реедакс с помощью put
// остается запустить все в page SelectedPost
// ---
// Lesson 48 work with Loader (SelectedPost)
// чтобы работал Loader для SelectedPost в postSaga
// в самом начале (то есть в воркере getSinglePostWorker )
// используем yield put(setSinglePostLoading(true));
// и в любом случае в конце false

function* getSinglePostWorker(action: PayloadAction<string>) {
  yield put(setSinglePostLoading(true));
  const response: ApiResponse<Post> = yield call(
    API.getSinglePost,
    action.payload
  );
  if (response.ok && response.data) {
    yield put(setSinglePost(response.data));
  } else {
    console.error("Activate User error", response.problem);
  }
  yield put(setSinglePostLoading(false));
}


// step 5  HW10 MyPosts
// приступаем к работе в саге postSaga. Создаем еще одного воркера
// типизация ApiResponse будет PostsResponseData 
// приходит аналогичный ответ, как при полцчении всех постов => <PostsResponseData>
// так как нам нужен живой токен (запустить процесс refresh and verify token, иначе logout)
// => используем сагу-помощника callCheckingAut
// обрабатываем с помощью if и помещаем в редакс с  помощью put
// не забываем его привязать к нашему вотчеру postsSagaWatcher

function* getMyPostsWorker() {

  const response: ApiResponse<PostsResponseData>= yield callCheckingAuth(API.getMyPosts);

  // if (response.ok && response.data) {
  //   yield put(setMyPosts(response.data.results));
  // } else {
  //   console.error("Set My Posts error", response.problem);
  // }

  // если в ApiResponse добавить "| undefined"
  // if (response && response?.status === 404) {
  //   yield put(setMyPosts([]));
  //   console.error("404 выводит в консоль", response.problem);
  // }
  // else if (response && response?.ok && response?.data) {
  //   yield put(setMyPosts(response.data.results)); 
  // }
  // else {
  //   console.error("Set My Posts error", response?.problem);
  // }

  if (response.status === 404) {
    yield put(setMyPosts([]));
    console.error("404 выводит в консоль", response.problem);
  }
  else if (response.ok && response.data) {
    yield put(setMyPosts(response.data.results)); 
  }
  else {
    console.error("Set My Posts error", response.problem);
  }
}


// step 5 Lesson 49 search (по нажатию на кнопку)
// создаем воркера для работы с поиском (SearchedPostsWorker)
// нам нужно передавать запрос => action: PayloadAction<string> и достаем из  action.payload
// ---
// step 8 Lesson 50 пагинация (бесконечная прокрутка)
// обновляем getSearchedPostsWorker

// function* getSearchedPostsWorker(action: PayloadAction<string>) {
//   const response: ApiResponse<PostsResponseData> = yield call(
//     API.getPosts,
//     0, // чтобы не ругался при пагинации
//     action.payload
//   );
//   if (response.ok && response.data) {
//     yield put(setSearchedPosts(response.data.results));
//   } else {
//     console.error("Searched Posts error", response.problem);
//   }
// }

function* getSearchedPostsWorker(
  action: PayloadAction<GetSearchedPostsPayload>
) {
  const { offset, search } = action.payload;
  const response: ApiResponse<PostsResponseData> = yield call(
    API.getPosts,
    offset,
    search
  );
  if (response.ok && response.data) {
    const { results, count } = response.data;
    yield put(
      setSearchedPosts({
        postsList: results,
        total: count,
      })
    );
  } else {
    console.error("Searched Posts error", response.problem);
  }
}

// step 5 Lesson 50 пагинация (нумерическая)
// создаем в postsSaga воркера getPostsWorker. 
// Не забываем его привязать к вотчеру
// деструктурируем наш payload => const { offset, isOverwrite } = action.payload;
// в ApiResponse кладем <PostsResponseData> - то что придет от сервера
// ---
// после обновления экшенов в postSlice (step 6) передаем их в сагу
// воркер  postsSagaWorker = getPostsWorker, только в getPostsWorker добавлен момент с пагинацией 
// => postsSagaWorker можно закоментировать

function* getPostsWorker(action: PayloadAction<GetPostsPayload>) {
  yield put(setPostsListLoading(true));
  const { offset, isOverwrite } = action.payload;
  const response: ApiResponse<PostsResponseData> = yield call(
    API.getPosts,
    offset
  );
  if (response.ok && response.data) {
    const { count, results } = response.data;
    yield put(
      setPostsList({
        total: count,
        postsList: results,
        isOverwrite,
      })
    );
  } else {
    console.error("Get Posts List error", response.problem);
  }
  yield put(setPostsListLoading(false));
}



// step 1
// саги работают с помощью генератора function*
// создаем вотчера, который отвечает за посты
// помещаем его в rootSaga
// ---
// step 3 takeLatest: принимает в себя
// action на получение данных (которые получаем из сервера через get-запрос)
// и воркера postsSagaWorker
// ---
// step 9 Lesson 46  (single post = selected post)
// привязываем воркер  getSinglePostWorker к вотчеру
// --
// step 5  HW10 MyPosts
// привязываем воркер getMyPostsWorker к вотчеру
// ---
// step 5 Lesson 49 search (по нажатию на кнопку)
// привязываем воркер getSearchedPostsWorker к вотчеру


export default function* postsSagaWatcher() {
  yield all([
    // takeLatest(getPostsList, postsSagaWorker),
    takeLatest(getSinglePost, getSinglePostWorker),
    takeLatest(getMyPosts, getMyPostsWorker),
    takeLatest(getSearchedPosts, getSearchedPostsWorker),
    takeLatest(getPostsList, getPostsWorker),
  ]);
}