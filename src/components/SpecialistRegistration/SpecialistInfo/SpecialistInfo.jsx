import { useState } from "react";
import ImageService from "../../../API/ImageService";
import PhotoUploader from "../../UI/PhotoUploader/PhotoUploader";
import "./SpecialistInfo.css";

function SpecialistInfo({className}) {
    const classNameFull = className ? ["SpecialistInfo", className].join(" ") : "SpecialistInfo";
    const [avatar, setAvatar] = useState(null);

    async function handleOnChange(e) {
        const file = e.target.files[0];
        const image = await ImageService.uploadImage(file, "avatar");
        const imageBody = await image.json();

        if(image.ok) {
            console.log(imageBody);
            setAvatar(imageBody);
        } else {
            console.log(imageBody.message);
        }
       
    }

    return (
        <div className={classNameFull}>
            <div className="SpecialistInfo__img">
                { 
                    avatar &&
                    <img src={`/${avatar.filename}`} alt="Не удалось загрузить фотку"/>
                }
            </div>
            <div className="SpecialistInfo__stat">
                <div className="SpecialistInfo__name">Екатерина Александровна Трофимова</div>
                <div className="SpecialistInfo__upload">
                    <PhotoUploader className={"SpecialistInfo__photoUploader"} placeholder={"Загрузить аватар"} name={"avatar"} onChange={handleOnChange}/>
                </div>
                <div className="SpecialistInfo__upload">
                    <PhotoUploader className={"SpecialistInfo__photoUploader"} placeholder={"Загрузить паспорт"} name={"passport"}/>
                </div>
            </div>
        </div>
    )
}

export default SpecialistInfo;