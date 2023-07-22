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
    previous: string,
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

// step 4 Lesson 50 пагинация (нумерическая)
// добавляем новый тип для payload - GetPostsPayload, 
// который будет получать  offset и isOverwrite
// isOverwrite (перезаписать) - нужен для перезаписи страниц в redux
// ---
// step 2 HW11 (сортировка Title и Date по кнопке)
// обновляем в @types GetPostsPayload и добавляем ordering 
export type GetPostsPayload = {
    offset: number;
    isOverwrite: boolean;
    ordering?: string;
};

// step 5 Lesson 50 пагинация (нумерическая)
// добавляем новый тип payload SetPostsListPayload для setPostsList
// total - количество постов
export type SetPostsListPayload = {
    total: number;
    postsList: PostsList;
    isOverwrite: boolean;
};


// step 3 Lesson 50 пагинация (бесконечная прокрутка)
// в postSlice обновляем экшены getSearchedPosts и setSearchedPosts 
// с учетом добавления бесконечной прокрутки. 
// Также прописываем типы payload // Также прописываем типы payload 
// GetSearchedPostsPayload и SetSearchedPostsPayload в @types

export type GetSearchedPostsPayload = {
    offset: number;
    search: string;
};

// для SetSearchedPostsPayload используем Omit
// Omit новый тип, в котором можно указать свойства, 
// которые будут исключены из исходного типа
export type SetSearchedPostsPayload = Omit<SetPostsListPayload, "isOverwrite">;


// step 5 Lesson 51 AddNewPost
// в postSlise создаем экшен addNewPost для добавления поста
// типизируем наш payload в @types => AddPostDataPayload
// any - потому что мы будем прокидывать formData
export type AddPostDataPayload = PayloadWithDataAndCallback<any>


// step 7 Lesson 52 edit and delete Post
// работаем с кнопочкой delete. 
// Пишем для нее функцию onDeletePost на удаление поста 
// в postSlice создаем экшен deletePost и payload для него: DeletePostPayload
// number - так как у нас id
export type DeletePostPayload = PayloadWithDataAndCallback<number>;

// step 8 Lesson 52 edit and delete Post
// работаем с кнопочкой edit
// создаем экшен  editPost  в postSlice для редактирования поста
// и payload для него: EditPostPayload

export type EditPostData = {
    postId: number;
    newData: any;
};

export type EditPostPayload = PayloadWithDataAndCallback<EditPostData>;