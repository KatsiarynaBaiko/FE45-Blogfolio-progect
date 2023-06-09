import classNames from "classnames";
import React from "react";
import { Theme } from "src/@types";
import { useThemeContext } from "src/context/Theme";
import FormPagesContainer from "../../components/FormPagesContainer"
import styles from './RegistrationConfirmation.module.scss'

// step 1
// создаем компонент и возвращаем наш FormPagesContainer
// который является макетом прорисовки страницы
// за основу берем страницу SingUp и адаптируем ее под необходимую верстку

const RegistrationConfirmation = () => {

    // HW4 Добавление темной темы 
    // так как меняется по проекту, то открываем контекст
    // далее themeValue передаем прописываем в return. чтобы темная тема возвращалась
    // темная тема - с помощью classNames => {[styles.darkTextRegistrationConfirmation]: themeValue === Theme.Dark}
    const { themeValue } = useThemeContext();

    return (
        <FormPagesContainer
            title={'Registration Confirmation'}
            btnTitle={'Go to home'}
            onSubmit={() => { }}
        >
            <div className={classNames(styles.textRegistrationConfirmation, {[styles.darkTextRegistrationConfirmation]: themeValue === Theme.Dark})}> 
                {'Please activate your account with the activation link in the email example@gmail.com.\n Please, check your email'}
            </div>
        </FormPagesContainer>
    )
}

// step 2
export default RegistrationConfirmation