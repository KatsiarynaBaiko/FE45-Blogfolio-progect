import React, { KeyboardEvent, useMemo, useState } from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { CloseIcon, MenuIcon, SearchIcon, UserIcon } from "src/assets/icons";
import Button, { ButtonTypes } from "../Button";
import ThemeSwitcher from "../ThemeSwitcher";
import styles from './Header.module.scss';
import { RoutesList } from "src/pages/Router";
import Username from "../Username";
import { useThemeContext } from "src/context/Theme";
import classNames from "classnames";
import { Theme } from "src/@types";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import { AuthSelectors, logoutUser } from "src/redux/reducers/authSlice";
import { clearSearchedPosts } from "src/redux/reducers/postSlice";


// step 1
// если посмотреть в браузере, то все наши встранички пропали, но 
// у библиотеки react-route есть штука под названием Outlet
// так вот Outlet - это все то, что внутри подменяется (наши странички условно)
// react самостоятельно контролит, какой компонент (странички) нужно менять/подтягивать по пути
// ---
// далее верстаем наш Header + стилизуем с помощтю className
// будет состоять из трех частей, условно: header, боковое меню и Footer
// title у кнопочки будет иконочкой (напоминание: когда прописывали ButtonProps: title: string | ReactElement;)
// => в title передаем <MenuIcon /> => title={<MenuIcon />}
// ---
// чтобы кнопочка меню работала - необходим отдельный компонент боковое меню 
// которое и будет открываться/закрываться по кнопочке
// верстка + стилизация
// --- 
// чтобы кнопочка переключалась нам необходимо отслеживать ее состояние (active/ don't active)
// => const [isOpened, setOpened] = useState(false)
// и если она открыта (isOpened) - то показать меню, иначе - нет
// => const handleMenuOpened
// handle употребляется, когда состояние или true или false 
// и функция меняет состояние на обратное 
// => нам не нужно писать 2 функции (1 - на открытие, 2 - на закрытие)
// и просто передаем эту функцию в кнопочку => onClick={handleMenuOpened}
// ---
// чтобы иконка меню меняла свой вид нужно прописать условие
// title={isOpened ? <CloseIcon /> : <MenuIcon />}
// это есть условный рендеринг
// ---
// верстаем внутренность бокового меню
// использя в том числе ранее созданные компоненты
// также есть кнопочка Log-out
// ---
// у нас появляется функция onLoginButtonClick и хук useNavigate (от react-router-dom)
// и он возвращает функцию navigate, в которую мы передаем страничку, на которую хотим перейти (через пропсу)
// => navigate(RoutesList.SignIn)
// И эту функцию передаем в кнопку Log-out => onClick={onLoginButtonClick}
// --- 
// кнопочки в верхней части бокового меню можно сделать 
// или через <div>, или с помощью useMemo
// это навигационные кнопки 
// ---
// также применяем возможность смены на темную тему
// используем для этого контекс
// ---
// у нас будет переменная const isLoggedIn = true;
// под которую и подвязано useMemo, мы передаем ее туда
// и если она true - доступно: 
// имя пользователя (прописываем ее в userName) и кнопка Add Post
// ---
// в Header есть поисковая строкаю Это Инпут в который мы вводим информацию + рядом кнопочка
// для Input нет title => это не обязательная пропса => title? в компоненте Input
// также нам необходимо стилизовать интуп => добавляем ему пропсу  className?:string;
// нам необходимо отслеживать его состояние => используем useState
// также прописываем открытие и закрытие инпута по аналогии с боковым меню


