// Lesson 51 AddNewPost
// необходимо реалтзовать функционал по добавлению нового поста 
// для этого необходимо создать отдельную страничку с данным функционалом
// в swagger нужен запрос post /blog/post
// сперва создаем компонет без данных, затем привязываем данные

// step 1 создать страничку AddPost
// step 2 устанавливаем библиотеку для работы с изображениями (их загрузка) 
// step 3 привязываем AddPost в роутере 
// step 4 делаем запрос в api
// step 5 в postSlise создаем экшен addNewPost для добавления поста
// для addNewPost будет formData и ее мы отправляем при запросе
// => идем в addPost и пишем функцию onSubmit, чтобы все сохранилось и работало
// создаем искусственно formData
// step 6 postSaga создаем воркер addPostWorker для добавления поста
// Lesson 51 AddNewPost+Fix My post
// step 7 идем в postSaga и дописываем воркера getMyPostsWorker (добавляем лоадинг) (fix error 404)
// step 8 на страничке Home обновляем наш useEffect
// step 9 дописываем tabsSwitcher на страничке Home (добавляем переключение на Favourites=Saved post) 
// step 10 в CardsList прописываем условие для вывода Loader или EmptyState (fix error 404)
// step 11 на страничке Home добавдяем работу пагинации
// ---
// step 2... Lesson 52 edit and delete Post
// работа с удалением и редактированием поста (шаги прописаны ниже)

import React, { useEffect, useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';

import Button, { ButtonTypes } from 'src/components/Button/Button';
import Input from 'src/components/Input/Input';
import Title from 'src/components/Title/Title';
import styles from './AddPost.module.scss'
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPost, deletePost, editPost, getSinglePost, PostSelectors } from 'src/redux/reducers/postSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutesList } from '../Router';
import { AuthSelectors } from 'src/redux/reducers/authSlice';

// step 1 создать страничку AddPost
// компонуем ее из наших компонентов
// не забываем export и index.ts
// ---
// прописываем сперва текстовые поля и кнопочки
// используем useState для компонентов AddPost (для полей нашего поста)
// ---
// step 2
// для картинки в запросе стоит тип string (binary)
// бинарный тип у всех файлов - и картинку значит передаем файлом
// установленная библиотека позврляет забирать картинки в виде файлов и передавать их
// установленная баблиотека работает через useState (в документации) 
// смотрим как работает и вставляем из документации ImageUploading (убираем не нужные нам пропсы)
// также забираем функцию onChange для работы 
// добавляем необходимые типы (смотрим по документации): 
// ImageListType для imageList, number для addUpdateIndex (через TypeScript тыкая на пропсу)
// ---
// добавляем условный рендерин: если массив картинок не пустой - то показывать кнопочки (Remove/Remove all/Upd)

