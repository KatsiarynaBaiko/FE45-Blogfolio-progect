import classNames from "classnames";
import React from "react";
import { Theme } from "src/@types";
import { useThemeContext } from "src/context/Theme";
import FormPagesContainer from "../../components/FormPagesContainer"
import styles from './Success.module.scss'

// step 1
// создаем компонент и возвращаем наш FormPagesContainer
// который является макетом прорисовки страницы
// за основу берем страницу SingUp и адаптируем ее под необходимую верстку

const Success = () => {

    // HW4 Добавление темной темы 
    // так как меняется по проекту, то открываем контекст
    // далее themeValue передаем прописываем в return. чтобы темная тема возвращалась
    // темная тема - с помощью classNames => {[styles.darkTextSuccess]: themeValue === Theme.Dark}
    const { themeValue } = useThemeContext();

    return (
        <FormPagesContainer
            title={'Success'}
            btnTitle={'Go to home'}
            onSubmit={() => { }}
        >
            <div className={classNames(styles.textSuccess, {[styles.darkTextSuccess]: themeValue === Theme.Dark})}>
                {'Email confirmed.'} <br /> {'Your registration is now completed'}
            </div>
        </FormPagesContainer>
    )
}

// step 2
export default Success