const Header = () => {

    // боковое меню
    const [isOpened, setOpened] = useState(false);
    const handleMenuOpened = () => {
        setOpened(!isOpened);
    };

    // навигация
    const navigate = useNavigate();
    const onLoginButtonClick = () => {
        navigate(RoutesList.SignIn);
    };

    // передаем переменную в navLinks
    // и если она true - то доступно 
    // имя пользователя (прописываем ее в userName) и кнопка Add Post
    // const isLoggedIn = true;
    // ---
    // step 9 Lesson 47 (auth+ access token)
    // переменную isLoggedIn привязываем в селектору
    const isLoggedIn = useSelector(AuthSelectors.getLoggedIn)
    // const isLoggedIn = false;

    // кнопочки в верхней части бокового меню через map
    // и указываем на какие страницы ведет путь
    // Если кнопка не доступно, то нее не дожно быть видно
    // тот есть она должна пропадать
    // для этого прописываем условие: ...(isLoggedIn ? [{ path: RoutesList.SingUp, title: 'Add Post' }] : [])
    const navLinks = useMemo(
        () => [
            { path: RoutesList.Home, title: 'Home' },
            // { path: RoutesList.SingUp, title: 'Add Post' }
            ...(isLoggedIn ? [{ path: RoutesList.SingUp, title: 'Add Post' }] : [])
        ],
        [isLoggedIn]
    );

    // темная тема
    const { themeValue } = useThemeContext();

    // отслкживаем состояние input
    // и передаем его в инпут
    const [inputValue, setInputValue] = useState('');

    // открытие и закрытие инпутв
    // ---
    // step 8 Lesson 49 search 
    // запускаем работу поиска: нам необходимо проверять
    // если серч и в интуп что-то введено - навигируем на страницу с поиском
    // также параллельно очищаем строку поиска
    // ---
    // step 9 Lesson 50 пагинация (бесконечная прокрутка)
    // возникает косячок, что результаты старого поиска сохраняются 
    // и на него накладывается новый 
    //этой решается через очистку предыдущего запроса при предотправке запроса
    // => dispatch(clearSearchedPosts());

    const [isSearch, setSearch] = useState(false);
    const handleSearchOpened = () => {
        setSearch(!isSearch);
        if (isSearch && inputValue) {
            dispatch(clearSearchedPosts());
            navigate(`posts/${inputValue}`);
            setInputValue("");
        }
    };

    // step 12 Lesson 47 (auth+ access token)
    // для Button UserIcon добавляем условный рендеринг c Username  
    // (если залогинен -  показать Username, а иначе иконку UserIcon)

    // step 7 HW9 (userInfo)
    // нам необходимо отрендерить данные пользователя в плашечку
    // Используем селектор и getUserInfo
    // ---
    // Прописываем условный рендеринг для кнопочки: 
    // если залогинен и есть инфа - показать плашечку с инфой о пользователе
    // иначе просто кнопочку с человечком
    const userInfo = useSelector(AuthSelectors.getUserInfo);


    // step 5 Lesson 48 update access token (refresh and verify )
    // вешаем logout на кнопочку на боковом меню 
    // условный рендерин: isLoggedIn ? onLogout : onLoginButtonClick
    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(logoutUser());
    };


    // step 1 Lesson 49 onKeyDown
    // функционал для поиска по нажатию на кнопочку (она может быть любой - Enter например)
    // => создаем функцию onKeyDown
    // HTMLTextAreaElement - добавляем, так как у нас еще textarea
    // onKeyDown всовываем в инпут
    // он ругается, так как нет этой пропсы => добавляем onKeyDown в пропсы инпута


    const onKeyDown = (
        event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (event.key === "Enter") {
            handleSearchOpened();
        }
    };

    return (
        <div className={classNames(styles.container, { [styles.darkContainer]: themeValue === Theme.Dark })}>
            <div className={styles.header}>
                <div className={styles.headerLeftSide}>
                    <Button
                        type={ButtonTypes.Primary}
                        title={isOpened ? <CloseIcon /> : <MenuIcon />}
                        onClick={handleMenuOpened}
                        className={styles.burgerMenuButton}
                    />
                </div>

                {isSearch ?
                    <div className={styles.headerCenterSearch}>
                        <Input className={styles.inputSearch}
                            placeholder='Search...'
                            onChange={setInputValue}
                            value={inputValue}
                            onKeyDown={onKeyDown}
                        />
                        <Button
                            type={ButtonTypes.Primary}
                            title={<CloseIcon />}
                            onClick={handleSearchOpened}
                            className={styles.closeSearchButton}
                        />
                    </div>
                    : <div> </div>
                }

                <div className={styles.headerRightSide}>
                    <Button
                        type={ButtonTypes.Primary}
                        title={<SearchIcon />}
                        onClick={handleSearchOpened} // пока что так, но по факту должен открываться поиск. UPD поиск найден в компонентах фигма. Делаем через Инпут
                        className={styles.searchButton}
                    />

                    {/* <Button
                        type={ButtonTypes.Primary}
                        title={<UserIcon />}
                        onClick={onLoginButtonClick}
                        className={styles.userButton}
                    /> */}
                    {/* step 12 Lesson 47 (auth+ access token) */}
                    {/* {isLoggedIn ? <Username username={'Katsiaryna'} /> :
                        <Button
                            type={ButtonTypes.Primary}
                            title={<UserIcon />}
                            onClick={onLoginButtonClick}
                            className={styles.userButton}
                        />} */}
                    {/* step 7 HW9 (userInfo) */}
                    {isLoggedIn && userInfo ? <Username username={userInfo.username} /> :
                        <Button
                            type={ButtonTypes.Primary}
                            title={<UserIcon />}
                            onClick={onLoginButtonClick}
                            className={styles.userButton}
                        />}
                </div>
            </div>

            <div className={styles.infoContainer}>
                <Outlet />
                <div className={styles.footer}>
                    <div>©2022 Blogfolio</div>
                    <div>All rights reserved</div>
                </div>
            </div>

            {/* // боковое меню */}
            {isOpened &&
                (
                    <div className={styles.menuContainer}>
                        <div>
                            {isLoggedIn && <Username username={'Katsiaryna'} />}
                            {navLinks.map((link) => (
                                // <div key={link.path} className={styles.navLinkButton} title={link.title}></div>
                                // но кнопки не нажимаются, так как использовали div 
                                // => используем компонент NavLink
                                <NavLink
                                    to={link.path} //это куда нам нужно снавигировать
                                    key={link.path}
                                    className={styles.navLinkButton}
                                >
                                    {link.title}
                                </NavLink>
                            ))}

                        </div>
                        <div>
                            <ThemeSwitcher />
                            <Button
                                type={ButtonTypes.Secondary}
                                title={isLoggedIn ? "Log Out" : "Sign In"}
                                // onClick={onLoginButtonClick}
                                onClick={isLoggedIn ? onLogout : onLoginButtonClick}
                                className={styles.authButton}
                            />
                        </div>
                    </div>
                )
            }
        </div >
    );
};


// step 2
export default Header;