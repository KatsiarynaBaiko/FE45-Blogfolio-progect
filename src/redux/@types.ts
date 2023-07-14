// step 4 Lesson 45 (saga)
// нам нужен запрос post/auth/users/ у которого будет тело
// у нас будут поля username", "email, "password"
// => action в Payload будет нести объект с этими данными из  поста
// => создаем в папке redux файл @types.ts и SignUpUserData и SignUpUserPayload
// и привязываем наш SignUpUserPayload к экшену

import { PostsList } from "src/@types";

// дженерик (для периспользования кода)
// lesson step 4 Lesson 46 (activate user)
export type PayloadWithDataAndCallback<Data> = {
    data: Data;
    callback: () => void;
}

export type SignUpUserData = {
    username: string;
    email: string;
    password: string;
};

export type SignUpUserPayload = PayloadWithDataAndCallback<SignUpUserData>
// до дженерика
// export type SignUpUserPayload = {
//     data: SignUpUserData;
//     callback: () => void;
// }

// step 6 Lesson 45 (saga)
// поплохело, так как не непонятно что вернутся => используем ApiResponse
// и внутрь ApiResponse кладем то, что вернется (типизируем то, что придет из сервера нам)
export type SignUpResponseData = {
    username: string;
    email: string;
    id: number;
};

// step 4 HW8 (saga)
// используем ApiResponse и внутрь кладем то, что вернется (типизируем то, что придет из сервера нам)
// results - это массив наших постов, то есть PostsList

export type PostsResponseData = {
    count: number,
    next: string,
    previous: null,
    results: PostsList,
}

// step 1 Lesson 47 (auth+ access token)
// в api указываем путь для создания токена. Запрос: post  /auth/jwt/create/
// у запроса будет тело - наша data =>  типизируем нашу data
export type SignInData = {
    email: string,
    password: string,
}

// step 2 Lesson 47 (auth+ access token)
// типизируем action
export type SignInUserPayload = PayloadWithDataAndCallback<SignInData>


// step 4 Lesson 47 (auth+ access token)
// используем ApiResponse и внутрь кладем то, что вернется 
// (типизируем то, что придет из сервера нам)
export type SignInUserResponseData = {
    access: string,
    refresh: string,
}


// step 4  Lesson 46 (activate user)
// в swagger ищем запрос post /auth/users/activation/ => в api и прописываем запрос
// типизируем нашу data
export type ActivateUserData = {
    uid: string;
    token: string;
}

export type ActivateUserPayload = PayloadWithDataAndCallback<ActivateUserData>;

// step 3 HW9 (userInfo)
// initialState - тип UserInfoPayload или null
// и типизируем action PayloadAction<UserInfoPayload>

export type UserInfoPayload = {
    username: string;
    email: string;
    id: number;
}

// step 2 Lesson 48 update access token (refresh and verify)
// прописываем логику проверки валидности наших токенов
// в cлучае позитивного ответа refresh нам возвращается string (cм. запрос)
// => идем в типы и создаем RefreshResponseData
export type RefreshResponseData = {
    access: string;
  };