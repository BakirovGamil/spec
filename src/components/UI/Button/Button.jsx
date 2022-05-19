import cls from "./Button.module.css"

function Button({children, className, ...props}) {
    const classNameCat = className ? [cls.btn, className].join(" ") : cls.btn;
    
    return (
        <button  className={classNameCat} {...props}>
            {children}
        </button>
    );
}

export default Button;