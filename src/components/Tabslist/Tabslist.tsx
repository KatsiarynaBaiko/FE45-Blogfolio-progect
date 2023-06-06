import React from "react";
import { FC } from "react";
import styles from './Tabslist.module.scss';
import classNames from "classnames";

// сюда импортируем наш  Tabs
// TabsList - это wapper для Tabs
import Tabs from '../Tabs';
// upd Lesson 40 (закоментировали)
// import { TabsTypes } from '../Tabs';
import { TabsListType, TabsTypes } from "../../@types";


// upd Lesson 40
// наш tabsList это массив из Tabs 
// --- 
// берем массив и переносим его в Home
// const tabsList = [
//      { key: TabsTypes.All, title: 'All Posts', disabled: false },
//      { key: TabsTypes.Popular, title: 'Popular', disabled: false },
//      { key: TabsTypes.Myfavorites, title: 'My favorites', disabled: false },
// ];


// upd Lesson 40
// добавляем пропсы
type TabsListProps = {
    tabsList: TabsListType;
    activeTab: TabsTypes;
    onTabClick: (tab: TabsTypes) => () => void;
};


// step 1
// компонент TabsList, возвращает TabsList с Tabs

// const TabsList = () => {
//     return (
//         <div>
//             <div className={classNames(styles.tabsList)}>
//                 <Tabs active type={TabsTypes.All} title={'All'} onClick={() => { }} />
//                 <Tabs type={TabsTypes.Myfavorites} title={'My favorites'} onClick={() => { }} />
//                 <Tabs type={TabsTypes.Popular} title={'Popular'} onClick={() => { }} />
//             </div>
//             <div className={classNames(styles.tabsList)}>
//                 <Tabs active type={TabsTypes.All} title={'All'} onClick={() => { }} />
//                 <Tabs type={TabsTypes.Myfavorites} title={'My favorites'} onClick={() => { }} />
//                 <Tabs type={TabsTypes.Popular} title={'Popular'} onClick={() => { }} />
//             </div>
//             <div className={classNames(styles.tabsList)}>
//                 <Tabs active type={TabsTypes.All} title={'All'} onClick={() => { }} />
//                 <Tabs type={TabsTypes.Myfavorites} title={'My favorites'} onClick={() => { }} />
//                 <Tabs disabled type={TabsTypes.Popular} title={'Popular'} onClick={() => { }} />
//             </div>
//         </div>
//     )
// }

// upd Lesson 40

const TabsList: FC<TabsListProps> = ({ tabsList, activeTab, onTabClick }) => {
    return (
      <div className={styles.tabsListContainer}>
        {tabsList.map(({ key, title, disabled }) => (
          <Tabs
            key={key}
            title={title}
            onClick={onTabClick(key)} //() => (tab) => setTab(tab)
            active={activeTab === key}
            disabled={disabled}
          />
        ))}
      </div>
    );
  };


// step 2
// далее делаем export default
export default TabsList;

// step 3
// index.ts делаем export, чтобы потом его вызывать в App.tsx

// step 4, 5 - нет