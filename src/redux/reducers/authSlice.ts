// step 3 Lesson 45 (saga)
// так как нам необходимо зарегать человека, то нам необходим какой-то экшен
// => в reducers появляется новый slice - authSlice.ts
// создается по принципу ранее созданных slice
// не забываем его передать в store в reducer
// --- 
// у нас появляется пустой экшен:  sighUpUser: (state, action) => {},
// ---
// после создания SignUpUserPayload (step 4 Lesson 45) типизируем наш экнш
// ---
// step 5 Lesson 46 (activate user)
// Создаем  action для activate user , который будет отправлять данные
// action будет пустой
// ---
// step 2 Lesson 47 (auth+ access token)
// создаем action для авторизации в authSlice
// называем по действию => мы логиним юзера => signInUser
// и типизируем action PayloadAction<SignInUserPayload>
// вот это действие запрашивает данные
// ---
// step 3 Lesson 47 (auth+ access token)
// необходим еще один экшен, который будет ложить данные в редакс
// => создаем setAccessToken
// в initialState создаем accessToken
// accessToken - это string, исходное значение ''
// ---
// step 7 Lesson 47 (auth+ access token)
// чтобы мы могли использовать уже созданный токен 
// и чтобы он не терялся нигде в initialState мы достаем его из localStorage
// accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || ''
// ---
// step 2 HW9 (userInfo)
// создаем action для получения данных в authSlice  => getUserInfo. 
// Так как нам ничего не нужно передавать => тип экшена undefined
// action будет пустой
// ---
// step 3 HW9 (userInfo)
// создаем  action setUserInfo, который будет ложить данные в редакс, 
// также в initialState создаем useInfo. Это объект - первоначальное состояние - null
// initialState - тип UserInfoPayload или null
// и типизируем action PayloadAction<UserInfoPayload>
// ---
// step 4 Lesson 48 update access token (refresh and verify)
// необходим функционал на разлогинивание пользователя (logoutUser)
// тоже пишем сагу и action
// action logoutUser в authSlice
// нового воркера прописываем в authSaga
// ---
// step 3 Lesson 53 (reset password)
// создаем новый экшен resetPassword для сброса пароля 
// и payload к нему ResetPasswordPayload 
// ---
// step 13 Lesson 53 (reset password confirmation)
// создаем новый экшен resetPasswordConfirm для восстановления пароля 
// и payload к нему ResetPasswordConfirmationPayload

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { access } from "fs";
import { ACCESS_TOKEN_KEY } from "src/utils/constants";
import { ActivateUserPayload, ResetPasswordConfirmationPayload, ResetPasswordPayload, SignInData, SignInUserPayload, SignUpUserPayload, UserInfoPayload } from "../@types";
import { RootState } from "../store";


type InitialState = {
    accessToken: string;
    userInfo: UserInfoPayload | null;
};

const initialState: InitialState = {
    accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || '',
    userInfo: null,
};


const authSlice = createSlice({
    name: "authReducer",
    initialState,
    reducers: {
        sighUpUser: (state, action: PayloadAction<SignUpUserPayload>) => { }, // у нас появляется пустой экшен

        signInUser: (state, action: PayloadAction<SignInUserPayload>) => { },

        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload
        },

        activateUser: (_, __: PayloadAction<ActivateUserPayload>) => {},

        getUserInfo: (_, __: PayloadAction<undefined>) => { },

        setUserInfo: (state, action: PayloadAction<UserInfoPayload | null>) => { 
            state.userInfo = action.payload
        },

        logoutUser: (_, __: PayloadAction<undefined>) => {},

        resetPassword: (_, __: PayloadAction<ResetPasswordPayload>) => {},

        resetPasswordConfirm: (_, __: PayloadAction<ResetPasswordConfirmationPayload>) => {},


    },
    // вот тут живут функции, которые ловят экшены по типу(т.е. по названию ф-и)
});


export const { sighUpUser, signInUser, setAccessToken, activateUser, getUserInfo, setUserInfo, logoutUser, resetPassword, resetPasswordConfirm, } = authSlice.actions;
// а вот тут живут сами экшены, которые рождаются библиотекой исходя
// из названия ф-ии, которая их ловит

// step 8 Lesson 47 (auth+ access token)
// нам нужно доставать токен из редакса (с помощью селектора) 
// так как мы проверяем залогинен ли пользователь или нет 
// (чтобы показывал/скрывать опредлененные странички, addPosts)
// => прописываем Selector
// !! - истинное булиновское значение
// ---
// // step 4 создаем селектор getUserInfo для UserInfo
export const AuthSelectors = {
    getLoggedIn: (state: RootState) => !!state.authReducer.accessToken,
    getUserInfo: (state: RootState) => state.authReducer.userInfo,
};
// вот отсюда мы достаем данные, которые заранее видоизменили снежками (экшенами)

export default authSlice.reducer;
// это мы группу функций экспортируем единым объектом