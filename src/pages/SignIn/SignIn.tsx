import classNames from "classnames";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Theme } from "src/@types";
import { useThemeContext } from "src/context/Theme";
import { signInUser } from "src/redux/reducers/authSlice";
import FormPagesContainer from "../../components/FormPagesContainer"
import Input from "../../components/Input";
import { RoutesList } from "../Router";
import styles from './SignIn.module.scss'

//step 1
// создаем компонент и возвращаем наш FormPagesContainer
// который является макетом прорисовки страницы
// ---
// формируем верстку и вставляем компонент <Input />
// ---
// прописываем константу: const [name, setName] = useState ('') и тд
// для отслеживания изменения состояния

const SignIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // HW4 Добавление темной темы 
    // так как меняется по проекту, то открываем контекст
    // далее themeValue передаем прописываем в return. чтобы темная тема возвращалась
    // темная тема - с помощью classNames => {[styles.darkAdditionalInfo]: themeValue === Theme.Dark}
    const { themeValue } = useThemeContext();



    // step 6 Lesson 47 (auth+ access token)
    // обрабатываем нашу сагу на странице Sing in
    // Пишем функцию onSubmit, чтобы при нажатии  ручки закидывали данные. 
    // передаем нашу data и callback

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = () => {
        dispatch(signInUser({ data: { email, password }, callback: () => navigate(RoutesList.Home) }))
    }

    return (
        <FormPagesContainer
            title={'Sign In'}
            btnTitle={'Sign In'}
            onSubmit={onSubmit}
            additionalInfo={
                <div className={classNames(styles.additionalInfo, { [styles.darkAdditionalInfo]: themeValue === Theme.Dark })}>
                    {'Don’t have an account? '}
                    <span className={styles.signUp}>Sign Up</span>
                </div>
            }
        >
            {/* <div></div> */}
            <Input title={'Email'} placeholder={'Your email'} onChange={setEmail} value={email} />
            <Input title={'Password'} placeholder={'Your password'} onChange={setPassword} value={password} />

            <div className={classNames(styles.forgotPassword, { [styles.darkForgotPassword]: themeValue === Theme.Dark })}>Forgot password?</div>

        </FormPagesContainer>
    )
}

//step 2
export default SignIn


// Lesson 47 (auth+ access token)
// Реализовать Login и получить от сервера токены
// Также реализовать сохранение access token для последующих приватных запросов
// --
// За процесс авторизации будет отвечать запрос /auth/jwt/create/
// так как нам нужно сделать токен для пользователя (получение токена)
// ---
// step 1 запрос в api: post  /auth/jwt/create/ + типизируем нашу data в @types
// step 2 создаем action для авторизации в authSlice  => signInUser, а также типизируем action: PayloadAction<SignInUserPayload>
// step 3 создаем  action setAccessToken, который будет ложить данные в редакс, также 
// в initialState создаем accessToken
// step 4 приступаем к работе в саге authSaga. 
// Создаем еще одного воркера signInUserWorker
// Типизируем ApiResponse
// обрабатываем его с помощью if и помещаем в редакс с  помощью put
// step 5 чтобы токен мы могли каждый раз использовать и не пересоздавать, и чтобы он не терялся
// используется localStorage
// создаем файл constants с постоянными и прописываем ключи
// В signInUserWorker кладем в  localStorage наши ключи и  значения токенов 
// привязываем воркер к вотчеру
// step 6 обрабатываем нашу сагу на странице Sing in
// Пишем функцию onSubmit, чтобы при нажатии  ручки закидывали данные. 
// передаем нашу data и callback
// step 7 однако при перезагрузке страница мы вылетаем
// => чтобы мы могли использовать уже созданный токен  и чтобы он не терялся нигде в initialState мы достаем его из localStorage
// step 8 нам нужно доставать токен из редкая (с помощью селектора) так как мы проверяем залогинен ли пользователь или нет (чтобы показывал/скрывать опредлененные странички, addPosts)
// => прописываем Selector
// step 9 идем в Header и переменную isLoggedIn привязываем в селектору
// step 10 в Home переменную isLoggedIn привязываем в селектору
// step 11 в Router добавляем условный рендеринг и указываем какие странички не должны быть видны пользователю после авторизации
// step 12 в Header для Button UserIcon
// добавляем   условный рендеринг  Username  (если залогинен -  показать Username, а иначе иконку UserIcon)// 