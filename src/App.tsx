import React, { useState } from 'react';

//step 3 Button
import Button, { ButtonTypes } from './components/Button';
//step 3 Title
import Title from './components/Title';
// upd Lesson 40 (закоментировали)
// step 3 Tabs
// import Tabs, { TabsTypes } from './components/Tabs';
//step 3 TabsList
// import TabsList from './components/Tabslist';
//step 3 Card
import Card from './components/Card';
import { CardTypes } from './components/Card';
//step 3 Input
import Input from './components/Input';
import Usermane from './components/Username';
import SingUp from './pages/SingUp';
import RegistrationConfirmation from './pages/RegistrationConfirmation';
import Success from './pages/Success';
import SignIn from './pages/SignIn';
import SelectedPost from './pages/SelectedPost';
import CardsList from './components/CardsList';
import Home from './pages/Home';
import { ThemeProvider } from "./context/Theme"
import { Theme } from './@types';
import ThemeSwitcher from './components/ThemeSwitcher';
import Tabslist from './components/Tabslist';
import { TabsTypes } from './@types';



// в App (над App) создаем массив из мокнутых данных, на основе которых будет базироваться наш Card и CardsList
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




// function App() {
//   return (
//     <div></div>
//   );
// }

const App = () => {

  // создаем для работы input
  const [inputValue, setInputValue] = useState('');
  const onChange = (value: string) => {
    setInputValue(value)
  }

  // step 10 lesson 41
  // создаем для работы ThemeProvider
  const [themeValue, setThemeValue] = useState<Theme>(Theme.Light);
  // также создаем функцию, которая будет менять нашу тему
  // и дальше ее же нужно передать и записать в пропсы
  const onChangeTheme = (value: Theme) => () => {
    setThemeValue(value);
  };

  // HW4
  // переменная для TabsList
  // приходит массив объектов [{}], который относится к типу type Tabs
  // и даем им значения (смотрим в @types. key-относится к enum => key: TabsTypes.All)
  // передаем данные значения в компонент (в return)
  // чтобы было их три - размножаем
  const tabsList = [
    { key: TabsTypes.All, title: 'All', disabled: false },
    { key: TabsTypes.Myfavorites, title: 'My favorites', disabled: false },
    { key: TabsTypes.Popular, title: 'Popular', disabled: true }
  ]
  // activeTab - это переключение Tabs => это использование хуков => создаем useState 
  // передаем дефолтное значение TabsTypes.All
  // передаем activeTab в компонент (то есть пропсу) (в return)
  const [activeTab, setActiveTab] = useState(TabsTypes.All)
  // onTabClick - стрелочная функция, принимает-tab: TabsTypes
  // возвращает-collback (то есть еще одну функцию), в которой происходил выбор Tab и она становилась активной
  // setActiveTab(tab) (tab-новая tab, которая становится активной)
  // передаем onTabClick в компонент (то есть пропсу) (в return)
  const onTabClick = (tab: TabsTypes) => {
    return () => setActiveTab(tab)
  }



  return (
    // <SingUp />
    // <Home />


    <div>

      {/* //step 4 Button */}
      {/* <Button type={ButtonTypes.Primary} title={'Primary'} onClick={() => { }} disabled={true} /> или */}
      <Button disabled type={ButtonTypes.Primary} title={'Primary'} onClick={() => { }} />
      <Button type={ButtonTypes.Secondary} title={'Secondary'} onClick={() => { }} />
      <Button type={ButtonTypes.Error} title={'Error'} onClick={() => { }} />

      {/* //step 4 Title */}
      <Title title='Blogfolio' />


      {/* //step 4 TabsList */}
      {/* // upd Lesson 40 (закоментировали) */}
      {/* <TabsList /> */}

      {/* //step 4 Card */}

      <Card
        type={CardTypes.Large}
        date='April 20, 2021'
        title='Astronauts prep for new solar arrays on nearly seven-hour spacewalk'
        text='Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.'
        image='https://gamerwall.pro/uploads/posts/2022-02/1645708691_1-gamerwall-pro-p-astronavt-v-kosmose-krasivie-oboi-1.jpg'
        id={0}
        lesson_num={0}
        author={0}
      />

      <Card
        type={CardTypes.Medium}
        date='April 20, 2021'
        title='Astronauts prep for new solar arrays on nearly seven-hour spacewalk'
        text='Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.'
        image='https://gamerwall.pro/uploads/posts/2022-02/1645708691_1-gamerwall-pro-p-astronavt-v-kosmose-krasivie-oboi-1.jpg'
        id={0}
        lesson_num={0}
        author={0}
      />

      <Card
        type={CardTypes.Small}
        date='April 20, 2021'
        title='Astronauts prep for new solar arrays on nearly seven-hour spacewalk'
        text='Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.'
        image='https://gamerwall.pro/uploads/posts/2022-02/1645708691_1-gamerwall-pro-p-astronavt-v-kosmose-krasivie-oboi-1.jpg'
        id={0}
        lesson_num={0}
        author={0}
      />


      {/* //step 4 */}
      <Input
        isTextarea
        title={'Test Input'}
        placeholder={'Hello World'}
        onChange={onChange}
        value={inputValue}
      // errorText={'Error'}
      />

      {/* //step 4 */}
      <Usermane username={'Katsiaryna'} />


      {/* //step 4 */}
      {/* // step 9 Lesson 41: оборачиваем компонент в ThemeProvider  */}
      {/* // он хочет value => нам нужно его взть и положить => создаем const */}
      {/* //  const [themeValue, setThemeValue] = useState<Theme>(Theme.Light); */}
      {/* // также переходим в SingUp */}
      {/* // <ThemeSwitcher />  - это кнопочки переключения темы - солнце и луна */}

      <ThemeProvider themeValue={themeValue} onChangeTheme={onChangeTheme}>
        <SingUp />
        <ThemeSwitcher />
      </ThemeProvider>


      {/* //step 4 */}
      <ThemeProvider themeValue={themeValue} onChangeTheme={onChangeTheme}>
        <RegistrationConfirmation />
      </ThemeProvider>


      {/* //step 4 */}
      <ThemeProvider themeValue={themeValue} onChangeTheme={onChangeTheme}>
        <Success />
      </ThemeProvider>


      {/* //step 4 */}
      <ThemeProvider themeValue={themeValue} onChangeTheme={onChangeTheme}>
        <SignIn />
      </ThemeProvider>


      {/* //step 4 */}
      <ThemeProvider themeValue={themeValue} onChangeTheme={onChangeTheme} >
        <SelectedPost
          title='Astronauts prep for new solar arrays on nearly seven-hour spacewalk'
          image='https://gamerwall.pro/uploads/posts/2022-02/1645708691_1-gamerwall-pro-p-astronavt-v-kosmose-krasivie-oboi-1.jpg'
        // text= {'Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight. ' + 'During the final days of Alice Neel’s blockbuster solo show at the Metropolitan Museum of Art this summer, the line into the exhibition spanned the length of the museum’s European paintings corridor, and the wait was over half an hour. Titled “People Come First,” the show featured more than 100 gritty cityscapes, domestic interiors, and stripped-down portraits of Neel’s neighbors, friends, and fellow artists in the largest-ever showing of her work in her hometown of New York City. ' + 'The stories tracked Hambling’s trailblazing career while focusing on her current and upcoming projects. The artist’s installation Relic (2021), produced alongside sound recordist Chris Watson, was recently on view at Snape Maltings in London. Meanwhile, this October, portraits by Hambling will be presented at the Italian gallery Thomas Brambilla. The artist’s “Wave Series” is also currently being exhibited in the group show “Summer Exhibition” at Marlborough London, which runs through September 10th. ' + 'The excitement surrounding this exhibition delighted longtime fans of the expressive painter while inspiring a legion of new devotees—a trend matched by Neel’s strengthening position in the art market, especially in the past year. In May, Neel’s 1966 canvas Dr. Finger’s Waiting Room roused a flurry of bids from the United States, Asia, and Europe at Christie’s New York, where it ultimately sold for just over $3 million, breaking both its high estimate and the artist’s auction record. Just hours earlier at Sotheby’s New York, Neel’s double portrait Henry and Sally Hope (1977), depicting an art historian and his wife, sold for just under $1.6 million, notching her third-highest auction result. ' + 'The demand for Maggi Hambling’s evocative portraits and exuberant depictions of seascapes and landscapes surged this past week, when the number of collectors inquiring on her work increased more than tenfold from the week before. The British artist, esteemed for her whirling, gestural paintings and bold public sculptures, has seen a consistent wave of interest in her work that has accelerated in the past few years. This recent uptick in interest  is consistent with Hambling’s career trajectory, which has been punctuated by a flurry of public commissions, institutional recognition, and secondary-market demand.'}
        />
      </ThemeProvider>


      <CardsList cardsList={MOCK_ARRAY} />

      <ThemeProvider themeValue={themeValue} onChangeTheme={onChangeTheme}>
        <Home />
      </ThemeProvider>


      <ThemeProvider themeValue={themeValue} onChangeTheme={onChangeTheme}>
        {/* не хватает activeTab, onTabClick => */}
        {/* activeTab - это переключение Tabs => это использование хуков => создаем useState */}
        {/* onTabClick - стрелочная функция, принимает-TabsTypes, возвращает-collback  */}
        <Tabslist
          tabsList={tabsList}
          activeTab={activeTab}
          onTabClick={onTabClick}
        />
      </ThemeProvider>


    </div>
  )
}

export default App;
