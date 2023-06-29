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
import { PostsResponseData } from "../@types";
import API from "src/utils/api";
import { getPostsList, setPostsList } from "../reducers/postSlice";

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


// step 4
// создаем воркер
// внутри воркера нам мы работаем с api и response (то, что прилетело с сервера)
// так как необходим запрос в API => API.getPosts (параметров (data) у нас не будет)
// используем ApiResponse и внутрь кладем то, что вернется (типизируем то, что придет из сервера нам)
// ---
// обрабатываем запрос через if и нам его необходимо поместить в redux
// помещаем в редакс через put
// => yield put(setPostsList(response.data.results))

function* postsSagaWorker () {

    const response: ApiResponse<PostsResponseData> = yield call(API.getPosts);

    if (response.ok && response.data) {
        yield put(setPostsList(response.data.results)) // yield put - выполняет функцию dispatch
    } else {
        console.error("Set PostsList error", response.problem);
    }
}

// step 1
// саги работают с помощью генератора function*
// создаем вотчера, который отвечает за посты
// помещаем его в rootSaga
// ---
// step 3 takeLatest: принимает в себя
// action на получение данных (которые получаем из сервера через get-запрос)
// и воркера postsSagaWorker
export default function* postsSagaWatcher () {
    yield all([takeLatest(getPostsList, postsSagaWorker)]);
}