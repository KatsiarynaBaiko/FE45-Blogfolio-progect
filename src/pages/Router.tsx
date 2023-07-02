import React from "react"
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Header from "src/components/Header";
import Home from "src/pages/Home";
import { AuthSelectors } from "src/redux/reducers/authSlice";
import RegistrationConfirmation from "./RegistrationConfirmation";
import SelectedPost from "./SelectedPost";
import SignIn from "./SignIn";
import SingUp from "./SingUp";
import Success from "./Success";




// step 3
// создаем enum, так как наши пути закардкожены (неизменны) и статичны 
// ---
// step 2 Lesson 46 (activate user)
// меняем путь для RegistrationConfirmation на "/activate/:uid/:token"
// это позволяем достать uid и token из url
// ---
// step 1 Lesson 46 (single post = selected post)
// В RoutesList указываем путь для SelectedPost = '/post/:id'
// и добавляем его в Router
export enum RoutesList {
    Home = "/",
    SingUp = "/sing-up",
    SignIn = "/sign-in",
    // RegistrationConfirmation = "/sing-up/confirm",
    RegistrationConfirmation = "/activate/:uid/:token",
    Success = "/sing-up/confirm/success", 
    // SelectedPost = "selected-post",
    SelectedPost = '/post/:id',
    Default = "*",
}

// step 1
// возвращает нам <BrowserRouter> </BrowserRouter> 
// у котогоро внутри -  <Routes></Routes>
// ---
// BrowserRouter определяет набор маршрутов и, когда к приложению, приходит запрос, 
// то Router выполняет сопоставление запроса с маршрутами.
// Routes - объект, содержащий в себе набор маршрутов.
// Route определяет зависимостью между URL и компонентом.
// ---
// смотрим, какие есть странички => у нас появляется путь Route 
// path="*": Путь в виде звездочки - "*" в path указывает, что этот маршрут будет сопоставляться со всеми адресами URL, которые не соответствуют предыдущим маршрутам. 
// * - этот путь не существует
// домащняя страница чаще всего "/", но можно "/main or /home"
// в element={...} указывается созданная/необходимая страница
// ---
// чтобы проверить работу записываем в App
// ---
// пути определяем сами и они закардкожены (неизменны) и статичны =>
// пути - это enum => создаем его и используем
// он необходим, чтобы мы могли его передать и потом тукнуть и перейти (переадресация на др странички)
// ---
// добавление оберточного роутера, который оборачивает внутренние пути 
// а именно то, что внутри будет меняться
// <Route path={RoutesList.Home} element={<Header /> }/>
// ---
// Default = "*" - если пути не существует, то 
// перенаправляется на определенную нами страницу обычно это Home
// для этого также используется элемент element={<Navigate to={...}/>}
// это называется обработка несуществующих путей
// ---
// step 11 Lesson 47 (auth+ access token)
// переменную isLoggedIn привязываем в селектору
// в Router добавляем условный рендеринг 
// и указываем какие странички не должны быть видны 
// пользователю после авторизации
// если не залогинент, то показать

const Router = () => {

    const isLoggedIn = useSelector(AuthSelectors.getLoggedIn)

    return <BrowserRouter>
        <Routes>
            {/* <Route path="/" element={<Home /> }/> */}
            {/* <Route path="/sing-up" element={<SingUp /> }/> */}
            {/* <Route path="/sing-up/confirm" element={<RegistrationConfirmation /> }/> */}
            {/* после создания enum */}
            <Route path={RoutesList.Home} element={<Header />}>
                <Route path={RoutesList.Home} element={<Home />} />
                <Route path={RoutesList.SingUp} element={!isLoggedIn ? <SingUp /> : <Navigate to={RoutesList.Home}/>} />
                <Route path={RoutesList.SignIn} element={!isLoggedIn ? <SignIn /> : <Navigate to={RoutesList.Home}/>} />
                <Route path={RoutesList.RegistrationConfirmation} element={!isLoggedIn ? <RegistrationConfirmation /> : <Navigate to={RoutesList.Home}/>} />
                <Route path={RoutesList.Success} element={!isLoggedIn ? <Success /> : <Navigate to={RoutesList.Home}/>} />
                <Route path={RoutesList.SelectedPost} element={<SelectedPost />} />
                <Route path={RoutesList.Default} element={<Navigate to={RoutesList.Home}/>} />
            </Route>
        </Routes>
    </BrowserRouter>
}


//step 2
export default Router