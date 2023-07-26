import classNames from "classnames";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Theme } from "src/@types";
import { useThemeContext } from "src/context/Theme";
import { activateUser } from "src/redux/reducers/authSlice";
import FormPagesContainer from "../../components/FormPagesContainer"
import { RoutesList } from "../Router";
import styles from './RegistrationConfirmation.module.scss'

// Lesson 46  (activate user)
// Реализовать активацию пользователя после регистрации
// Путь "/activate/:uid/:token"
// step 1  актуализация текста
// step 2 измененить путь в Router для RegistrationConfirmation
// step 3 достать параметры uid и token из url
// step 4 в swagger  ищем запрос /auth/users/activation/ => идем в api  и прописываем запрос
// Также типизируем нашу data в @types
// step 5 необходимо создать action в authSlice, так как работаем с данными
// step 6 нам необходимо написать сагу => идем в authSаga и создаем нового воркера function* activateUserWorker
// step 7 нам необходимо все запустить => запускаем это через функцию onSubmit и используем navigate для навигации в RoutesLis и dispatch


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

    // step 3 Lesson 46 (activate user)
    // Достаем uid и token из url через создание константы и использовании useParams ()
    // это есть наши параметры в url
    const { uid, token } = useParams();

    // step 7 lesson 46(activate user)
    // Нам необходимо все запустить =>
    // используем navigate для навигации в RoutesList
    // и запускаем это через функцию onSubmit
    // также швыряем даши данные с помощью ручек dispatch
    // uid может быть string или underfiend (поэтому и ругается)
    // нужен валидный uid и валидный token => нужна проверка
    // решается это через if (uid && token) {...}
    // для проверки копируем полученную на почту ссылку (activate/NjU4OA/bqnona-ee23fb253574cfe093135c946cf06225)
    // и вставляем ее вместо sing-up 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = () => {
        if (uid && token) {
            dispatch(
                activateUser({
                    data: { uid, token },
                    callback: () => {
                        navigate(RoutesList.SignIn)
                        // console.log('APPROVED')
                    },
                })
            );
        }
    };


    return (
        <FormPagesContainer
            title={'Registration Confirmation'}
            btnTitle={'Activate'}
            onSubmit={onSubmit}
        >
            <div className={classNames(styles.textRegistrationConfirmation, { [styles.darkTextRegistrationConfirmation]: themeValue === Theme.Dark })}>
                {/* {'Please activate your account with the activation link in the email example@gmail.com.\n Please, check your email'} */}
                {/* // step 1 Lesson 46 (activate user)
                // меняем текст для активации пользователя через кнопку 
                // также в кнопочке вместо текста 'Go to home' будет 'Activate' */}
                <div>{"Please activate your account with clicking on button"}</div>
            </div>
        </FormPagesContainer>
    )
}

// step 2
export default RegistrationConfirmation