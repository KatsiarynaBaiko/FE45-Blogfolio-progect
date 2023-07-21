import classNames from "classnames";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Theme } from "src/@types";
import { sighUpUser } from "src/redux/reducers/authSlice";
import FormPagesContainer from "../../components/FormPagesContainer"
import Input from "../../components/Input";
import { useThemeContext } from "../../context/Theme";
import styles from './SingUp.module.scss'

// step 1
// создаем компонент и возвращаем наш FormPagesContainer
// который является макетом прорисовки страницы
// onSubmit пока что не работает, поэтому => onSubmit={() => {}}
// также вставляем детей, чтобы он не ругался div></div>
// ---
// и потом формируем верстку и вставляем компонент <Input />
// ---
// прописываем константу: const [name, setName] = useState ('') и тд
// это для отслеживания изменения состояния
// useState() принимает на вход начальное состояние 
// и возвращает массив из двух значений: текущего значения состояния и функции, которая обновляет состояние
// и передаем их в value и функцию onChange

const SingUp = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // Lesson 41: работа с контекстом
    // HW4 Добавление темной темы 
    // так как меняется по проекту, то открываем контекств
    // далее themeValue передаем прописываем в return. чтобы темная тема возвращалась
    // темная тема - с помощью classNames => {[styles.darkAdditionalInfo]: themeValue === Theme.Dark}
    const { themeValue } = useThemeContext();

    // step 8 lesson 45 (saga)
    // сага написана, необходимо ее вызвать и запустить
    // у нас уже есть username, email, password и это необходимо кинуть в сторону саги
    // => нам необходима функция, которая будет это делать (кидать ручками (dispatch))

    const dispatch = useDispatch();
    const onSubmit = () => {
        const data = {
            username: name,
            email,
            password,
        };
        dispatch(sighUpUser({ data, callback: () => { } }));
    };


    return (
        <FormPagesContainer
            title={'Sign Up'}
            btnTitle={'Sign Up'}
            onSubmit={onSubmit}
            additionalInfo={
                <div className={classNames(styles.additionalInfo, { [styles.darkAdditionalInfo]: themeValue === Theme.Dark })}>
                    {'Already have an account? '}
                    <span className={styles.signIn}>Sign In</span>
                </div>
            }
        >
            {/* <div></div> */}
            <Input title={'Name'} placeholder={'Your name'} onChange={setName} value={name} />
            <Input title={'Email'} placeholder={'Your email'} onChange={setEmail} value={email} />
            <Input title={'Password'} placeholder={'Your password'} onChange={setPassword} value={password} />
            <Input title={'Confirm Password'} placeholder={'Confirm password'} onChange={setConfirmPassword} value={confirmPassword} />
        </FormPagesContainer>
    )
};

// step 2
export default SingUp