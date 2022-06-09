import { useEffect, useRef } from "react";
import cls from "./DropDown.module.css";
import Button from "../Button/Button";

function DropDown({placeholder, children, classNameButton, classNameContent}) {
    const refContent = useRef();
    const classNameButtonFull = classNameButton ? [cls.dropdown__btn, classNameButton].join(" ") : cls.dropdown__btn;
    const classNameContentFull = classNameContent ? [cls.dropdown__content, classNameContent].join(" ") : cls.dropdown__content;
    useEffect(() => {
        function handleBlur(e) {
            refContent.current.classList.remove(cls.show);
        }

        document.addEventListener("click", handleBlur);

        return () => document.removeEventListener("click", handleBlur);
    }, []);

    function handleClick(e) {
        refContent.current.classList.toggle(cls.show);
    }

    return (
        <div className={cls.dropdown} onClick={(e) => e.stopPropagation()}>
            <Button className={classNameButtonFull} onClick={handleClick}>
                {placeholder}
            </Button>
            <div className={classNameContentFull} ref={refContent}>
                {children}
            </div>
        </div>
    );
}

export default DropDown;