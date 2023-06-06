import React from "react";
import { FC } from "react";
import { CardsListik } from "../../@types";
import Card from "../Card/Card";
import { CardTypes } from "../Card/Card";
import styles from './CardsList.module.scss';


// step 4
// CardsListik - это из @types 
// то есть это массив наших постов (карточек)
type CardsListProps = {
    cardsList: CardsListik;
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


const CardsList: FC<CardsListProps> = ({ cardsList }) => {
    return cardsList.length ? (
        <div className={styles.cardsListContainer}>
            <div className={styles.cardsListWrapLeft}>
                <Card type={CardTypes.Large} {...cardsList[0]} />
                <div className={styles.mediumContainer}>
                    {cardsList.map((el, idx) => {
                        if (idx >= 1 && idx <= 4) {
                            return <Card key={el.id} type={CardTypes.Medium} {...el} />
                        }
                    })}
                </div>
            </div >
            <div className={styles.smallContainer}>
                {cardsList.map((el, idx) => {
                    if (idx >= 5 && idx <= 10) {
                        return <Card key={el.id} type={CardTypes.Small} {...el} />
                    }
                })}
            </div>
        </div>
    ): null;
}



// step 2
// далее делаем export default
export default CardsList