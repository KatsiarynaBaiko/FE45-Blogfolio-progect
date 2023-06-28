// step 3 Lesson 45 (saga)
// так как нам необходимо зарегать человека, то нам необходим какой-то экшен
// => в reducers появляется новый slice - authSlice.ts
// создается по принципу ранее созданных slice
// не забываем его передать в store в reducer
// --- 
// у нас появляется пустой экшен:  sighUpUser: (state, action) => {},
// ---
// после создания SignUpUserPayload (step 4 Lesson 45) типизируем наш экнш
//


import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignUpUserPayload } from "../@types";


type InitialState = {};

const initialState: InitialState = {};


const authSlice = createSlice({
    name: "authReducer",
    initialState,
    reducers: {
        sighUpUser: (state, action: PayloadAction<SignUpUserPayload>) => { }, // у нас появляется пустой экшен
    },
    // вот тут живут функции, которые ловят экшены по типу(т.е. по названию ф-и)
});


export const { sighUpUser } = authSlice.actions;
// а вот тут живут сами экшены, которые рождаются библиотекой исходя
// из названия ф-ии, которая их ловит

export const AuthSelectors = {}; 
// вот отсюда мы достаем данные, которые заранее видоизменили снежками (экшенами)

export default authSlice.reducer; 
// это мы группу функций экспортируем единым объектом