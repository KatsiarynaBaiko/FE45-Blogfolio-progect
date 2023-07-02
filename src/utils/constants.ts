// step 5 Lesson 47 (auth+ access token)
// чтобы токен мы могли каждый раз использовать
// и не пересоздавать, и чтобы он не терялся
// используется localStorage
// создаем файл constants с постоянными и прописываем ключи
// это ключ для доступа в localStorage

export const ACCESS_TOKEN_KEY = 'AccessTokenFE45'

export const REFRESH_TOKEN_KEY = 'RefreshTokenFE45'