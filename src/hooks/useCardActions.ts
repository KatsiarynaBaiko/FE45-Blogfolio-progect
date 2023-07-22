// step 6 Lesson 49 search (по нажатию на кнопку)
// пишем кастомный хук для фукций в карточке
// onStatusClick, onSavedClick, onImageClick, onMoreClick (так как ругается)
// => создаем папку hooks в src и в ней useCardActions

// step 6.1 создаем кастомный хук useCardActions
// не забываем export и index.ts
// step 6.2 внутрь хука переносим функции из CardsList
// step 6.3 return и в него название функций
// step 6.4 в CardsList удаляем все функции (так как создан кастомный хук) и используем его

import React from "react";
import { useDispatch } from "react-redux";
import { LikeStatus, Post } from "src/@types";
import { setLikeStatus, setSavedStatus, setSelectedImage, setSelectedPost, setSelectedPostModalOpened } from "src/redux/reducers/postSlice";

const useCardActions = () => {

    const dispatch = useDispatch();

    const onMoreClick = (post: Post) => () => {
        dispatch(setSelectedPostModalOpened(true));
        dispatch(setSelectedPost(post));
    };

    const onImageClick = (cardsList: string) => () => {
        dispatch(setSelectedPostModalOpened(true));
        dispatch(setSelectedImage(cardsList));
    };

    const onStatusClick = (card: Post) => (status: LikeStatus) => {
        dispatch(setLikeStatus({ card, status }))
    };

    const onSavedClick = (card: Post) => () => {
        dispatch(setSavedStatus({ card }))
    };

    return { onStatusClick, onSavedClick, onMoreClick, onImageClick };

}

export default useCardActions;