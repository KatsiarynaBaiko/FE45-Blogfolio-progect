import { configureStore } from "@reduxjs/toolkit";
// step 4 from themeSlice.ts
import themeReducer from './reducers/themeSlice'
import postReducer from './reducers/postSlice'


// step 1 
// создаем store и конфигурируем его
// так как стор - это хранилище данных, то у него будет 
// reducer (место где это хранится) (этаж) и у которого будут 
// собственные initialState (наши кабинетики)
// ---
// первоначальная задача написать reducer для темы
// themeReducer - подчеркивает красным, так как необходимо создать Reducer
// создается папка, в которой все будут наши Reducers
// библиотека toolkit позволяет работать со Slice
// => у нас появляется themeSlice.ts
// принимаем и кладем в стор themeReducer и стор перестает ругаться красным
// ---
// необходимо подключить => идем в index.tsx (главный)
// и в root.render оборачиваем наш App в Provider
// в Provider store передаем ={store}, чтобы не ругался
// на этом закончилось подключение стора к приложению
// условно сощдается ядро редакса, которое мы начинаем строить

const store = configureStore({
    reducer: {
        themeReducer,
        postReducer, 
    },
});

// step 1: themeSlice 
export type RootState = ReturnType<typeof store.getState>;
// step 2
export default store