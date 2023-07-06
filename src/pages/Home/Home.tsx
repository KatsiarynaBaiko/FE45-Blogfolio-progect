import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useThemeContext } from "src/context/Theme";
import { AuthSelectors } from "src/redux/reducers/authSlice";
import { getPostsList, PostSelectors } from "src/redux/reducers/postSlice";
// на 43 уроке конфликт - замена CardsListik на PostsList в @types"
// import { CardsListik, TabsTypes, Theme } from "../../@types";
import { PostsList, TabsTypes, Theme } from "../../@types";
import CardsList from "../../components/CardsList";
import TabsList from "../../components/Tabslist/Tabslist";
import Title from "../../components/Title";
import styles from './Home.module.scss'
import SelectedImageModal from "./SelectedImageModal";
import SelectedPostModal from "./SelectedPostModal";


// HW8 step 5
// после получения данные из сервера с помощью get-запроса
// нам не нужен MOCK_ARRAY => можем удалять
// const MOCK_ARRAY = [
//     {
//         id: 0,
//         image:
//             "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
//         text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
//         date: "12-10-2023",
//         lesson_num: 12,
//         title:
//             "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
//         description: "Описание поста",
//         author: 10,
//     },
//     {
//         id: 1,
//         image:
//             "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
//         text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
//         date: "12-10-2023",
//         lesson_num: 12,
//         title:
//             "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
//         description: "Описание поста",
//         author: 10,
//     },
//     {
//         id: 2,
//         image:
//             "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
//         text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
//         date: "12-10-2023",
//         lesson_num: 12,
//         title:
//             "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
//         description: "Описание поста",
//         author: 10,
//     },
//     {
//         id: 3,
//         image:
//             "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
//         text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
//         date: "12-10-2023",
//         lesson_num: 12,
//         title:
//             "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
//         description: "Описание поста",
//         author: 10,
//     },
//     {
//         id: 4,
//         image:
//             "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
//         text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
//         date: "12-10-2023",
//         lesson_num: 12,
//         title:
//             "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
//         description: "Описание поста",
//         author: 10,
//     },
//     {
//         id: 5,
//         image:
//             "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
//         text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
//         date: "12-10-2023",
//         lesson_num: 12,
//         title:
//             "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
//         description: "Описание поста",
//         author: 10,
//     },
//     {
//         id: 6,
//         image:
//             "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
//         text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
//         date: "12-10-2023",
//         lesson_num: 12,
//         title:
//             "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
//         description: "Описание поста",
//         author: 10,
//     },
//     {
//         id: 7,
//         image:
//             "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
//         text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
//         date: "12-10-2023",
//         lesson_num: 12,
//         title:
//             "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
//         description: "Описание поста",
//         author: 10,
//     },
//     {
//         id: 8,
//         image:
//             "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
//         text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
//         date: "12-10-2023",
//         lesson_num: 12,
//         title:
//             "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
//         description: "Описание поста",
//         author: 10,
//     },
//     {
//         id: 9,
//         image:
//             "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
//         text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
//         date: "12-10-2023",
//         lesson_num: 12,
//         title:
//             "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
//         description: "Описание поста",
//         author: 10,
//     },
//     {
//         id: 10,
//         image:
//             "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
//         text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
//         date: "12-10-2023",
//         lesson_num: 12,
//         title:
//             "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
//         description: "Описание поста",
//         author: 10,
//     },
//     {
//         id: 11,
//         image:
//             "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
//         text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
//         date: "12-10-2023",
//         lesson_num: 12,
//         title:
//             "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
//         description: "Описание поста",
//         author: 10,
//     },
// ];


// step 1
// страничку Home собираем из наших компонентов
// также сюда прписываем MOCK_ARRAY для каточек
// ---
// наш tabsList это массив из Tabs (перенесли его из TabsList)
// для tabs используем useState для отслеживания состояния
// ---
// у нас tabsList не меняется, кроме disabled
// => можем использовать useMemo, который запоминает данные
// и дальше появляется const isLoggedIn 
// от которой зависит видно или нет Myfavorites, например
// если массив зависимостей пкстой [] то все равно можно тыкнуть на My Favourites
// чтобы поменялось, нужно isLoggedIn добавить в массив зависимостей => [isLoggedIn]
// ---
// дяя const isLoggedIn также используем useState для отслеживания состояния
// и одновременно прописываем условие, что если кнопка Popular нажимается, то доступно Афмщкшеуы
// if (tab === TabsTypes.Popular) {
// setLoggedIn(true); }
// ---
// MOCK_ARRAY мы прокидывали напрямую: <CardsList cardsList={MOCK_ARRAY} />
// но можно через useEffect
// для этого создается  const [cardsList, setCardsList] = useState<CardsListik>([]);
// --- на 43 уроке конфликт - замена CardsListik на PostsList в @types"
// --- => const [cardsList, setCardsList] = useState<PostsList>([]);
// {cardsList} передается вместо {MOCK_ARRAY}
// и используется useEffect, который и запихивает MOCK_ARRAY
// чтобы отрабатывал после первого рендара прописываем [] (отработает как DidMount)


