import React from "react";
import { FC } from "react"
import Title from "../../components/Title";
import styles from './SelectedPost.module.scss';
import { DislikeIcon } from "../../assets/icons";
import { LikeIcon } from "../../assets/icons";
import { BookmarkIcon } from "../../assets/icons";
import FormPagesContainer from "../../components/FormPagesContainer";
import classNames from "classnames";
import { useThemeContext } from "src/context/Theme";
import { Theme } from "src/@types";



// step 4
// прописываем props 
// импортируем import {FC} from "react";
// а также присваиваем props в const : FC <SelectedPost>
// сразу же передаем их в FC <SelectedPost>

type SelectedPostProps = {
    title: string;
    image: string;
    text?: string;
}


// step 1
// создаем компонент 
const SelectedPost: FC<SelectedPostProps> = ({ title, image, text }) => {

    // HW4 Добавление темной темы 
    // так как меняется по проекту, то открываем контекст
    // далее themeValue передаем прописываем в return. чтобы темная тема возвращалась
    // темная тема - с помощью classNames => {[styles.darkAdditionalInfo]: themeValue === Theme.Dark}
    const { themeValue } = useThemeContext();

    return (
        <div className={classNames(styles.container, {[styles.darkContainer]:themeValue === Theme.Dark})}>
            <div className={styles.breadcrumbs}>Home <span className={styles.postNumber}>| Post 14278</span></div>
            {/* <div className={styles.title}>{title}</div> */}
            <Title className={styles.title} title={title} />
            <div className={styles.selectedPostImage}>
                <img src={image} alt="#" />
            </div>
            {/* <div className={styles.selectedPostText}>{text}</div> */}

            <div className={styles.selectedPostText}>
                {'Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight.'}
                <br />
                <br />
                {'During the final days of Alice Neel’s blockbuster solo show at the Metropolitan Museum of Art this summer, the line into the exhibition spanned the length of the museum’s European paintings corridor, and the wait was over half an hour. Titled “People Come First,” the show featured more than 100 gritty cityscapes, domestic interiors, and stripped-down portraits of Neel’s neighbors, friends, and fellow artists in the largest-ever showing of her work in her hometown of New York City.'}
                <br />
                <br />
                {'The stories tracked Hambling’s trailblazing career while focusing on her current and upcoming projects. The artist’s installation Relic (2021), produced alongside sound recordist Chris Watson, was recently on view at Snape Maltings in London. Meanwhile, this October, portraits by Hambling will be presented at the Italian gallery Thomas Brambilla. The artist’s “Wave Series” is also currently being exhibited in the group show “Summer Exhibition” at Marlborough London, which runs through September 10th.'}
                <br />
                <br />
                {'The excitement surrounding this exhibition delighted longtime fans of the expressive painter while inspiring a legion of new devotees—a trend matched by Neel’s strengthening position in the art market, especially in the past year. In May, Neel’s 1966 canvas Dr. Finger’s Waiting Room roused a flurry of bids from the United States, Asia, and Europe at Christie’s New York, where it ultimately sold for just over $3 million, breaking both its high estimate and the artist’s auction record. Just hours earlier at Sotheby’s New York, Neel’s double portrait Henry and Sally Hope (1977), depicting an art historian and his wife, sold for just under $1.6 million, notching her third-highest auction result.'}
                <br />
                <br />
                {'The demand for Maggi Hambling’s evocative portraits and exuberant depictions of seascapes and landscapes surged this past week, when the number of collectors inquiring on her work increased more than tenfold from the week before. The British artist, esteemed for her whirling, gestural paintings and bold public sculptures, has seen a consistent wave of interest in her work that has accelerated in the past few years. This recent uptick in interest  is consistent with Hambling’s career trajectory, which has been punctuated by a flurry of public commissions, institutional recognition, and secondary-market demand.'}
            </div>

            <div className={styles.SelectedPostReaction}>
                <div className={styles.SelectedPostReactionLikeDislike}>
                    <div className={styles.SelectedPostLike}><LikeIcon /></div>
                    <div className={styles.SelectedPostDislike}><DislikeIcon /></div>
                </div>
                <div className={styles.SelectedPostReactionToFavorites}>
                    <BookmarkIcon /> Add to Favotites
                </div>
            </div>
        </div>
    )
}

// step 2
export default SelectedPost

// step 3
// index.ts делаем export, чтобы потом его вызывать в App.tsx