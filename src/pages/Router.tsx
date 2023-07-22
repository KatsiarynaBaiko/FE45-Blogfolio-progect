import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Header from "src/components/Header";
import Home from "src/pages/Home";
import { AuthSelectors, getUserInfo } from "src/redux/reducers/authSlice";
import AddPost from "./AddPost";
import RegistrationConfirmation from "./RegistrationConfirmation";
import Search from "./Search";
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
// ---
// step 2 Lesson 49 search (по нажатию на кнопку)
// указываем путь для Search = "/posts/:search",
// :search - достаем это из url  
// и добавляем его в Router
// ---
// step 3 Lesson 51 AddNewPost
// указываем путь для AddPost и создаем новый путь в роутере
// ---
// step 1 Lesson 52 edit and delete Post
// в роутер указываем путь для редактирование поста


export enum RoutesList {
    Home = "/",
    SingUp = "/sing-up",
    SignIn = "/sign-in",
    // RegistrationConfirmation = "/sing-up/confirm",
    RegistrationConfirmation = "/activate/:uid/:token",
    Success = "/sing-up/confirm/success",
    // SelectedPost = "selected-post",
    SelectedPost = '/post/:id',
    Search = "/posts/:search",
    AddPost = '/blog/posts/',
    EditPost = "/posts/:id/edit",
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
// ---
// step 2 Lesson 49 search (по нажатию на кнопку)
// создаем новый путь для Search
// ---
// step 3 Lesson 51 AddNewPost
// привязываем AddPost в роутере и создаем новый путь
// ---
// step 1 Lesson 52 edit and delete MyPost
// привязываем EditPost  в роутере и создаем новый путь
// редактировать может только залогиненный пользователь и только свой пост
// => проверяем на isLoggedIn,  иначе навигируем домой

const Router = () => {

    const isLoggedIn = useSelector(AuthSelectors.getLoggedIn)

    // step 6 HW9 (userInfo)
    // обрабаьываем сагу полечение инфы о юзере 
    // Отрабатывает мы в Router, так как оне есть везде. 
    // При обработке используем useEffect и внутри кладем наши данные ручками
    // Также проверяем залогинен ли пользователь или нет (должен быть привязан isLoggedIn к селектору)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getUserInfo());
        }
    }, [isLoggedIn])


    return <BrowserRouter>
        <Routes>
            {/* <Route path="/" element={<Home /> }/> */}
            {/* <Route path="/sing-up" element={<SingUp /> }/> */}
            {/* <Route path="/sing-up/confirm" element={<RegistrationConfirmation /> }/> */}
            {/* после создания enum */}
            <Route path={RoutesList.Home} element={<Header />}>
                <Route path={RoutesList.Home} element={<Home />} />
                <Route path={RoutesList.SingUp} element={!isLoggedIn ? <SingUp /> : <Navigate to={RoutesList.Home} />} />
                {/* <Route path={RoutesList.SingUp} element={ <SingUp />} /> */}
                <Route path={RoutesList.SignIn} element={!isLoggedIn ? <SignIn /> : <Navigate to={RoutesList.Home} />} />
                <Route path={RoutesList.RegistrationConfirmation} element={!isLoggedIn ? <RegistrationConfirmation /> : <Navigate to={RoutesList.Home} />} />
                <Route path={RoutesList.Success} element={!isLoggedIn ? <Success /> : <Navigate to={RoutesList.Home} />} />
                <Route path={RoutesList.SelectedPost} element={<SelectedPost />} />
                <Route path={RoutesList.Search} element={<Search />} />
                <Route path={RoutesList.AddPost} element={isLoggedIn ? <AddPost /> : <Navigate to={RoutesList.Home} />} />
                {/* <Route path={RoutesList.AddPost} element={<AddPost />} /> */}
                <Route path={RoutesList.EditPost} element={isLoggedIn ? <AddPost /> : <Navigate to={RoutesList.Home} />}/>
                <Route path={RoutesList.Default} element={<Navigate to={RoutesList.Home} />} />
            </Route>
        </Routes>
    </BrowserRouter>
}


//step 2
export default Router