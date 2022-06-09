import { useEffect } from "react";
import cls from "./Modal.module.css";

function Modal({isVisible, title, setIsVisible, children}) {
    useEffect(() => {
        const body = document.body;
        const header = document.querySelector("header.header");

        const div = document.createElement("div");
        div.style.overflowY = "scroll";
        body.append(div);
        const scrollSize = div.offsetWidth - div.clientWidth;
        div.remove();

        if(isVisible) {
            document.documentElement.style.overflowY = "hidden";
            body.style.overflow = "hidden";

            body.style.paddingRight = scrollSize + "px";
            header.style.paddingRight = scrollSize + "px";
            document.ontouchmove = function (e) {  // Запрет скролла для телефонов
                e.preventDefault();
            }
        } else {
            body.style.overflow = "auto";
            document.documentElement.style.overflowY= "scroll";

            body.style.paddingRight = 0;
            header.style.paddingRight = 0;
            document.ontouchmove = function (e) {
                return true;
            }
        }
    }, [isVisible]);


    return (
        <div className={cls.modal} style={isVisible ? {top: 0} : {top: "-200%"}} onMouseDown={() => setIsVisible(false)}>
            <div className={cls.content} style={isVisible ? {transform: "scale(1)"} : {transform: "scale(0.5)"}} onMouseDown={e => e.stopPropagation()}>
                <div className={cls.title}>
                    {title}
                    <button className={cls.closeBtn} onClick={() => setIsVisible(false)}>
                        <i className="gg-close"></i>
                    </button>
                </div>
               <div>
                   {children}
               </div>
            </div>
        </div>
    );
}

export default Modal;