import "./Header.css"
import Logo from '../Logo';
import ThemeSwitcher from "../UI/ThemeSwitcher/ThemeSwitcher";
import { createRef, useEffect } from "react";
import DropDown from "../UI/DropDown/DropDown";
import { Link } from "react-router-dom";
import useAuthUser from "../../hooks/useAuthUser";
import AuthorizationService from "../../API/AuthorizarizationService";
import useAuthSpecialist from "../../hooks/useAuthSpecialist";
import { toast } from "react-toastify";
import useFavorite from "../../hooks/useFavorite";

function getFullHeightOfDocument() {
    return Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
}

function Header() {
    const headerRef = createRef();
    const fakeHeaderRef = createRef();
    const [authUser, setAuthUser] = useAuthUser();
    const [authSpecialist, setAuthSpecialist] = useAuthSpecialist();
    const [favorites, setFavorites, isVisibleFavorites, setIsVisibleFavorites] = useFavorite();

    useEffect(() => {
        const header = headerRef.current;

        function changeHeaderBackground() {
            const currentScroll = window.pageYOffset;
            const checkIsDropped = () => header.classList.contains("drop");

            if(currentScroll >= 100 && !checkIsDropped()) {
                header.classList.add("drop");
            }

            if(currentScroll < 100 && checkIsDropped()){
                header.classList.remove("drop");
            }
        }

        let prevScroll = window.pageYOffset;
        function changeHeaderVisibility() {
            const currentScroll = window.pageYOffset;
            if(currentScroll >= getFullHeightOfDocument() - document.documentElement.clientHeight - 50) return;  //Если вышли за документ (На мобильных устройствах можно)
            
            const checkIsHidden = () => header.classList.contains("header_hidden");
            if(currentScroll <= 100) {
                if(checkIsHidden())  header.classList.remove("header_hidden");
                return;
            }; //Чтобы алгоритм скрытия работал после 100 пикселей


            if(currentScroll > prevScroll && !checkIsHidden()) {  // При прокрутке вниз
                header.classList.add("header_hidden");
            } 
            
            if(currentScroll < prevScroll  && checkIsHidden()) {  // При прокрутке вверх
                header.classList.remove("header_hidden");
            }

            prevScroll = currentScroll;
        }

        changeHeaderBackground(); //Чтобы после обновления страницы фон изменился

        document.addEventListener("scroll", changeHeaderBackground);
        document.addEventListener("scroll", changeHeaderVisibility);
        
        return () => {
            document.removeEventListener("scroll", changeHeaderBackground);
            document.removeEventListener("scroll", changeHeaderVisibility);
        }
    }, []);

    async function logout(e) {
        e.preventDefault();

        const loader = toast.loading("Выход...");

        const resAuth = await AuthorizationService.logout();

        if(!resAuth.ok) return toast.update(loader, { render: "Что-то пошло не так", type: "error", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});

        setAuthUser(null);
        setAuthSpecialist(null);
        setFavorites([]);

        toast.update(loader, { render: "Вы вышли из аккаунта", type: "success", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});
    }

    return (<>
        <div ref={fakeHeaderRef} className="fake-header"></div>
        <header ref={headerRef} className='header'>
            <div className='container'>
                <nav className='nav'>
                    <ul className='nav__list'>
                        <li className='nav__item'><Logo className='nav__action'/></li>
                        <li className='nav__item'>
                            <ThemeSwitcher className='nav__theme-switcher'/>
                            {
                                !authUser && 
                                <DropDown placeholder={<i className="gg-enter"></i>} classNameButton="nav__action" classNameContent="nav__dropdown">
                                    <Link to="/login">Войти</Link>
                                    <Link to="/authorization">Регистрация</Link>
                                </DropDown>  
                            }
                            {
                                authUser && authUser.role === "user" && 
                                <DropDown placeholder={<i className="gg-menu"></i>} classNameButton="nav__action" classNameContent="nav__dropdown">
                                    <Link to={`/messages/0`}>Сообщения</Link>
                                    <Link to="/subscriptions">Мои подписки</Link>
                                    <a  href="#1" onClick={() => setIsVisibleFavorites(true)}>
                                        Избранные
                                    </a>
                                    <Link to="/specialist/registration">Стать специалистом</Link>
                                    <a  href="#2" onClick={logout}>
                                        Выйти
                                    </a>
                                </DropDown>  
                            }
                            {
                                authUser && authUser.role === "specialist" && 
                                <DropDown placeholder={<i className="gg-menu"></i>} classNameButton="nav__action" classNameContent="nav__dropdown">
                                    <Link to={`/profile/${authSpecialist?.id}`}>Мои профиль</Link>
                                    <Link to={`/messages/0`}>Сообщения</Link>
                                    <Link to="/orders">Заказы</Link>
                                    <Link to="/specialist/gallery">Мои фотографии</Link>
                                    <Link to="/subscriptions">Мои подписки</Link>
                                    <Link to="/specialist/profile">Редактировать</Link>
                                    <a  href="#1" onClick={() => setIsVisibleFavorites(true)}>
                                        Избранные
                                    </a>
                                    <a  href="#2" onClick={logout}>
                                        Выйти
                                    </a>
                                </DropDown>  
                            }
                            {
                                authUser && authUser.role === "admin" && 
                                <DropDown placeholder={<i className="gg-menu"></i>} classNameButton="nav__action" classNameContent="nav__dropdown">
                                    <Link to={`/moderation`}>Модерация</Link>
                                    <Link to={`/messages/0`}>Сообщения</Link>
                                    <a  href="#1" onClick={() => setIsVisibleFavorites(true)}>
                                        Избранные
                                    </a>
                                    <a  href="#2" onClick={logout}>
                                        Выйти
                                    </a>
                                </DropDown>  
                            }
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    </>);
}

export default Header;