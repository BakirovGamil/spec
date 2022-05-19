import { useId } from "react";
import cls from './RadioButton.module.css'

function RadioButton({name, className, onClick,...props}) {
    const id = useId();
    const classNameCat = className ? [cls.input, className].join(" ") : cls.input;
    
    return (
        <div className={cls.container }>
            <input id={id} name={name} type="radio" className={classNameCat}  {...props}/>
            <label htmlFor={id} name={name} className={cls.label} onClick={onClick}/>
        </div>
    );
}

export default RadioButton;