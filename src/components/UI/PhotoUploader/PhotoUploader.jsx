import cls from "./PhotoUploader.module.css";
import {useId} from "react";

function PhotoUploader({placeholder, className, name}) {
    const fullClassName = className ? [cls.uploader, className].join(" ") : cls.uploader;
    const id = useId();
    const choosedId = name ?? id;
    const choosedPlaceholder = placeholder ?? "Загрузить фотку";

    return (
        <div className={fullClassName}>
            <label htmlFor={choosedId} className={cls.label}>
                {choosedPlaceholder}
            </label>
            <input type="file" accept="image/png, image/jpeg" className={cls.input} name={choosedId} id={choosedId}/>
        </div>
    )
}

export default PhotoUploader;