import React, { useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost, PostSelectors } from "src/redux/reducers/postSlice";
import { RoutesList } from "../Router";
import Loader from "src/components/Loader";
import { userInfo } from "os";
import Button, { ButtonTypes } from "src/components/Button";
import { AuthSelectors } from "src/redux/reducers/authSlice";



// step 4
// прописываем props 
// импортируем import {FC} from "react";
// а также присваиваем props в const : FC <SelectedPost>
// сразу же передаем их в FC <SelectedPost>
// ---
// step 2 Lesson 46 (single post = selected post)
// Так как будем работать с параметрами то 
// убираем пропсы в Selected post

// type SelectedPostProps = {
//     title: string;
//     image: string;
//     text?: string;
// }


// step 1
// создаем компонент 
// ---
// step 2 Lesson 46 (single post = selected post) убираем пропсы в Selected post
// const SelectedPost: FC<SelectedPostProps> = ({ title, image, text }) => {

const SelectedPost = () => {

    // HW4 Добавление темной темы 
    // так как меняется по проекту, то открываем контекст
    // далее themeValue передаем прописываем в return. чтобы темная тема возвращалась
    // темная тема - с помощью classNames => {[styles.darkAdditionalInfo]: themeValue === Theme.Dark}
    const { themeValue } = useThemeContext();

    // step 2 Lesson 46 (single post = selected post)
    // деструктурировали объект, который и создали
    // удаляем после step 10 (так как данные будем уде получать с useSelector)
    // const { title, image, text } = { title: '', image: '', text: '' }

    // step 3 Lesson 46 (single post = selected post)
    // достаем id с помощью  useParams ()
    const { id } = useParams();

    // step 4 Lesson 46 (single post = selected post)
    // Открываем  useEffect, так все дальше будет проходить в нем.
    // useEffect будет завязан на id из параметров (id нашего поста)
    // ---
    // step 10 Lesson 46 (single post = selected post)
    // запускаем в page SelectedPost
    // создаем наши ручки и кладем данные
    const dispatch = useDispatch();

    // step 11 получаем данные в page SelectedPost с помощью useSelecrot
    // условный рендеринг в return: singlePost ? (...) : null
    // null - так как поста может не быть
    const singlePost = useSelector(PostSelectors.getSinglePost);

    useEffect(() => {
        if (id) {
            dispatch(getSinglePost(id));
        }
    }, [id]);

    // step 13 необходима навигация на Home при клике 
    // => используем useNavigate и функцию onHomeClick
    const navigate = useNavigate();
    const onHomeClick = () => {
        navigate(RoutesList.Home);
    };

    // Lesson 48 work with Loader (SelectedPost)
    // использкем селектоор для Loader
    const isSinglePostLoading = useSelector(PostSelectors.getSinglePostLoading);

    // step 5 Lesson 52 edit and delete Post
    // добавляем кнопочку Edit для редактирования постов
    // в ней также прописываем условие, если singlePost.author === userInfo?.id
    // то показываем кнопочку edit
    // ---
    // и создаем функцию для редактирования постов onClickEdit
    const userInfo = useSelector(AuthSelectors.getUserInfo);

    const onClickEdit = () => {
        navigate(`/posts/${singlePost?.id}/edit`);
    };

    return singlePost && !isSinglePostLoading ? (
        <div className={classNames(styles.container, { [styles.darkContainer]: themeValue === Theme.Dark })}>
            <div className={styles.breadcrumbs}>
                <span onClick={onHomeClick}>Home</span>{" "}
                <span className={styles.postNumber}>| Post {singlePost.id}</span></div>
            {/* <div className={styles.title}>{title}</div> */}
            <Title className={styles.title} title={singlePost.title} />
            <div className={styles.selectedPostImage}>
                <img src={singlePost.image} alt="#" />
            </div>
            <div className={styles.selectedPostText}>{singlePost.text}</div>

            {/* <div className={styles.selectedPostText}>
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
            </div> */}

            <div className={styles.selectedPostReaction}>
                <div className={styles.selectedPostReactionLikeDislike}>
                    <div className={styles.selectedPostLike}><LikeIcon /></div>
                    <div className={styles.selectedPostDislike}><DislikeIcon /></div>
                </div>
                <div className={styles.selectedPostReactionToFavorites}>
                    <BookmarkIcon /> Add to Favorites
                </div>
                {singlePost.author === userInfo?.id && (
                    <Button
                        type={ButtonTypes.Secondary}
                        title={"Edit post"}
                        onClick={onClickEdit}
                    />
                )}
            </div>
        </div>
        // ) : null
    ) : (
        <Loader />
    );
};

// step 2
export default SelectedPost

// step 3
// index.ts делаем export, чтобы потом его вызывать в App.tsx


// Lesson 46  (single post = selected post)
// Реализовать страницу поста
// Будет работа с параметрами (как и в подтверждении регистрации)
// title, image, text  мы будем получать не из Props, а url

// step 1 В Router указываем путь для  Selected post
// step 2 убираем проспы в Selected post
// step 3 достаем id с помощью  useParams ()
// step 4 используем  useEffect, который завязан на id
// step 5 запрос в api get(`/blog/posts/${id}/)
// step 6 нам необходимо написать сагу и создать еще одного вотчера для single post
//  step 7
//  так как работаем с данными 
// => необходимо создать экшен в postSlice(step 7). Создаем getSinglePost
// step 8
// создаем еще один экшен setSinglePost, так как данные необходимо положить в редакс
// step 9 привязываем воркер  getSinglePostWorker к вотчеру. Также описываем самого воркера 
// step 10 запускаем в page SelectedPost
// step 11 получаем данные в page SelectedPost с помощью useSelecrot
// step 12 на наши посты необходимо как-то переходить при клике на них=> реализуем это в карточке Card
// step 13 необходима навигация на Home при клике => используем useNavigate и функцию onHomeClick
