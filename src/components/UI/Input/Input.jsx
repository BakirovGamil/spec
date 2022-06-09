import { useId } from 'react'
import cls from "./Input.module.css";

const invalidStyle = { 'backgroundColor': 'rgb(200, 0, 0)'};

function Input({className,  placeholder, isInvalid , value, isBackground = false, ...props}) {
    const fullClassName = className ? [className, cls.container].join(" ") : cls.container;
    const id = useId(); 

    return (
        <div className={fullClassName}>
            <input className={ cls.input} {...props} id={id} value={value} style={isBackground ? {backgroundColor: "var(--c-bg-2"} : {}} placeholder=" "/>
            <label htmlFor={id} className={ cls.label }>{placeholder}</label>
            <div className={cls.line} style={ isInvalid && value.length ? invalidStyle : {}}></div>
        </div>  
    );
}

export default Input;