// step 1 Lesson 45 (saga)
// saga работает на генераторах (function* - обозначение)
// cоздаем наш главный watcher - rootSaga
// в который будем запихивать маленьких watcherов
// --- 
// чтобы их запихнуть, их первоначально необходимо привязать (подключить saga к редакс) 
// => идем в store 
// и создаем const sagaMiddleware = createSagaMiddleware()
// которую запихиваем в сам store (по аналогии с reducer) 
// --- 
// после создания вотчера authSagaWatcher (step 2) помещаем его в rootSaga
// для полноценной работы используем оператор yield 
// --- 
// также для того, чтобы было проще взаимодействовать с данными существует понятие "эффект"
// это помощники для взаимодействия с асинхронным кодом
// первый эффект - all - принимает в себя массив, в который дальше можем напихивать вотчер
// all в сагах запускает все в отслеживании в параллель 
// all отсдеживает все, что происходит внутри маленьких саг (вотчеров)

import { all } from "redux-saga/effects";
import authSagaWatcher from "./authSaga";

export default function* rootSaga() { 
    yield all([authSagaWatcher()]);
} 