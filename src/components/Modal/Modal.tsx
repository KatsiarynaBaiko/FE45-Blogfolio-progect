import React from "react"
import { FC } from 'react'
import ReactModal from 'react-modal' // react-madal ругается => yarn add -D @types/react-modal
import { Children } from "src/@types";
import styles from './Modal.module.scss';

// нам необходимо реализовать предпросмотр поста
// по клику на кнопочку "три точечки" (DotsMenuIcon)
// у нас открывается модальное окно (попап) с нашим постом
// и выбранный пост должен лежат в redux
// preparing - сделать модальное окно (можно через react-modal)


// step 4
// прописываем пропсы
// и передаем их в компонент Modal + присваиваем FC<ModalProps>
// также нам нужны children - так как модальное окно будет что-то оборачивать

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: Children;
};


// step 1
// создаем компонент Modal
// возвращаем компонент ReactModal
// ReactModal - ругается, что что отсутствуют пропсы (Property 'isOpen' is missing...)
// => необходимы пропсы

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose}>
            <div className={styles.modalContainer} >
                <div className={styles.modalContent}>
                    {/* для крестика на закрытие */}
                    <div></div> 
                    <div className={styles.modalInfo}>{children}</div>
                </div>
            </div>
        </ReactModal>
    )
}


// step 2
export default Modal;