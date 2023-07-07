// Lesson 48 update access token (refresh and verify (жив ли токен))
// Необходимо осуществить refresh токена. 
// В случае если сдох и access и refresh осуществляется разлогиниванием пользователя 
// ---
// Логично все обрабатывать в отдельной саге и потом периспользовать, 
// так как саги позволяют их комбинировать (можно сагу вызывать внутри саги с помощью yield)
// ---
// Результирующее действие у функции  она должна делать какой-то запрос и отдавать какой-то ответ 
// ---
// =>  задача: необходимо проверить 
// - существует ли access и/или refresh  токен, 
// - жив ли access и/или refresh 
// Если токен сдох (первый запрос свалился) => 
// использовать новый токен (который после рефреша) 
// и сделать новый запрос, чтобы получить свежие(живые) данные и отдать это все пользователю 
// Если оба токена сдохли => разлогиниваемся
// step 1 В Sagas создаем папочку helpers и там создаем нашу сагу-помощник callCheckingAuth
// прописываем функцию, чтобы засунуть в нее наш токен
// и первоначально проверяем если у нас валится запрос (сдох токен) - ошибка 401 
// step 2 прописываем логику проверки валидности наших токенов
// не сдох ли access, refresh, оба сдохли
// step 3 мы можем комбинировать наши саги => чтобы ее использовать идем в AuthSaga
// step 4 необходим функционал на разлогинивание пользователя (logoutUser)
// тоже пишем сагу и action =>
// => action logoutUser пописываем в authSlice
// нового воркера прописываем в authSaga
// применяем logoutUser в callCheckingAuth
// step 5 вешаем logout на кнопочку на боковом меню
// => идем в header


import { ApiResponse } from "apisauce";
import { call, put } from "redux-saga/effects";

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "src/utils/constants";
import API from "src/utils/api";
import { RefreshResponseData } from "src/redux/@types";
import { logoutUser, setAccessToken } from "src/redux/reducers/authSlice";

// step 1
// создаем нашу сагу-помощник callCheckingAuth
// он в себя будет принимать наши запросы
// первая функция - это apiCall, где это общее название наших запросов, где нужен токен (например getUserInfo, MyPosts и тд)
// так как у запроса может быть много праметров и мы не знаем сколько => используем ...params (rest-оператор)
// то есть запихиваем наши параметры
// тип any, так как может прийти все что угодно (любой тип)
// ---
// =>  создаем наш response
// ApiResponse тип any, так как может прийти все что угодно
// и внутри разворачиваем наши параметры
// =>  const response: ApiResponse<any> = yield call(apiCall, accessToken, ...params);
// и соответственнно этот response нужно вернуть =>  return response;
// ---
// эту функцию мы пишем, чтобы засунуть в нее наш токен
// => получаем наши токены из localStorage 
// берем за правило, что accessToken пробразываем первым после apiCall, а потом все остальное
// первым, так как по правилам JS spred/rest оператор всегда идут в конце
// сперва конкретика, потом неизвестность
// --- 
// и первоначально проверяем если у нас валится запрос (сдох токен) - ошибка 401 
// то что-то делаем (...), 
// иначе return response (так как мы проверяем только аутентификацию и нам не важны другие статусы (коды ошибок))
// ---
// step 2 прописываем логику проверки валидности наших токенов
// делаем запрос в api для verify
// делаем запрос в api для refresh
// в cлучае позитивного ответа refresh нам возвращается string (cм. запрос)
// => идем в типы и создаем RefreshResponseData

export default function* callCheckingAuth(apiCall: any, ...params: any) {

    // const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    // const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    // const response: ApiResponse<any> = yield call(apiCall, accessToken, ...params);
    // if (response.status === 401) {
    //     ...
    // } else {
    //     return response;
    // }


    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (accessToken && refreshToken) {
        const response: ApiResponse<any> = yield call(
            apiCall,
            accessToken,
            ...params
        ); // тот запрос, который мы хотим сделать из приложения

        const { status: accessStatus } = yield call(API.verifyToken, accessToken); // проверям СРАЗУ не помер ли access

        if (response.status === 401 && accessStatus === 401) {
            // случай, когда access помер - данные не получены

            const { status: refreshStatus } = yield call(
                API.verifyToken,
                refreshToken
            ); // проверяем, помер ли refreshToken
            if (refreshStatus === 401) {
                // если рефреш помер - ну тут уже не судьба - логаут
                yield put(logoutUser());
            } else {
                // если refresh - живой, то можно жить дальше
                const newAccessResponse: ApiResponse<RefreshResponseData> = yield call(
                    API.refreshToken,
                    refreshToken
                ); // пытаемся возродить access
                if (newAccessResponse.ok && newAccessResponse.data) {
                    // проверяем все ли хорошо с нашим запросом прошло на новый access
                    const { access } = newAccessResponse.data;
                    localStorage.setItem(ACCESS_TOKEN_KEY, access);
                    const newResponse: ApiResponse<any> = yield call(
                        apiCall,
                        access,
                        ...params
                    ); // новый запрос с новым токеном - возвращаем уже любой
                    yield put(setAccessToken(access));
                    return newResponse; // отдаем юзеру данные, которые уже получили с валидным токеном - данные получены
                } else {
                    // если не ок с запросом на новый access - логаут
                    yield put(logoutUser());
                }
            }
        } else {
            // если дело не в токене, тогда просто возвращаем наш респонс, пускай сага выше разбирается сама
            return response;
        }
    } else {
        // если нет какого-то из токенов - ну, тут уже не судьба - логаут
        yield put(logoutUser());
    }
}