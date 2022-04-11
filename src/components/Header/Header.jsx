import "./header.css"
import Logo from '../Logo';
import ThemeSwitcher from "../UI/ThemeSwitcher/ThemeSwitcher";
import { createRef, useEffect } from "react";

function Header() {
    const headerRef = createRef();
    const fakeHeaderRef = createRef();

    useEffect(() => {
        function changeHeaderDisplay() {
            const fakeHeader = fakeHeaderRef.current;
            const fakeHeaderRect = fakeHeader.getBoundingClientRect();

            if(fakeHeaderRect.top <= -120) {
                headerRef.current.classList.add("drop");
            } else if(fakeHeaderRect.top >= -40){
                headerRef.current.classList.remove("drop");
            }
        }

        changeHeaderDisplay(); //Чтобы после обновления страницы сразу был там где надо
        document.addEventListener("scroll", changeHeaderDisplay);
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
                            <button className='nav__action'>Войти</button>  
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    </>);
}

export default Header;