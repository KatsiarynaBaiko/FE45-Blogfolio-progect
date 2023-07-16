import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button, { ButtonTypes } from "src/components/Button";
import Pagination from "src/components/Pagination";
import { useThemeContext } from "src/context/Theme";
import { AuthSelectors } from "src/redux/reducers/authSlice";
import { getMyPosts, getPostsList, PostSelectors } from "src/redux/reducers/postSlice";
import { PER_PAGE } from "src/utils/constants";
// на 43 уроке конфликт - замена CardsListik на PostsList в @types"
// import { CardsListik, TabsTypes, Theme } from "../../@types";
import { Order, PostsList, TabsTypes, Theme } from "../../@types";
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
    // ---
    // step 7 HW10 можно закоментировать, так как есть перключатель по табинам
    // step 7 Lesson 50 пагинация (нумерическая) - разкомментируем наш сardsList
    const cardsList = useSelector(PostSelectors.getPostsList)


    // step 10 Lesson 47 (auth+ access token)
    // переменную isLoggedIn привязываем в селектору
    // в onTabClick убираем условие if
    const isLoggedIn = useSelector(AuthSelectors.getLoggedIn)

    const tabsList = useMemo(
        () => [
            { key: TabsTypes.All, title: 'All Posts', disabled: false },
            { key: TabsTypes.Popular, title: 'Popular', disabled: false },
            { key: TabsTypes.MyPosts, title: 'My Posts', disabled: !isLoggedIn },
        ],
        [isLoggedIn]
    );

    // step 4 HW11 (сортировка Title и Date по кнопке)
    // работаем с кнопочками  Title и Datee . 
    // Так как меняется их состояние  - используем useState для ordering
    const [ordering, setOrdering] = useState("");

    // HW8 step 5
    // в useEffect вызываем dispatch (наши ручки) которые кидают наши посты
    // делаем в useEffect - так как префетчинг данных
    const dispatch = useDispatch()

    useEffect(() => {
        const offset = (currentPage - 1) * PER_PAGE;
        // setCardsList(MOCK_ARRAY);
        // dispatch(getPostsList())
        dispatch(getPostsList({ offset, isOverwrite: true, ordering }));
    }, [ordering])

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


    // step 6 HW10 
    // обрабатываем нашу сагу по получению Моих постов при нажатии на табины
    // При обработке используем useEffect и внутри кладем наши данные ручками
    // В массиве зависимостей в useEffect будет [activeTab] - 
    // так как все зависит от активной табины

    useEffect(() => {
        const offset = (currentPage - 1) * PER_PAGE;
        if (activeTab === TabsTypes.MyPosts) {
            dispatch(getMyPosts())
        } else {
            // dispatch(getPostsList())
            dispatch(getPostsList({ offset, isOverwrite: true, ordering }));
        }
    }, [activeTab, ordering])


    // step 7 HW10
    // в return мы передаем  <CardsList cardsList={cardsList} />
    // где на данном этапе  const cardsList = useSelector(PostSelectors.getPostsList)
    // то есть это только наши все посты
    // то есть на любой табине мы видим все посты
    // ---
    // если заменить сonst cardsList = useSelector(PostSelectors.getMyPosts)
    // то мы будем видеть только myPost (на данном этапе пустой массив) 
    // опять же на любой табине мы видим все myPost
    // const cardsList = useSelector(PostSelectors.getMyPosts)
    // ---
    // у нас не хатает переключателя ??? который будет привязан к activeTab
    // типо SwithCase
    // и нам его нужно передавать в return  <CardsList cardsList={переключатель} />

    const allPosts = useSelector(PostSelectors.getPostsList)
    const myPosts = useSelector(PostSelectors.getMyPosts)

    const tabsSwitcherForCurrentPostsList = () => {
        switch (activeTab) {
            case TabsTypes.MyPosts:
                return myPosts;
            default: return allPosts;
        }
    }

    // step 7 Lesson 50 пагинация (нумерическая)
    // и пропишем другой useEffect с включением пагинации
    // isOverwrite - перезапись - нужна ли она, когда на первой странице - да - => true

    // useEffect(() => {
    //     dispatch(getPostsList({ offset: 0, isOverwrite: true }));
    // }, [activeTab])

    // step 8 Lesson 50 пагинация (нумерическая)
    // getTotalPostsCount вызываем через useSelector
    const totalCount = useSelector(PostSelectors.getTotalPostsCount);

    // step 9 Lesson 50 пагинация (нумерическая)
    // создаем мемоизированную переменную pagesCount 
    // и считаем ее по формуле 
    //сколько итого у нас страниц
    const pagesCount = useMemo(
        () => Math.ceil(totalCount / PER_PAGE),
        [totalCount]
    );

    // step 9 Lesson 50 пагинация (нумерическая)
    // нам необходимо завести переменную с текущей страницей
    //текущая страница, на которой мы находимся
    const [currentPage, setCurrentPage] = useState(1);

    // step 7.1 Lesson 50 пагинация (нумерическая)
    // можем посчиттать сколько постов нужно пропустить
    // считаем это внутри useEffect
    // в зависимости мы передаем currentPage (все зависит только от этой переменной)
    // во всех useEffect где есть getPostsList также прописываем offset и добавляем параментры (offset, isOverwrite)
    useEffect(() => {
        // сколько надо пропустить постов (сколько мы уже посмотрели)
        const offset = (currentPage - 1) * PER_PAGE;
        dispatch(getPostsList({ offset, isOverwrite: true, ordering,}));
    }, [currentPage, ordering]);

    // step 12 Lesson 50 пагинация (нумерическая)
    // используем созданные компонент Pagination в Home
    // дополнительно пишем функцию для переключения постов
    const onPageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected + 1);
    };

    // step 13 Lesson 50 пагинация (нумерическая) 
    // вставляем Loading. Достаем его с помощью useSelector
    // добавляем пропсу isLoading в CardListProps
    const isListLoading = useSelector(PostSelectors.getPostsListLoading)


    // step 6 HW11 (сортировка Title и Date по кнопке)
    // создаем функцию, которая будет отвечать за нашу сортировку по кнопке
    // в нее запихиваем ранее созданный enum Order
    const onSortButtonClick = (order: Order) => () => {
        if (order === ordering) {
            setOrdering("");
            setCurrentPage(1);
        } else {
            setOrdering(order);
        }
    };

    // step 7 HW11 (сортировка Title и Date по кнопке)
    // прописываем верстку для кнопочек в return.  Используем компонент Button

    return (
        <div className={classNames(styles.container, { [styles.darkContainer]: themeValue === Theme.Dark })}>

            <Title title={"Blogfolio"} className={styles.pageTitle} />

            <TabsList
                tabsList={tabsList}
                activeTab={activeTab}
                onTabClick={onTabClick}
            />


            <div className={styles.sortButtonsContainer}>
                <Button title={"Date Sort"}
                    onClick={onSortButtonClick(Order.Date)}
                    type={ButtonTypes.Primary}
                    className={classNames(styles.sortButton, {
                        [styles.activeButton]: ordering === Order.Date,
                    })}
                />
                <Button title={"Title Sort"}
                    onClick={onSortButtonClick(Order.Title)}
                    type={ButtonTypes.Primary}
                    className={classNames(styles.sortButton, {
                        [styles.activeButton]: ordering === Order.Title,
                    })}
                />
            </div>


            {/* <CardsList cardsList={MOCK_ARRAY} /> */}
            {/* <CardsList cardsList={cardsList} /> */}
            <CardsList cardsList={tabsSwitcherForCurrentPostsList()} isLoading={isListLoading} />

            <Pagination
                currentPage={currentPage}
                pagesCount={pagesCount}
                onPageChange={onPageChange}
            />

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




// HW10 Сделать запрос на мои посты и их отрендерить - получить их с бекенда
// Есть кнопочка My posts ( бывшая My favorites) (pages -> Home). 
// Она активна только тогда когда заполнен пользователь (ранее прописывали для нее !isLoggedIn)
// И при нажатии на данную кнопочку делается запрос  в api на получение моих постов (get /blog/posts/my_posts/ )
// Если мы ТЫКАЕМ на табину My Posts - делается запрос на мои посты, если ТЫКАЕМ на  All Posts - то тогда запрос на все посты => 
// Все зависит от activeTab
// (переменной), которая и запрашивает посты
// => if activeTab = myPost - делаем запрос на мои посты 
// else - запрос на все посты
// Условие в useEffect
// => Отслеживаем мы в залогинен ли пользователь и активную табину
// В массиве зависимостей в useEffect будет [activeTab]
// Не забыть про токен, который прописывается по аналогии с getUserInfo
// Токен пишется в начале
// В саге если прилетело response.status 404 - положить пустой массив
// Если response.data - то положить data
// В противном случае показать проблему в consol.log

// HW10 MyPosts
// step 1 создаем запрос в api на получение моих постов
// step 2 создаем action для получения данных в postSlice  => getMyPosts. 
// Так как нам ничего не нужно передавать => тип экшена undefined
// step 3 создаем  action setMyPosts, который будет ложить данные в редакс, 
// также в initialState создаем myPosts. Это массив - первоначальное состояние - []
// и типизируем action PayloadAction<PostsList>
// step 4 создаем селектор getUserInfo для myPosts 
// step 5 приступаем к работе в саге postSaga.  Создаем еще одного воркера
//  типизируем ApiResponse<PostsResponseData>
// так как нам нужен живой токен используем сагу-помощника callCheckingAut
//  обрабатываем с помощью if и помещаем в редакс с  помощью put
// не забываем его привязать к нашему вотчеру postsSagaWatcher
// step 6 необходимо обработать нашу сагу. Отрабатывает мы в Home 
// При обработке используем useEffect и внутри кладем наши данные ручками
// В массиве зависимостей в useEffect будет [activeTab] - 
// так как все зависит от активной табины
// step 7 используем селектор для myPosts
// на всех табинах мы видим одно и тоже
// => у нас не хатает переключателя ??? который будет привязан к activeTab
// типо SwithCase
// и нам его нужно передавать в return  <CardsList cardsList={переключатель} />
