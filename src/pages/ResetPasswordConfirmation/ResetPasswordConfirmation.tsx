import React, { useEffect, useMemo, useState } from "react";

import FormPagesContainer from "src/components/FormPagesContainer";
import classNames from "classnames";

import { Theme } from "src/@types";
import { useThemeContext } from "src/context/Theme";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPasswordConfirm } from "src/redux/reducers/authSlice";
import { RoutesList } from "src/pages/Router";
import Input from "src/components/Input";


// step 9 (reset password confirmation)
// после сброса пароля нам нужно сделать его восстановление 
// => необходимо создать еще одну страницу на которой будем восстанавливать пароль 
// => создаем ResetPasswordConfirmation
// не забываем export + index.ts
// --- 
// step 11 (reset password confirmation)
// мы работаем с соятоянием => нам необходим useState
// ---
// в swagger ищем запрос, который отвечает за сброс пароля 
// (auth/users/reset_email_confirm/) и создаем api
// ---
// step 14 связываем созданный экшен, воркер на страничке resetPasswordConfirm
// функция onSubmit юудет аналогчна тойб которую прописывали в RegistrationConfirmation 
// ---
// validation Lesson 53
// создаем пропсу isSubmitDisabled в FormPagesContainer
// и передаем ее в кнопочку
// --- 
// есть 2 способа валидировать значения, через useState и useMemo
// ---
// нам нужно применять disabled для кнопки
// => на нужны 2 переменные useState: passwordField и confirm
// их мы запихнули в объект и работаем с объектом useState
// создаем функции onChangePassword и onChangePasswordConfirm 
// ---
// используем useMemo и в нем прописываем прописываем валидацию (условия)
// когда мы не трогали поля для восстановления пароля
// а также длина паролей не совпадает
// то кнопочка не валинда ( isSubmitDisabled={!isSubmitValid} )
// ---
// используем useEffect и в нем прописываем прописываем валидацию (условия)
// для совпадения паролей и минимальной длины
// в массиве зависимостей иакже будет password, confirmPassword => создаем useState
// ---
// для спецсимволов использовать Regex pattern including all special characters
// const regex = "[^\w\s]";
// regex.match('akdmsflkadmflkdsmf')


const ResetPasswordConfirmation = () => {

  const { themeValue } = useThemeContext();

  const { uid, token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onSubmit = () => {
    if (uid && token) {
      dispatch(
        resetPasswordConfirm({
          data: { uid, token, new_password: password },
          callback: () => {
            navigate(RoutesList.SignIn);
          },
        })
      );
    }
  };


  // validation Lesson 53
  // работаем с объектом useState
  const [isTouched, setTouched] = useState({
    passwordField: false,
    confirm: false,
  });

  // validation Lesson 53
  // создаем функции onChangePassword и onChangePasswordConfirm 
  const onChangePassword = (value: string) => {
    setPassword(value);
    setTouched((prevState) => ({ ...prevState, passwordField: true }));
  };

  const onChangePasswordConfirm = (value: string) => {
    setConfirmPassword(value);
    setTouched((prevState) => ({ ...prevState, confirm: true }));
  };

  // validation Lesson 53
  // используем useMemo и в нем прописываем прописываем валидацию (условия)
  // когда мы не трогали поля для восстановления пароля
  // а также длина паролей не совпадает
  // то кнопочка не валинда ( isSubmitDisabled={!isSubmitValid} )
  // когда вставляем в массив зависимостей объект - то обязательно привязываемся к какому-то полю
  // иначе - ничего не будет

  const isSubmitValid = useMemo(
    () =>
      isTouched.passwordField &&
      isTouched.confirm &&
      password.length &&
      confirmPassword.length &&
      !passwordError.length,
    [
      password,
      confirmPassword,
      isTouched.passwordField,
      isTouched.confirm,
      passwordError,
    ]
  );

  // validation Lesson 53
  // используем useEffect и в нем прописываем прописываем валидацию (условия)
  // для совпадения паролей и минимальной длины
  // в массиве зависимостей также будет password, confirmPassword => создаем useState
  // также поднязываемся под isTouched (это называется динамическая валидация)
  // в инпут вставляем errorText={passwordError}, чобы пользователь видел, что не так

  useEffect(() => {
    if (isTouched.passwordField && isTouched.confirm) {
      if (password !== confirmPassword) {
        setPasswordError("Passwords Must Match");
      } else if (password.length < 8 || confirmPassword.length < 8) {
        setPasswordError("Passwords length should be more than 8 characters");
      } else {
        setPasswordError("");
      }
    }
  }, [password, confirmPassword, isTouched.passwordField, isTouched.confirm]);

  return (
    <FormPagesContainer
      title={"New Password"}
      btnTitle={"Set Password"}
      isSubmitDisabled={!isSubmitValid}
      onSubmit={onSubmit}
    >
      <div>
        <Input
          title={"Password"}
          placeholder={"Your password"}
          onChange={onChangePassword}
          value={password}
          errorText={passwordError}
        />
        <Input
          title={"Confirm Password"}
          placeholder={"Confirm password"}
          onChange={onChangePasswordConfirm}
          value={confirmPassword}
          errorText={passwordError}
        />
      </div>
    </FormPagesContainer>
  );
};

export default ResetPasswordConfirmation;