const Home = () => {

    const [activeTab, setActiveTab] = useState(TabsTypes.All);
    // const isLoggedIn = true; // проверка isLoggedIn
    // const [isLoggedIn, setLoggedIn] = useState(false);
    // const [cardsList, setCardsList] = useState<PostsList>([]); 
    // убираем state так как перенесли данные в редакс (HW8 step 5) и вместо него useSelector c getPostsList
    const cardsList = useSelector(PostSelectors.getPostsList)

    // step 10 Lesson 47 (auth+ access token)
    // переменную isLoggedIn привязываем в селектору
    // в onTabClick убираем условие if
    const isLoggedIn = useSelector(AuthSelectors.getLoggedIn)

    const tabsList = useMemo(
        () => [
            { key: TabsTypes.All, title: 'All Posts', disabled: false },
            { key: TabsTypes.Popular, title: 'Popular', disabled: false },
            { key: TabsTypes.Myfavorites, title: 'My Favourites', disabled: !isLoggedIn },
        ],
        [isLoggedIn]
    );

    // HW8 step 5
    // в useEffect вызываем dispatch (наши ручки) которые кидают наши посты
    // делаем в useEffect - так как префетчинг данных
    const dispatch = useDispatch ()

    useEffect(() => {
        // setCardsList(MOCK_ARRAY);
        dispatch(getPostsList())
    }, [])

    const onTabClick = (tab: TabsTypes) => () => {
        setActiveTab(tab);
        // if (tab === TabsTypes.Popular) {
        //     // setLoggedIn(true);
        // }
    };

    // HW4 Добавление темной темы 
    // так как меняется по проекту, то открываем контекст
    // далее themeValue передаем прописываем в return. чтобы темная тема возвращалась
    // темная тема - с помощью classNames => {[styles.darkHomeContainer]: themeValue === Theme.Dark}
    const { themeValue } = useThemeContext();

    return (
        <div className={classNames(styles.container, { [styles.darkContainer]: themeValue === Theme.Dark })}>

            <Title title={"Blogfolio"} className={styles.pageTitle} />

            <TabsList
                tabsList={tabsList}
                activeTab={activeTab}
                onTabClick={onTabClick}
            />

            {/* <CardsList cardsList={MOCK_ARRAY} /> */}
            <CardsList cardsList={cardsList} />

            <SelectedPostModal />

            <SelectedImageModal />

        </div>
    )
}

// step 2
export default Home


// HW 9 userInfo
// Реализовать получение информации о пользователе (profile). 
// Полученную информацию сохранить в редакс и отрендерить в header
// Для этого нужен запрос get "/auth/users/me/"
// Когда запрос передается в плашку, то запрос логично получать в Router. 
// Так как не логично делать запрос на какой-то одной страницу, п
// отому что как только мы уходим со страницы, то данные теряются. 
// А Router есть на любой странице => используем внутри Router useEffect
// Так как мы передаем токен в getUserInfo, то нам его нужно достать из LocalStorage


// HW9 (userInfo)
// step 1 необходим получение инфы о юзере getUserInfo через запрос в api get "/auth/users/me/"
// step 2 создаем action для получения данных в authSlice  => getUserInfo. 
// Так как нам ничего не нужно передавать => тип экшена undefined
// step 3 создаем  action setUserInfo, который будет ложить данные в редакс, 
// также в initialState создаем useInfo. Это объект - первоначальное состояние - null
// и типизируем action PayloadAction<UserInfoPayload>
// step 4 создаем селектор getUserInfo для UserInfo
// step 5 приступаем к работе в саге authSaga.  Создаем еще одного воркера
// нам нужен токен, то достаем его из LocalStorage.getItem и проверяем через if
// Типизируем ApiResponse
// обрабатываем с помощью if и помещаем в редакс с  помощью put
// не забываем его привязать к нашему вотчеру authSagaWatcher
// step 6 необходимо обработать нашу сагу. Отрабатывает мы в Router, так как оне есть везде. 
// При обработке используем useEffect и внутри кладем наши данные ручками
// Также проверяем залогинен ли пользователь или нет (должен быть привязан isLoggedIn к селектору)
// step 7 нам необходимо отрендерить наши данные в плашечку
// Плашечка у нас располагается в компоненте Header
// Используем селектор и getUserInfo
// Прописываем условный рендеринг для кнопочки: если залогинен и есть инфа - показать пташечку - иначе просто кнопочку с человечком
// выдает ошибку с токеном: пишет, что такой токен есть или он неверный => фиксила через constants и меняла значение access токене
