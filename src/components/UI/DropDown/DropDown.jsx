import { useRef } from "react";
import cls from "./DropDown.module.css";
import Button from "../Button/Button";

function DropDown({placeholder, children, classNameButton, classNameContent}) {
    const refContent = useRef();
    const classNameButtonFull = classNameButton ? [cls.dropdown__btn, classNameButton].join(" ") : cls.dropdown__btn;
    const classNameContentFull = classNameContent ? [cls.dropdown__content, classNameContent].join(" ") : cls.dropdown__content;
    function handleClick(e) {
        refContent.current.classList.toggle(cls.show);
        
    }

    function handleBlur(e) {
        refContent.current.classList.remove(cls.show);
    }

    return (
        <div className={cls.dropdown}>
            <Button className={classNameButtonFull} onClick={handleClick} onBlur={handleBlur}>
                {placeholder}
            </Button>
            <div className={classNameContentFull} ref={refContent}>
                {children}
            </div>
        </div>
    );
}

export default DropDown;