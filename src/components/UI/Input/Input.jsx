import { useId } from 'react'
import cls from "./Input.module.css";

const invalidStyle = { 'backgroundColor': 'rgb(200, 0, 0)'};

function Input({className,  placeholder, isInvalid , value, ...props}) {
    const fullClassName = className ? [className, cls.container].join(" ") : cls.container;
    const id = useId(); 

    return (
        <div className={fullClassName}>
            <input className={ cls.input} {...props} id={id} value={value} placeholder=" "/>
            <label htmlFor={id} className={ cls.label }>{placeholder}</label>
            <div className={cls.line} style={ isInvalid && value.length ? invalidStyle : {}}></div>
        </div>  
    );
}

export default Input;