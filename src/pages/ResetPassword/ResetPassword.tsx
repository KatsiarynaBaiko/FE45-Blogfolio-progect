// Lesson 53 (reset password, reset password confirmation and validation)
// схема с восстановлением пароля такая же, как и с активацией аккаунт
// у нас есть reset password и туда приходит ссылка
// каждое нажатие на кнопку будет вести на signIn 
// => нужна страница для сброса пароля и для подтверждения нового пароля

// step 1 создаем страницу ResetPassword для сброса пароля 
// у нас есть кнопка Reset and Go to Home => это работа с состоянием (useState)
// step 2 создаем api запрос для сброса пароля
// step 3 в authSlice создаем новый экшен resetPassword для сброса пароля 
// и payload к нему ResetPasswordPayload 
// step 4 в authSaga создаем новый воркер  resetPasswordWorker для сброса пароля
// step 5 Lesson 53 (reset password) связываем созданный экшен, воркер на страничке ResetPassword + функция onSubmit 
// step 6 привязываем ResetPassword  к роутеру
// step 7 ResetPassword привязываем к кнопке SignIn (идем в SignIn)
// step 8. Проверяем как работает сброс пароля. 
// В роутер создаем ResetPasswordConfirm для его восстановления
// step 9 после сброса пароля нам нужно сделать его восстановление => создаем   страничку ResetPasswordConfirmation
// step 10 привязываем ResetPasswordConfirmation к роутеру
// step 11 мы работаем с состояниемпри восстановлении пароля => нам необходим useState
// step 12 создаем api запрос для восстановления пароля. 
// step 13 в authSlice создаем новый экшен resetPasswordConfirm для восстановления пароля 
// и payload к нему ResetPasswordPayload 
// step 14 в authSaga создаем новый воркер  resetPasswordConfirmationWorker для восстановления пароля
// step 14 связываем созданный экшен, воркер на страничке resetPasswordConfirm
// валидацию лелаем на страничке resetPasswordConfirm


import React, { useEffect, useState } from "react";
import FormPagesContainer from "src/components/FormPagesContainer";
import classNames from "classnames";
import styles from "./ResetPassword.module.scss";
import Input from "src/components/Input";
import { useNavigate } from "react-router-dom";
import { RoutesList } from "src/pages/Router";
import { useDispatch } from "react-redux";
import { resetPassword } from "src/redux/reducers/authSlice";

// step 1 Lesson 53 (reset password)
// создаем страницу ResetPassword для сброса пароля 
// не забываем export + index.ts
// ---
// у нас есть кнопка Reset и Go to Home => это работа с состоянием (useState)
// setState - это функция, а value - эта наша переменная 
// => для функции onChange используем useState и передаем туда setEmail
// ---
// в swagger ищем запрос, который отвечает за сброс пароля 
// (это /auth/users/reset_password/) и создаем api
// ---
// step 5 Lesson 53 (reset password)
// после создания экшена и воркера праязываем все в reset password
// нам необходима еще одна переменная useState - isSent (это boolean)
// она нужна нам, так как после нажатия кнопочки reset у нас появляется кнопочка go to home
// то есть мы отслеживаем отправили ли  мы запрос на восстановление пароля
// => в onSubmit нам необходимо прописать условие через if
// навигация домой, иначе - передаем наш эешен с помощью dispatch
// для Title коночки и additionalInfo используем условный рендеринг

const ResetPassword = () => {

  const [email, setEmail] = useState("")
  const [isSent, setSent] = useState(false)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = () => {
    if (isSent) {
      navigate(RoutesList.SignIn)
    } else {
      dispatch(resetPassword({ data: email, callback: () => setSent(true) }));
    }
  }

  return (
    <FormPagesContainer
      title={"Reset Password"}
      btnTitle={isSent ? "Go to Sigh In" : "Reset"}
      onSubmit={onSubmit}
    >
      <div className={classNames(styles.additionalInfo)}>
        {isSent &&
          `You will receive an email ${email} with a link to reset your password!`}
        <Input
          title={"Email"}
          placeholder={"Your email"}
          onChange={setEmail}
          value={email}
        />
      </div>
    </FormPagesContainer>
  );
};

export default ResetPassword;