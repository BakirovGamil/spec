import { useId } from "react";
import "./Rating.css";

function Rating({isDisabled = false, value, className, name}) {
    const fullClassName = className ? ["rating", className].join(" ") : "rating";

    return (
        <div className={fullClassName}>
            <input disabled={isDisabled} type="radio" name={name} id="star-5" value="5" defaultChecked={value === 5}/>
            <label data-isdisabled={isDisabled} htmlFor="star-5">
                <i className="star"></i>
            </label>
            
            <input disabled={isDisabled} type="radio" name={name} id="star-4" value="4" defaultChecked={value === 4}/>
            <label data-isdisabled={isDisabled} htmlFor="star-4">
                <i className="star"></i>
            </label>
        
            <input disabled={isDisabled} type="radio" name={name} id="star-3" value="3" defaultChecked={value === 3}/>
            <label data-isdisabled={isDisabled} htmlFor="star-3">
            <i className="star"></i>
            </label>

            <input disabled={isDisabled} type="radio" name={name} id="star-2" value="2" defaultChecked={value === 2}/>
            <label data-isdisabled={isDisabled} htmlFor="star-2">
                <i className="star"></i>
            </label>

            <input disabled={isDisabled}  type="radio" name={name} id="star-1" value="1" defaultChecked={value === 1}/>
            <label data-isdisabled={isDisabled} htmlFor="star-1">
                <i className="star"></i>
            </label>
        </div>
    );
}

export default Rating;