import React, { useEffect, useMemo, useState } from "react";
import { CardsListik, TabsTypes } from "../../@types";
import CardsList from "../../components/CardsList";
import TabsList from "../../components/Tabslist/Tabslist";
import Title from "../../components/Title";
import styles from './Home.module.scss'



const MOCK_ARRAY = [
    {
        id: 0,
        image:
            "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
        text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
        date: "12-10-2023",
        lesson_num: 12,
        title:
            "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
        description: "Описание поста",
        author: 10,
    },
    {
        id: 1,
        image:
            "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
        text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
        date: "12-10-2023",
        lesson_num: 12,
        title:
            "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
        description: "Описание поста",
        author: 10,
    },
    {
        id: 2,
        image:
            "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
        text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
        date: "12-10-2023",
        lesson_num: 12,
        title:
            "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
        description: "Описание поста",
        author: 10,
    },
    {
        id: 3,
        image:
            "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
        text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
        date: "12-10-2023",
        lesson_num: 12,
        title:
            "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
        description: "Описание поста",
        author: 10,
    },
    {
        id: 4,
        image:
            "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
        text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
        date: "12-10-2023",
        lesson_num: 12,
        title:
            "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
        description: "Описание поста",
        author: 10,
    },
    {
        id: 5,
        image:
            "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
        text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
        date: "12-10-2023",
        lesson_num: 12,
        title:
            "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
        description: "Описание поста",
        author: 10,
    },
    {
        id: 6,
        image:
            "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
        text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
        date: "12-10-2023",
        lesson_num: 12,
        title:
            "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
        description: "Описание поста",
        author: 10,
    },
    {
        id: 7,
        image:
            "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
        text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
        date: "12-10-2023",
        lesson_num: 12,
        title:
            "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
        description: "Описание поста",
        author: 10,
    },
    {
        id: 8,
        image:
            "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
        text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
        date: "12-10-2023",
        lesson_num: 12,
        title:
            "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
        description: "Описание поста",
        author: 10,
    },
    {
        id: 9,
        image:
            "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
        text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
        date: "12-10-2023",
        lesson_num: 12,
        title:
            "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
        description: "Описание поста",
        author: 10,
    },
    {
        id: 10,
        image:
            "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
        text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
        date: "12-10-2023",
        lesson_num: 12,
        title:
            "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
        description: "Описание поста",
        author: 10,
    },
    {
        id: 11,
        image:
            "https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg",
        text: "Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.",
        date: "12-10-2023",
        lesson_num: 12,
        title:
            "Astronauts prep for new solar arrays on nearly seven-hour spacewalk ...",
        description: "Описание поста",
        author: 10,
    },
];


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
// {cardsList} передается вместо {MOCK_ARRAY}
// и используется useEffect, который и запихивает MOCK_ARRAY
// чтобы отрабатывал после первого рендара прописываем [] (отработает как DidMount)


const Home = () => {

    const [activeTab, setActiveTab] = useState(TabsTypes.All);
    // const isLoggedIn = true; // проверка isLoggedIn
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [cardsList, setCardsList] = useState<CardsListik>([]);

    const tabsList = useMemo(
        () => [
            { key: TabsTypes.All, title: 'All Posts', disabled: false },
            { key: TabsTypes.Popular, title: 'Popular', disabled: false },
            { key: TabsTypes.Myfavorites, title: 'My Favourites', disabled: !isLoggedIn },
        ],
        [isLoggedIn]
    );

    useEffect(() => {
        setCardsList(MOCK_ARRAY);
    }, [])

    const onTabClick = (tab: TabsTypes) => () => {
        setActiveTab(tab);
        if (tab === TabsTypes.Popular) {
            setLoggedIn(true);
        }
    };

    return (
        <div>
            <Title title={"Blog"} className={styles.pageTitle} />

            <TabsList
                tabsList={tabsList}
                activeTab={activeTab}
                onTabClick={onTabClick}
            />

            {/* <CardsList cardsList={MOCK_ARRAY} /> */}
            <CardsList cardsList={cardsList} />

        </div>
    )
}

// step 2
export default Home