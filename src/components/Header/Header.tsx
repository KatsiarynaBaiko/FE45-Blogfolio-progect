import React, { useMemo, useState } from "react"
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
import { useSelector } from "react-redux";
import { AuthSelectors } from "src/redux/reducers/authSlice";


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
    const onLoginButtonClick = () => {
        navigate(RoutesList.SignIn);
    };
    const navigate = useNavigate();

    // передаем переменную в navLinks
    // и если она true - то доступно 
    // имя пользователя (прописываем ее в userName) и кнопка Add Post
    // const isLoggedIn = true;
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
    const [isSearch, setSearch] = useState(false);
    const handleSearchOpened = () => {
        setSearch(!isSearch);
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

                    <Button
                        type={ButtonTypes.Primary}
                        title={<UserIcon />}
                        onClick={onLoginButtonClick}
                        className={styles.userButton}
                    />
                    {isLoggedIn ? <Username username={'Katsiaryna'} /> : <Button
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
                                onClick={onLoginButtonClick}
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