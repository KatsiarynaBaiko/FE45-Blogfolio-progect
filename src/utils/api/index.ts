// step 7 Lesson 45 (saga)
// создание запроса в api, в который мы будет стучаться
// для этого устанавливали библиотеку apisauce (=> идем в папочку  api)
// ---
// step 2 HW 8 (saga)
// так как мы получаем данные с сервера
// то нам нужен get-запрос
// => необходима функция, которая возвращает get-запрос


import { create } from "apisauce";
import { ActivateUserData, SignInData, SignUpUserData } from "src/redux/@types";

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


// step 1 Lesson 47 (auth+ access token)
// в api указываем путь для создания токена. 
// Запрос: post  /auth/jwt/create/
// у запроса будет тело - наша data =>
// типизируем нашу data в @types
const createToken = (data: SignInData) => {
  return API.post('/auth/jwt/create/', data);
}

// step 4  Lesson 46 (activate user)
// в swagger ищем запрос post /auth/users/activation/ => в api и прописываем запрос
// типизируем нашу data в @types
const activateUser = (data: ActivateUserData) => {
  return API.post("/auth/users/activation/", data);
};


// step 5 Lesson 46 (single post = selected post)
// в api запрос get(`/blog/posts/${id}/)
// id - будет string так как это - это поисковая строка
// а из строки мы достаем строку :)
const getSinglePost = (id: string) => {
  return API.get(`/blog/posts/${id}/`);
};

// step 1 HW9 (userInfo)
// создаем getUserInfo - получение инфы о юзере
// используем запрос get  "/auth/users/me/"
const getUserInfo = (token: string) => {
  return API.get(
    "/auth/users/me/",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


// step 2 Lesson 48 update access token (refresh and verify)
// прописываем логику проверки валидности наших токенов
// делаем запрос в api для verify
// делаем запрос в api для refresh
const verifyToken = (token: string) => {
  return API.post("/auth/jwt/verify/", { token });
};

const refreshToken = (refresh: string) => {
  return API.post("/auth/jwt/refresh/", { refresh });
};


// HW10 MyPosts
// step 1 создаем запрос в api на получение моих постов
// запрос будет аналогичен getUserInfo (так как нам нужен токен)
// MyPosts видны только зареганым юзерам
const getMyPosts = (token: string) => {
  return API.get(
    "/blog/posts/my_posts/",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};




// не забываем экспортировать
export default {
  signUpUser,
  getPosts,
  createToken,
  activateUser,
  getSinglePost,
  getUserInfo,
  verifyToken,
  refreshToken, 
  getMyPosts,
};