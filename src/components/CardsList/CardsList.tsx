import React from "react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { LikeStatus, Post, PostsList } from "src/@types";
import { setLikeStatus, setSelectedImage, setSelectedPost, setSelectedPostModalOpened } from "src/redux/reducers/postSlice";
// import { CardsListik } from "../../@types";
import Card from "../Card/Card";
import { CardTypes } from "../Card/Card";
import styles from './CardsList.module.scss';


// step 4
// CardsListik - это из @types 
// на 43 уроке конфликт - замена на PostsList
// то есть это массив наших постов (карточек)
type CardsListProps = {
    // cardsList: CardsListik;
    cardsList: PostsList;
}

// step 5 стилизация


// step 1
// компонент CardsList
// массив карточек к нам будет приходить => достаем его из пропсов (cardsList)
// ---
// дополнительно переносим типы на карточку (@types) 
// @types - создается, чтобы аккумулировать в одном месте типы, которые используются много где
// => в @types также прописываем CardProps
// ---
// в App (над App) создаем массив из мокнутых данных, на основе которых будет базироваться наш Card и CardsList
// ---
// создаем и описываем типы пропсов (step 4)
// ---
// прописываем верстку в return
// размер поста определяется пропсой => должно быть условие
// размещение карточек на страницу по индексу определяем
// --- 
// для большой карточки указываем тип: type={CardTypes.Large} и cardsList [0], где 0 - это индекс
// --- 
// если не прогрузились посты: нужна проверка 
// => условие return cardsList.length ? (..показать верстку..) : null
// чтобы не выдало ошибку указываем null, то есть компонент не будет отрисован
// --- 
// средние карточки
// используем метод map чтобы выбрать необходимые карточки 
// c одновременным выполнением условия (idx >= 1 && idx <= 4)
// не забываем прописать key (всегда), если мапим список key={el.id}
// ---
// Lesson 43 Redux
// мы прописали фунционал закрытия модального окна в SelectedPostModal
// но еще необходим функционал с его открытие по нажатию на три точечки в карточке
// для этого идем в CardList и также прописываем ей dispatch 
// в функциях задаем обнатные значения (true и post)
// в return добавляем onMoreClick={onMoreClick(cardsList[0])} или onMoreClick={onMoreClick(el)}
// ---
// HW6
// прописываем функционал открытия модального окно по нажатию на картинку
// по аналогии с onMoreClick
// Lesson 44 Redux
// необходимо прописать функционал кнопочек like & dislike
// то, что уладем в скобочки всегда совпалает с тем, что ледит в <>



const CardsList: FC<CardsListProps> = ({ cardsList }) => {

    const dispatch = useDispatch();

    const onMoreClick = (post: Post) => () => {
        dispatch(setSelectedPostModalOpened(true));
        dispatch(setSelectedPost(post));
        // было Card, на 43 уроке конфликт - замена на Post в @types
        // dispatch - ручки
        // setSelectedPost - экшен, куда данные должны улететь
        // null - payload, т е сами данные, которые летят в ф-ии, которые их меняют
    };

    const onImageClick = (cardsList: string) => () => {
        dispatch(setSelectedPostModalOpened(true));
        dispatch(setSelectedImage(cardsList));
        // dispatch - ручки
        // setSelectedPost - экшен, куда данные должны улететь
        // null - payload, т е сами данные, которые летят в ф-ии, которые их меняют
    };

    const onStatusClick = (card: Post) => (status: LikeStatus) => {
        dispatch(setLikeStatus({ card, status }))
    }


    return cardsList.length ? (
        <div className={styles.cardsListContainer}>
            <div className={styles.cardsListWrapLeft}>
                {/* <Card type={CardTypes.Large} {...cardsList[0]} /> */}
                <Card type={CardTypes.Large} {...cardsList[0]} onMoreClick={onMoreClick(cardsList[0])} onImageClick={onImageClick(cardsList[0].image)} onStatusClick = {onStatusClick(cardsList[0])} />
                <div className={styles.mediumContainer}>
                    {cardsList.map((el, idx) => {
                        if (idx >= 1 && idx <= 4) {
                            // return <Card key={el.id} type={CardTypes.Medium} {...el} />
                            return <Card key={el.id} type={CardTypes.Medium} {...el} onMoreClick={onMoreClick(el)} onImageClick={onImageClick(el.image)} onStatusClick = {onStatusClick(el)}/>
                        }
                    })}
                </div>
            </div >
            <div className={styles.smallContainer}>
                {cardsList.map((el, idx) => {
                    if (idx >= 5 && idx <= 10) {
                        // return <Card key={el.id} type={CardTypes.Small} {...el} />
                        return <Card key={el.id} type={CardTypes.Small} {...el} onMoreClick={onMoreClick(el)} onImageClick={onImageClick(el.image)} onStatusClick = {onStatusClick(el)}/>
                    }
                })}
            </div>
        </div>
    ) : null;
}



// step 2
// далее делаем export default
export default CardsList