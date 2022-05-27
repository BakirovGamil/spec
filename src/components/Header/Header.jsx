import "./Header.css"
import Logo from '../Logo';
import ThemeSwitcher from "../UI/ThemeSwitcher/ThemeSwitcher";
import { createRef, useEffect } from "react";
import DropDown from "../UI/DropDown/DropDown";
import { Link } from "react-router-dom";

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
            if(currentScroll >= getFullHeightOfDocument() - document.documentElement.clientHeight - 100) return;  //Если вышли за документ (На мобильных устройствах можно)
            
            if(currentScroll <= 100) return; //Чтобы алгоритм скрытия работал после 40 пикселей

            const checkIsHidden = () => header.classList.contains("header_hidden");

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


    return (<>
        <div ref={fakeHeaderRef} className="fake-header"></div>
        <header ref={headerRef} className='header'>
            <div className='container'>
                <nav className='nav'>
                    <ul className='nav__list'>
                        <li className='nav__item'><Logo className='nav__action'/></li>
                        <li className='nav__item'>
                            <ThemeSwitcher className='nav__theme-switcher'/>
                            <DropDown placeholder={<i className="gg-enter"></i>} classNameButton="nav__action" classNameContent="nav__dropdown">
                                <Link to="/login">Войти</Link>
                                <Link to="/authorization">Регистрация</Link>
                            </DropDown>  
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    </>);
}

export default Header;