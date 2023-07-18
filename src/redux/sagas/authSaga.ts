// Lesson 45 (saga)
// реализовать активацию пользователя (используя redux-saga)
// без активации (активация на след занятии)

import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { ActivateUserPayload, SignInUserPayload, SignInUserResponseData, SignUpResponseData, SignUpUserPayload, UserInfoPayload } from "../@types";
import { activateUser, getUserInfo, logoutUser, setAccessToken, setUserInfo, sighUpUser, signInUser } from "../reducers/authSlice";
import { ApiResponse } from "apisauce";
import { callbackify } from "util";
import API from "src/utils/api";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "src/utils/constants";
import { access } from "fs";
import callCheckingAuth from "./helpers/callCheckingAuth";

// redux-saga имеет 2 важных разделения в функциях:
// функция watcher - распределение (привязывает action к исполнителю)
// функция worker -  взаимодействие с данными
// rootSaga - главный watcher, в которую мы помещаем всех остальных watcherов
// saga работает на генераторах (function* - обозначение)
// ---
// step 1 Lesson 45
// => создаем наш главный watcher с помощью генератора function* rootSaga в rootSaga.ts
// а также необходимо привязать saga к store
// ---
// дальше начинаем продумывать архитектуру
// step 2
// если мы создаем отдельный файл, то первым делом создаем в нем watcher, который будет за всем следить
// сразу же помещаем в rootSaga
// ---
// step 3
// так как нам необходимо зарегать человека, то нам необходим какой-то экшен
// => в reducers появляется новый slice - authSlice.ts
// ---
// step 4
// дальше нам необходимо передать данные на backend
// для этого появляется swagger
// нам нужен запрос post/auth/users/ у которого будет тело
// у нас будут поля username", "email, "password"
// => action в Payload будет нести объект с этими данными из поста
// => создаем в папке redux файл @types.ts и SignUpUserData и SignUpUserPayload
// step 5
// если мы где-то запихнули экшен, который создали, то нам нужно его и ловить
// а ловим мы их в authSaga
// и тут добавляентся новый помощник (эффект) takeLatest
// step 6
// созданием worker
// step 7 
// создание запроса в api, в который мы будет стучаться
// для этого устанавливали библиотеку apisauce (=> идем в папочку  api)
// ---
// step 8
// все, сага написана, необходимо ее вызвать
// делаем это в pages -> SingUp
// ---
// для проверки можем использовать сервисы временной почты (temp-mail.org например)
// и если пришло туда письмо активации - то все отлично :)
// ---
// step 6 Lesson 46 (activate user)
// нам необходимо написать сагу для activate user - это делаем в  authSаga
// для этого создаем нового воркера function* activateUserWorker
// не забываем его привязать к вотчеру  authSagaWatcher
// ---
// step 4 Lesson 47 (auth+ access token)
// создаем еще одного воркера signInUserWorker
// для работы с авторизацией
// ---
// step 5 HW9 (userInfo)
// создаем еще одного воркера getUserInfoWorker
// для работы с получением инфы о пользователе
// ---
// step 4 Lesson 48 update access token (refresh and verify)
// необходим функционал на разлогинивание пользователя (logoutUser)
// тоже пишем сагу и action
// action logoutUser в authSlice
// нового воркера прописываем в authSaga
// применяем logoutUser в callCheckingAuth



// step 6
// созданием worker
// ---
// worker принимает в себя эшен, у которого будет аналогичный тип
// так как это идин и тот же экшен, просто впихиваемый в воркера
// ---
// после создания запроса (step 7)
// внутри воркера нам необходимо вызывать api
// для этого используется еще один помощник (эффект) call
// и уже дальше внутри будем работать c response (то, что прилетело с сервера)
// => const response = yield call(sighUpUser, action.payload)
// ---
// поплохело, так как не непонятно что вернутся => используем ApiResponse
// и внутрь ApiResponse кладем то, что вернется (типизируем то, что придет из сервера нам)
// ---
// необходимо это обработать
// это простой запрос => с использованием if
// --- 
// 2 ошибки
// вызывается sighUpUser - это экшен, а необходим запрос в API => API.signUpUser
// signUpUser - подчеркивает красным так как 
// в call если передается функция и есть параметры, то сперва передается экземпляр функции (API.signUpUser)
// а затем параметры 
// но мы передаем action.payload (= SignUpUserPayload в котором лежит data и callback (см @types))
// но нам нужна только data => деструктурировать action
// и data кладем в call
// ---
// все, сага написана, необходимо ее вызвать


