import { ReactElement } from "react";

// данные CardProps
// Но убрали type
export type Card = {
  id: number,
  image: string,
  text: string,
  date: string,
  lesson_num?: number,
  title: string,
  author?: number
}

// CardsListik - это массив наших постов (карточек)
export type CardsListik = Card[]

// lesson 40
// переносим enum, так как у нас несколько свойств Tabs
export enum TabsTypes {
  All = 'all',
  Myfavorites = 'myfavorites',
  Popular = 'popular',
}

// lesson 40
export type Tabs = {
  key: TabsTypes;
  title: string;
  disabled: boolean;
};

// lesson 40
export type TabsListType = Tabs[];

// так как у нас тема может быть 2 вариантов
// то создаем для нее enum
export enum Theme {
  Light = "light",
  Dark = "dark",
}

// lesson 41
// так как у нас повторяется  сhildren = ReactElement | ReactElement[];
// то выносим в @types и переиспользуем

export type Children = ReactElement| ReactElement[];