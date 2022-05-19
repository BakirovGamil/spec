import "./header.css"
import Logo from '../Logo';
import ThemeSwitcher from "../UI/ThemeSwitcher/ThemeSwitcher";
import { createRef, useEffect } from "react";
import DropDown from "../UI/DropDown/DropDown";
import { Link } from "react-router-dom";

function Header() {
    const headerRef = createRef();
    const fakeHeaderRef = createRef();

    useEffect(() => {
        const fakeHeader = fakeHeaderRef.current;
        const header = headerRef.current;

        function changeHeaderBackground() {
            const fakeHeaderRect = fakeHeader.getBoundingClientRect();

            if(fakeHeaderRect.top <= -40) {
                header.classList.add("drop");
            } else if(fakeHeaderRect.top >= -40){
                header.classList.remove("drop");
            }
        }

        let prevScroll = window.pageYOffset;
        function changeHeaderVisibility() {
            const currentScroll = window.pageYOffset;

            if(currentScroll > prevScroll) {
                header.classList.add("header_hidden");
            } else {
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