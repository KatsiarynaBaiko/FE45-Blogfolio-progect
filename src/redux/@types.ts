// step 4 Lesson 45 (saga)
// нам нужен запрос post/auth/users/ у которого будет тело
// у нас будут поля username", "email, "password"
// => action в Payload будет нести объект с этими данными из  поста
// => создаем в папке redux файл @types.ts и SignUpUserData и SignUpUserPayload
// и привязываем наш SignUpUserPayload к экшену

import { PostsList } from "src/@types";

// дженерик (для периспользования кода)
export type PayloadWithDataAndCallback <Data> = {
    data: Data;
    callback: () => void;
}

export type SignUpUserData = {
    username: string;
    email: string;
    password: string;
};

export type SignUpUserPayload = PayloadWithDataAndCallback<SignUpUserData>

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



export type SignInData = {
    email: string,
    password: string,
}

export type SignInUserPayload = PayloadWithDataAndCallback<SignInData>

export type SignInUserResponseData = {
    access: string,
    refresh: string,
}