import React from "react";
import { FC } from "react";
import styles from './Card.module.scss';
import classNames from "classnames";
import { type } from "os";

import { AddBookmarkIcon, DislikeIcon, DotsMenuIcon } from "../../assets/icons";
import { LikeIcon } from "../../assets/icons";
import { BookmarkIcon } from "../../assets/icons";
import { skipPartiallyEmittedExpressions } from "typescript";
import { useThemeContext } from "src/context/Theme";
import { LikeStatus, SaveStatus, Theme } from "src/@types";
import { useSelector } from "react-redux";
import { PostSelectors } from "src/redux/reducers/postSlice";
import { useNavigate } from "react-router-dom";


// step 4
// создаем enum, так как у нас три свойства Card
// перечисление каких-либо фиксированных свойств
// не забываем export emun
// ---
// step 6 Lesson 49 search (по нажатию на кнопку)
// добавляем еще одно значение для enum: Search - размер карчек в результате поиска

export enum CardTypes {
    Large = 'large',
    Medium = 'medium',
    Small = 'small',
    Search = "search",
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
// ---
// HW6
// передаем пропсой onImageClick 
// дополнительно в картинке используем onClick={onImageClick}
// ---
// Lesson 44 Redux
// передаем пропсой onStatusClick и оборачиваем нашу иконочку лайк и лизлайк в div
// чтобы можно было на нее тыкнуть
// но у нас не отображаются циферки количества лайков/дизлайков
// тут должна проверяться есть ли эта карточка в массиве
// => в карточке с помощью селекторов достаем эти данные (массив лайков/дизлайков)
// ---
// HW6
// передаем пропсой onSavedClick и оборачиваем нашу иконочку bookmark в div
// с помощью селекторов достаем массив сохраненных постов
// => icons добавляем еще один вариант сохраненной иконочки
// и прописываем условие
//
// step 12 Lesson 46  (single post = selected post)
// на наши посты необходимо как-то переходить 
// при клике на них => реализуем это в карточке Card


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
    onStatusClick: (status: LikeStatus) => void;
    // onSavedClick: (status: SaveStatus) => void; // setSavedStatus - version 1
    onSavedClick?: () => void; // setSavedStatus - version 2
}

// step 6
// Далее необходимо все стилизовать
// а также импортируем import styles from 'Button.module.scss'
// также присваиваем стили с помощью className 

// step 1
// компонент Card
// возврашает Card у которых есть три состояния: Large, Medium, Small

const Card: FC<CardProps> = ({ type, id, date, title, text, image, lesson_num, author, onMoreClick, onImageClick, onStatusClick, onSavedClick }) => {
    // return <div>Тут будет Card</div>
    const cardStyle = styles[type]

    // HW4 Добавление темной темы 
    // так как меняется по проекту, то открываем контекств
    // далее themeValue передаем прописываем в return. чтобы темная тема возвращалась
    // темная тема - с помощью classNames => {[styles.dark...]: themeValue === Theme.Dark}
    const { themeValue } = useThemeContext();

    // => в карточке с помощью селекторов достаем массив лайков/дизлайков
    // чтобы отображать количество лайков/дизлайков
    // также необходимо найти индекс по лайкам и по дизлайкам 
    // то есть если есть карточка, то показать единичку 
    // только id тут уже не card.id а шв, который приходит в пропсах
    // и прописываем условие в Like & Dislike
    const likedPosts = useSelector(PostSelectors.getLikedPosts);
    const dislikedPosts = useSelector(PostSelectors.getDislikedPosts);
    const likedIndex = likedPosts.findIndex((item) => item.id === id);
    const dislikedIndex = dislikedPosts.findIndex((item) => item.id === id);

    // с помощью селекторов достаем массив сохраненных постов
    // также достаем индексб чтобы менять картиночку при сохранении поста
    // => icons добавляем еще один вариант сохраненной иконочки
    const savedPosts = useSelector(PostSelectors.getSavedPosts);
    const savedIndex = savedPosts.findIndex((item) => item.id === id);

    // переход на посты по клику 
    // используется useNavigate и связывается с id
    const navigate = useNavigate();

    const onTitleClick = () => {
        navigate(`/post/${id}`);
    };

    return (
        <div className={classNames(cardStyle)}>
            <div className={styles.cardContent}>
                <div className={classNames(styles.cardTextContent, { [styles.darkCardTextContent]: themeValue === Theme.Dark })}>
                    <span className={styles.date}>{date}</span>
                    <div className={styles.cardTitle} onClick={onTitleClick}>{title}</div>
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
                    <div onClick={() => onStatusClick(LikeStatus.Like)} className={classNames(styles.likeStatusNumber, { [styles.darkLikeStatusNumber]: themeValue === Theme.Dark })}>
                        {/* <LikeIcon /> */}
                        <LikeIcon /> {likedIndex > -1 && 1}
                    </div>
                    <div onClick={() => onStatusClick(LikeStatus.Dislike)} className={classNames(styles.likeStatusNumber, { [styles.darkLikeStatusNumber]: themeValue === Theme.Dark })}>
                        {/* <DislikeIcon /> */}
                        <DislikeIcon /> {dislikedIndex > -1 && 1}
                    </div>
                </div>
                <div className={styles.cardReactionNavigation}>
                    {/* setSavedStatus - version 1 */}
                    {/* <div onClick={() => onSavedClick(SaveStatus.Saved)}> */}
                    {/* setSavedStatus - version 2 */}
                    <div onClick={onSavedClick}>
                        {/* <BookmarkIcon /> */}
                        {savedIndex > -1 ? <AddBookmarkIcon /> : <BookmarkIcon />}
                    </div>
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