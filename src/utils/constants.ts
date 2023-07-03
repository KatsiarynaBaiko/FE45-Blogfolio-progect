// step 5 Lesson 47 (auth+ access token)
// чтобы токен мы могли каждый раз использовать
// и не пересоздавать, и чтобы он не терялся
// используется localStorage
// создаем файл constants с постоянными и прописываем ключи
// это ключ для доступа в localStorage
// ---
// step 7 W9 (userInfo)
// выдает ошибку с токеном: 
// пишет, что такой токен есть или он неверный 
// => фиксила через constants и меняла значение access токене
// export const ACCESS_TOKEN_KEY = 'AccessTokenFE45'

export const ACCESS_TOKEN_KEY = 'AccessTokenFE48'

export const REFRESH_TOKEN_KEY = 'RefreshTokenFE45'