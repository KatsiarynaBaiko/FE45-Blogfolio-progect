// step 7 Lesson 45 (saga)
// создание запроса в api, в который мы будет стучаться
// для этого устанавливали библиотеку apisauce (=> идем в папочку  api)
// ---
// step 2 HW 8 (saga)
// так как мы получаем данные с сервера
// то нам нужен get-запрос
// => необходима функция, которая возвращает get-запрос


import { create } from "apisauce";
import { SignInData, SignUpUserData } from "src/redux/@types";

// создаем API Инстанс — это виртуальная машина, которая запускается и работает в облаке
// внутрь  напихиваем конфиги этого API
// baseURL - это единственный обязательный
// "https://studapi.teachmeskills.by" - это голова, к которой будут уже присоединяться хвостики
const API = create({
    baseURL: "https://studapi.teachmeskills.by",
});


// создаем signUpUser - это функция, которая будет возвращать 
// запрос post и хвостик /auth/users/
// ---
// у запроса не хватает тела (то есть нашей data) 
// data требуется тип и он будет таким же, как создали уже ранее
const signUpUser = (data: SignUpUserData) => {
    return API.post("/auth/users/", data);
};

// создаем getPosts - получение постов из сервера
// => запрос get
// лимит 12 - количество постов на страничке по макету
const getPosts = () => {
    return API.get("/blog/posts/?limit=12");
};




const createToken = (data: SignInData) => {
    return API.post('/auth/jwt/create/', data);
}


// не забываем экспортировать
export default {
    signUpUser,
    getPosts,
    createToken,
};