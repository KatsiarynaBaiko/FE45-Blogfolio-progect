// step 4 Lesson 45 (saga)
// нам нужен запрос post/auth/users/ у которого будет тело
// у нас будут поля username", "email, "password"
// => action в Payload будет нести объект с этими данными из  поста
// => создаем в папке redux файл @types.ts и SignUpUserData и SignUpUserPayload
// и привязываем наш SignUpUserPayload к экшену

export type SignUpUserData = {
    username: string;
    email: string;
    password: string;
};

export type SignUpUserPayload = {
    data: SignUpUserData;
    callback: () => void; // функция, которая будет выполняться, если успешно проведено создание. Функция для навигирования
};

// step 6 Lesson 45 (saga)
// поплохело, так как не непонятно что вернутся => используем ApiResponse
// и внутрь ApiResponse кладем то, что вернется (типизируем то, что придет из сервера нам)
export type SignUpResponseData = {
    username: string;
    email: string;
    id: number;
};

