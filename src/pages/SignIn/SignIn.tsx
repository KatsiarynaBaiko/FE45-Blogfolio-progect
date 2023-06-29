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

    const dispatch = useDispatch ()
    const navigate = useNavigate ()

    const onSubmit = () => {
        dispatch(signInUser({data: {email, password}, callback: () => navigate(RoutesList.Home)}))
    }

    return (
        <FormPagesContainer
            title={'Sign In'}
            btnTitle={'Sign In'}
            onSubmit={onSubmit}
            additionalInfo={
                <div className={classNames(styles.additionalInfo, {[styles.darkAdditionalInfo]: themeValue === Theme.Dark})}>
                    {'Don’t have an account? '}
                    <span className={styles.signUp}>Sign Up</span>
                </div>
            }
        >
            {/* <div></div> */}
            <Input title={'Email'} placeholder={'Your email'} onChange={setEmail} value={email} />
            <Input title={'Password'} placeholder={'Your password'} onChange={setPassword} value={password} />

            <div className={classNames(styles.forgotPassword, {[styles.darkForgotPassword]: themeValue === Theme.Dark})}>Forgot password?</div>

        </FormPagesContainer>
    )
}

//step 2
export default SignIn
