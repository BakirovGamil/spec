import { useState } from "react";
import cls from './RadioButton.module.css'

function RadioButton({name, className, onClick,...props}) {
    const id = useState(Math.random());
    const classNameCat = className ? [cls.input, className].join(" ") : cls.input;
    
    return (
        <div className={cls.container }>
            <input id={id[0]} name={name} type="radio" className={classNameCat}  {...props}/>
            <label htmlFor={id[0]} name={name} className={cls.label} onClick={onClick}/>
        </div>
    );
}

export default RadioButton;