function* sighUpUserWorker(action: PayloadAction<SignUpUserPayload>) {
    // const response: ApiResponse<SignUpResponseData> = yield call(sighUpUser, action.payload) // ошибка

    const { data, callback } = action.payload; // деструктурировали action => можно вытащить только дата
    const response: ApiResponse<SignUpResponseData> = yield call(API.signUpUser, data);

    if (response.ok && response.data) {
        callback(); // в этом случае делаем callback
    } else {
        console.error("Sigh Up User error", response.problem);
    }
}

// воркер signInUserWorker для работы с авторизацией
// тип для action: PayloadAction<SignInUserPayload>
// используем ApiResponse и внутрь кладем то, что вернется (типизируем то, что придет из сервера нам)
// обрабатываем его с помощью if
// помещаем в редакс с использованием put
// --
// step 5 Lesson 47 (auth+ access token)
// чтобы токен мы могли каждый раз использовать
// и не пересоздавать, и чтобы он не терялся
// используется localStorage
// создаем файл constants с постоянными и прописываем ключи
// кладем в localStorage наши ключи и значения токенов 
// привязываем воркер к вотчеру

function* signInUserWorker(action: PayloadAction<SignInUserPayload>) {
    const { data, callback } = action.payload;

    const response: ApiResponse<SignInUserResponseData> = yield call(API.createToken, data);

    if (response.ok && response.data) {
        yield put(setAccessToken(response.data.access))
        localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access)
        localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh)
        callback(); // в этом случае делаем callback
    } else {
        console.error("Sigh In User error", response.problem);
    }
}


// воркер function* activateUserWorker для  activate user 
// в ApiResponse нам ничего не надо передавать => <undefined>
// && response.data - нам не нужна, так как нам достаточно того, что данные пришли
// не забываем его привязать к нашему вотчеру authSagaWatcher

function* activateUserWorker(action: PayloadAction<ActivateUserPayload>) {
    const { data, callback } = action.payload;
    const response: ApiResponse<undefined> = yield call(API.activateUser, data);
    if (response.ok) {
        callback();
    } else {
        console.error("Activate User error", response.problem);
    }
}

// воркер getUserInfoWorker для работы с получением инфы о пользователе
// нам нужен токен, то достаем его из LocalStorage.getItem
// проверяем, есть ли токен для пользователя => используем if
// кладем данные в редакс с использованием put
// не забываем его привязать к нашему вотчеру authSagaWatcher
// типизацией для ApiResponse будет UserInfoPayload 
// --- 
// step 3 Lesson 48 update access token (refresh and verify)
// используем сагу callCheckingAuth 
// процесс по refresh and verify token, иначе logout

// function* getUserInfoWorker() {
//     const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
//     if (accessToken) {
//         const response: ApiResponse<UserInfoPayload> = yield call(
//             API.getUserInfo,
//             accessToken
//         );
//         if (response.ok && response.data) {
//             yield put(setUserInfo(response.data));
//         } else {
//             console.error("Get User Info error", response.problem);
//         }
//     }
// }


// step 3 Lesson 48 update access token (refresh and verify)
// мы можем комбинировать наши саги => используем callCheckingAuth
// процесс по refresh and verify token, иначе logout

function* getUserInfoWorker() {
    const response: ApiResponse<UserInfoPayload> | undefined =
        yield callCheckingAuth(API.getUserInfo);
    if (response && response?.ok && response?.data) {
        yield put(setUserInfo(response.data));
    } else {
        console.error("Get User Info error", response?.problem);
    }
} 


// step 4 Lesson 48 update access token (refresh and verify)
// нового воркера прописываем в для logoutUser
function* logoutWorker() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    yield put(setAccessToken(""));
}



// step 2 
// создаем watcher, который будет за всем следить и перераспределять
// сразу же помещаем в rootSaga, чтобы все полноценно работало
// также для того, чтобы было проще взаимодействовать с данными существует понятие "эффект"
// это помощники для взаимодействия с асинхронным кодом 
// первый эффект - all
// ----
// step 5 ловим экшен, который ранее создали
// появляется второй помощник (эффект) takeLatest
// принимает в себя первым параметром экшен sighUpUser
// вторым - наш worker (=> необходимо создать)
// takeLatest: забери наш экшен sighUpUser и впихни его в воркер sighUpUserWorker и  пусть там он дальше работает
// ---
// привязываем воркер activateUserWorker к вотчеру
// привязываем воркер signInUserWorker к вотчеру
export default function* authSagaWatcher() {
    yield all([
        takeLatest(sighUpUser, sighUpUserWorker),
        takeLatest(signInUser, signInUserWorker),
        takeLatest(activateUser, activateUserWorker),
        takeLatest(getUserInfo, getUserInfoWorker),
        takeLatest(logoutUser, logoutWorker),
    ]);
}