import cls from "./Button.module.css"

function Button({children, className, isBackground = false, ...props}) {
    const classNameCat = className ? [cls.btn, className].join(" ") : cls.btn;
    
    return (
        <button  className={classNameCat} {...props} data-isbackground={isBackground}>
            {children}
        </button>
    );
}

export default Button;