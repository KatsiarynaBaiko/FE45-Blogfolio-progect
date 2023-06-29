// Lesson 45 (saga)
// реализовать активацию пользователя (используя redux-saga)
// без активации (активация на след занятии)

import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { SignInUserPayload, SignInUserResponseData, SignUpResponseData, SignUpUserPayload } from "../@types";
import { setAccessToken, sighUpUser, signInUser } from "../reducers/authSlice";
import { ApiResponse } from "apisauce";
import { callbackify } from "util";
import API from "src/utils/api";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "src/utils/constants";
import { access } from "fs";

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


function* signInUserWorker(action: PayloadAction<SignInUserPayload>) {
    const { data, callback } = action.payload;

    const response:ApiResponse<SignInUserResponseData> = yield call(API.createToken, data);

    if (response.ok && response.data) {
        yield put(setAccessToken(response.data.access))
        localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access)
        localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh)
        callback(); // в этом случае делаем callback
    } else {
        console.error("Sigh In User error", response.problem);
    }
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

export default function* authSagaWatcher() {
    yield all([takeLatest(sighUpUser, sighUpUserWorker), takeLatest(signInUser, signInUserWorker)]);
}