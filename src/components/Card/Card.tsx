import React from "react";
import { FC } from "react";
import styles from './Card.module.scss';
import classNames from "classnames";
import { type } from "os";

import { DislikeIcon, DotsMenuIcon } from "../../assets/icons";
import { LikeIcon } from "../../assets/icons";
import { BookmarkIcon } from "../../assets/icons";
import { skipPartiallyEmittedExpressions } from "typescript";
import { useThemeContext } from "src/context/Theme";
import { Theme } from "src/@types";


// step 4
// создаем enum, так как у нас три свойства Card
// перечисление каких-либо фиксированных свойств
// не забываем export emun

export enum CardTypes {
    Large = 'large',
    Medium = 'medium',
    Small = 'small'
}

// step 5
// прописываем props для card
// прописываем не самостоятельно
// а по модели данных, которая пришла (файл с дз)
// импортируем import {FC} from "react";
// а также присваиваем props в const : FC <CardProps>
// сразу же достаем их их props и получаем их в FC <CardProps>
// ---
// Lesson 43 Redux
// передаем пропсой onMoreClick, оборачивае кнопочку с тремя точечками
// прописываем условие, чтобы в модальном окне нельзя было вызывать другое модальное окно

type CardProps = {
    type: CardTypes;
    id: number,
    image: string,
    text: string,
    date: string,
    lesson_num?: number,
    title: string,
    author?: number,
    onMoreClick?: () => void,
    onImageClick?: () => void,
    
}

// step 6
// Далее необходимо все стилизовать
// а также импортируем import styles from 'Button.module.scss'
// также присваиваем стили с помощью className 

// step 1
// компонент Card
// возврашает Card у которых есть три состояния: Large, Medium, Small

const Card: FC<CardProps> = ({ type, id, date, title, text, image, lesson_num, author, onMoreClick, onImageClick}) => {
    // return <div>Тут будет Card</div>
    const cardStyle = styles[type]

    // HW4 Добавление темной темы 
    // так как меняется по проекту, то открываем контекств
    // далее themeValue передаем прописываем в return. чтобы темная тема возвращалась
    // темная тема - с помощью classNames => {[styles.dark...]: themeValue === Theme.Dark}
    const { themeValue } = useThemeContext();

    return (
        <div className={classNames(cardStyle)}>
            <div className={styles.cardContent}>
                <div className={classNames(styles.cardTextContent, { [styles.darkCardTextContent]: themeValue === Theme.Dark })}>
                    <span className={styles.date}>{date}</span>
                    <div className={styles.cardTitle}>{title}</div>
                    {/* <div className={styles.cardText}>{text}</div> */}
                    {/* через display: none не делаем через условный рендеринг (прописываем условие) */}
                    {type === CardTypes.Large && (
                        <div className={styles.cardText}>{text}</div>
                    )}
                </div>
                <div className={styles.cardImage} onClick={onImageClick}>
                    <img src={image} alt="#" />
                </div>
            </div>
            <div className={classNames(styles.cardReaction, { [styles.darkCardReaction]: themeValue === Theme.Dark })}>
                <div className={styles.cardReactionLikeDislike}>
                    <LikeIcon />
                    <DislikeIcon />
                </div>
                <div className={styles.cardReactionNavigation}>
                    <BookmarkIcon />
                    {/* <DotsMenuIcon /> */}
                    {onMoreClick && (
                        <div onClick={onMoreClick}>
                            <DotsMenuIcon />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// step 2
// далее делаем export default

export default Card;

// step 3
// index.ts делаем export, чтобы потом его вызывать в App.tsx