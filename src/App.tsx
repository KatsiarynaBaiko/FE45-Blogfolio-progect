import React from 'react';

//step 3 Button
import Button, { ButtonTypes } from './components/Button';
//step 3 Title
import Title from './components/Title';
//step 3 Tabs
import Tabs, { TabsTypes }from './components/Tabs';
//step 3 Tabslist
import Tabslist from './components/Tabslist';
//step 3 Card
import Card from './components/Card';
import { CardTypes } from './components/Card';



// function App() {
//   return (
//     <div></div>
//   );
// }

const App = () => {
  return <div>

    {/* //step 4 Button */}
    {/* <Button type={ButtonTypes.Primary} title={'Primary'} onClick={() => { }} disabled={true} /> или */}
    <Button disabled type={ButtonTypes.Primary} title={'Primary'} onClick={() => { }} />
    <Button type={ButtonTypes.Secondary} title={'Secondary'} onClick={() => { }} />
    <Button type={ButtonTypes.Error} title={'Error'} onClick={() => { }} />

    {/* //step 4 Title */}
    <Title title='Blogfolio (тут будет title)' />

    {/* //step 4 Tabslist */}
    <Tabslist />

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




  </div>
}

export default App;
