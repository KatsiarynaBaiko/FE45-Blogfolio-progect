import React from "react";
import { useState } from "react";
import FormPagesContainer from "../../components/FormPagesContainer"
import Input from "../../components/Input";
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

    return (
        <FormPagesContainer
            title={'Sign Up'}
            btnTitle={'Sign Up'}
            onSubmit={() => { }}
            additionalInfo={
                <div className={styles.additionalInfo}>
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