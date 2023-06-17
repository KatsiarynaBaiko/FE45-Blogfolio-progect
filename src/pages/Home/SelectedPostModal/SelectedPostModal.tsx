import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card, { CardTypes } from "src/components/Card";
import Modal from "src/components/Modal";
import { PostSelectors, setSelectedPost, setSelectedPostModalOpened } from "src/redux/reducers/postSlice";


// после создания компонента Modal
// в папке pages -> Home создаем папку SelectedPostModal
// где и будет наш выбранный пост в модальном окне

// step 1
// создание компонента SelectedPostModal
// возвращает компонент Modal
// ---
// запихиваем компонет SelectedPostModal в Home
// так как он будет там вызываться при клике на кнопку
// таким образом, нам нужно отследить вызвано ли модальное окно 
// и какой пост мы туда положили
// то есть нужно забирать в пропсу isOpen/!isOpen и понимать какой пост в него положили
// => создаем reducer в котором все это будет происходить => postSlice
// ---
// после того как описали postSlice
// все это необходимо обработать в SelectedPostModal 
// ---
// мы используем useSelector, чтобы использовать функцию 
// (например getSelectedPostModalOpened), которая помогает достать что-то из редакса
// => создаем const isOpened 
// ---
// во внутрь Modal запихиваем наш пост (= Card)
// тип по дизайну - Large
// id={} image={} text={} date={} title={} - беруться из выбранного поста (selectedPost) 
// => используем useSelector и функцию getSelectedPostб чтобы достать данные из редакса
// => создаем selectedPost 
// в Card для selectedPost используем спред оператор чтобы прокинуть все данные из поста 
// так как выбранного поста может и не быть, то не заьываем про null =>
// return selectedPost ? (...) : null (условный рендеринг)
// ---
// также создаем функцию const onCloseModal, которая будет закрывать модальное окно 
// в этот момент у нас происходи швыряние экшэнов в редакс
// а швыряются они с помощью нащих ручек (dispatch) 
// => создаем const dispatch
// и прописываем его в onCloseModal
// также при закрытии модального окна нам необходимо чтобы не было выбранного поста
// то есть удалить пост из модалки => dispatch(setSelectedPost(null))
// ---
// мы прописали фунционал закрытия модального окна
// но еще необходим функционал с его открытием по нажатию на три точечки
// для этого идем в CardList и также прописываем ей dispatch


const SelectedPostModal = () => {

    const isOpened = useSelector(PostSelectors.getSelectedPostModalOpened);
    const selectedPost = useSelector(PostSelectors.getSelectedPost);
    

    const dispatch = useDispatch();

    const onCloseModal = () => {
        dispatch(setSelectedPostModalOpened(false));
        dispatch(setSelectedPost(null));
        // dispatch - ручки
        // setSelectedPost - экшен, куда данные должны улететь
        // null - payload, т е сами данные, которые летят в ф-ии, которые их меняют
    }

    return selectedPost ? (
        <Modal isOpen={isOpened} onClose={onCloseModal} >
            {/* <Card type={CardTypes.Large} id={ } image={ } text={ } date={ } title={ } /> */}
            <Card type={CardTypes.Large} {...selectedPost} />
        </Modal>
    ) : null;
};


// step 2
export default SelectedPostModal;