const AddPost = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [lessonNumber, setLessonNumber] = useState('')
    const [description, setDescription] = useState('')
    const [text, setText] = useState('')

    // установленная библиотека (step 2)работает через useState (в документации)
    const [images, setImages] = useState<ImageListType>([]);

    // функция из библиотеки (step 2) для работы
    const onChange = (imageList: ImageListType, addUpdateIndex?: number[]) => {
        setImages(imageList);
    };


    const onNavigateToHome = () => {
        navigate(RoutesList.Home)
    }

    // step 5 Lesson 51 AddNewPost
    // в postSlise создаем экшен addNewPost для добавления поста
    // типизируем наш payload в @types => AddPostDataPayload
    // для addNewPost будет formData и ее мы отправляем при запросе
    // ---
    // => идем в addPost и пишем функцию onSubmit, чтобы все сохранилось и работало
    // и дальше мы ее передаем (через вызов dispatch и передачу экшена)
    // создаем искусственно formData (нашу форму отправки данных)
    // также после добавления поста логично будет навигировать на Home 
    // => создаем функцию onNavigateToHome и передаем ее в callback
    // => на кнопочку onSubmit мы передаем функцию onSubmit 
    // => на кнопочку Cancel мы передаем функцию onNavigateToHome 
    // ---
    // step 9 Lesson 52 edit and delete Post
    // создаем const action и передаем с помощью dispatch
    // и if (singlePost?.author) { formData.append("author"...}

    const onSubmit = () => {
        const formData = new FormData() // создаем экземпляр класса
        formData.append("title", title);
        formData.append("text", text);
        formData.append("description", description);
        formData.append("lesson_num", lessonNumber);
        formData.append("image", images[0].file as Blob);

        if (singlePost?.author) {
            formData.append("author", singlePost.author.toString());
        }

        const action = singlePost
            ? editPost({
                data: { postId: singlePost.id, newData: formData },
                callback: onNavigateToHome,
            })
            : addNewPost({
                data: formData,
                callback: onNavigateToHome,
            });
        dispatch(action);


        // step 9 Lesson 52 edit and delete Post
        // можно удалить dispatch
        // dispatch(addNewPost({
        //     data: formData, callback: onNavigateToHome
        // }))
    }

    // step 2 Lesson 52 edit and delete Post
    // достаем параметр id в AddPost
    const { id } = useParams();

    // step 3 Lesson 52 edit and delete Post
    // делаем запрос (через  useEffect) в который 
    // через dispatch передаем getSinglePost и 
    // который будет зависеть от id и получать SinglePost, если есть id

    useEffect(() => {
        if (id) {
            dispatch(getSinglePost(id));
        }
    }, [id]);

    // step 4 Lesson 52 edit and delete Post
    // достаем наш singlePost через useSelector
    // и пишем еще один useEffect в котором зависимостью будет singlePost?.id
    // id? - так как id как может быть, так и нет
    // ---
    // редактировать посты могут только тот, кто его создал 
    // это можно проверить через автора (он есть в Post) 
    // и => его сравниванием с userInfo.id
    // проверяем условие singlePost.author === userInfo.id (доступ к редактированию поста)
    // и если они равны, то заполняем полями из singlePost
    // если не равны, то навигируем на Home (если нет доступа)
    // картинки у нас присылаются ссылками (запускаем проект и смотрим через redux)
    // => используем dataURLKey="imageData"

    const singlePost = useSelector(PostSelectors.getSinglePost);
    const userInfo = useSelector(AuthSelectors.getUserInfo);

    useEffect(() => {
        if (singlePost && userInfo) {
            if (singlePost.author === userInfo.id) {
                setTitle(singlePost.title);
                setLessonNumber(singlePost.lesson_num.toString());
                setDescription(singlePost.description);
                setText(singlePost?.text || "");
                setImages([{ imageData: singlePost.image }]);
            } else {
                navigate(RoutesList.Home);
            }
        }
    }, [singlePost?.id]);

    // step 6 Lesson 52 edit and delete Post
    // так как у нас редактирование поста, 
    // то логично будет заблокировать кнопочку delete во время редактирования
    // также меняем название кнопочки с AddPost = на Update Post
    // => нам нужно прописать условие в самом title: singlePost?.id ? "Edit post" : "Add post"
    // для delete добавляем disabled={!singlePost?.id} (если нету чего редактировать, то и нечего удалять)

    // step 7 Lesson 52 edit and delete Post
    // работаем с кнопочкой delete. Пишем для нее функцию onDeletePost на удаление поста 
    // нам нужен экшен для удаления => postSlice создаем экшен deletePost
    // в postSaga создаем наш воркер deletePostWorker

    const onDeletePost = () => {
        if (singlePost) {
            dispatch(deletePost({ data: singlePost.id, callback: onNavigateToHome }));
        }
    };


    return (
        <div className={styles.addPostContainer}>
            <Title className={styles.title} title={'Add post'} />

            <Input className={styles.inputTitle} title={'Title'} placeholder={'Введите название поста'} onChange={setTitle} value={title} />
            <div className={styles.wrapContainer}>
                <Input className={styles.inputLessonNumber} title={'Lesson number'} placeholder={'Введите номер урока'} onChange={setLessonNumber} value={lessonNumber} />


                <ImageUploading
                    value={images}
                    onChange={onChange}
                    dataURLKey="imageData"
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                    }) => (
                        <div className={styles.uploadImageWrapper}>
                            {
                                !imageList.length &&
                                <div
                                    className={classNames(styles.uploadImage, { [styles.uploadDragging]: isDragging })}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    Click or Drop here
                                </div>
                            }
                            {
                                !!imageList.length &&
                                <Button className={classNames(styles.removeBtn, styles.allBtn)} title={'Remove all images'} type={ButtonTypes.Primary} onClick={onImageRemoveAll}
                                />
                            }

                            {imageList.map((image, index) => (
                                <div key={index} className={styles.imageItem}>
                                    <img src={image['imageData']} alt="" width="100" />
                                    <div className={styles.imageItemBtnWrapper}>
                                        <Button className={classNames(styles.allBtn)} title={'Remove'} type={ButtonTypes.Primary} onClick={() => onImageRemove(index)} />
                                        <Button className={classNames(styles.allBtn)} title={'Update '} type={ButtonTypes.Primary} onClick={() => onImageUpdate(index)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ImageUploading>
            </div>

            <Input className={styles.description} isTextarea title={'Description'} placeholder={'Add your text'} onChange={setDescription} value={description} />
            <Input className={styles.text} isTextarea title={'Text'} placeholder={'Add your text'} onChange={setText} value={text} />

            <div className={styles.endBtnWrap}>
                <Button type={ButtonTypes.Error} title={'Delete post'} onClick={onDeletePost} disabled={!singlePost?.id} />
                <div className={styles.endRightBtn} >
                    <Button type={ButtonTypes.Secondary} title={'Cancel'} onClick={onNavigateToHome} />
                    <Button type={ButtonTypes.Primary} title={singlePost?.id ? "Edit post" : "Add post"} onClick={onSubmit} />
                </div>
            </div>
        </div >
    );
}

export default AddPost;



// Lesson 52 edit and delete Post
// редактирования и удаления поста нам нужен id (ключ наш) 
// и доступ к полям, которые мы будем редактировать
// id мы можем получить с помощью useParams (параметр из url)
// редактировать может только залогиненный пользователь и только свой пост (то есть тот, кто его создал)

// step 1 в роутер указываем путь для редактирование поста
// step 2 достаем параметр id в AddPost
// step 3 делаем запрос (через useEffect) и получаем id от SinglePost, если он есть
// step 4  достаем наш singlePost через useSelector и прописываем еще один useEffect
// в котором проверяем условие singlePost.author === userInfo.id (доступ к редактированию поста)
// и если они равны, то заполняем полями из singlePost
// step 5 на страничке SelectedPost (SinglePost) добавляем кнопочку Edit для редактирования постов и создаем функцию для редактирования постов onClickEdit
 // step 6 так как у нас редактирование, то логично будет заблокировать кнопочку delete во время редактирования + пишем условие какую кнопку показать  Edit post или Add post
// step 7 работаем с кнопочкой delete. 
// Пишем для нее функцию onDeletePost на удаление поста 
// в postSlice создаем экшен deletePost и payload для него: DeletePostPayload
 // в postSaga создаем наш воркер deletePostWorker
// нам нужен api для deletePost => идем в api и создаем запрос deletePost
// step 8 работаем с кнопочкой edit
// создаем экшен  editPost  в postSlice для редактирования поста и payload для него: EditPostPayload
// в postSaga создаем наш воркер editPostWorker
// нам нужен api для editPost => идем в api и создаем запрос editPost
// step 9 идем в AddPost и в функцию onSubmit
// создаем const action и передаем с помощью dispatch
// и if (singlePost?.author) { formData.append("author"...}