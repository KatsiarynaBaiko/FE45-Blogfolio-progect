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

import React, { useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';

import Button, { ButtonTypes } from 'src/components/Button/Button';
import Input from 'src/components/Input/Input';
import Title from 'src/components/Title/Title';
import styles from './AddPost.module.scss'
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { addNewPost } from 'src/redux/reducers/postSlice';
import { useNavigate } from 'react-router-dom';
import { RoutesList } from '../Router';

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

    const onSubmit = () => {
        const formData = new FormData() // создаем экземпляр класса
        formData.append("title", title);
        formData.append("text", text);
        formData.append("description", description);
        formData.append("lesson_num", lessonNumber);
        formData.append("image", images[0].file as Blob);
        dispatch(addNewPost({
            data: formData, callback: onNavigateToHome
        }))
    }


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
                <Button type={ButtonTypes.Error} title={'Delete post'} onClick={() => { }} />
                <div className={styles.endRightBtn} >
                    <Button type={ButtonTypes.Secondary} title={'Cancel'} onClick={onNavigateToHome} />
                    <Button type={ButtonTypes.Primary} title={'Add post'} onClick={onSubmit} />
                </div>
            </div>
        </div >
    );
}

export default AddPost;