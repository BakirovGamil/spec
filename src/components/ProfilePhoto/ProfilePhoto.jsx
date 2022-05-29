import { useNavigate } from "react-router-dom";
import Button from "../UI/Button/Button";
import "./ProfilePhoto.css";

function ProfilePhoto({className, images, specialistId}) {
    const navigator = useNavigate();
    const classNameFull = className ? ["ProfilePhoto", className].join(" ") : "ProfilePhoto";

    return (<div className={classNameFull} onClick={(e) => navigator(`/profile/photos/${specialistId}`)}>
        <div className="ProfilePhoto__title title">
                Фотографии
        </div>
        <div className="ProfilePhoto__body">
            {
                images.map(image => {
                    return (
                        <div key={image.id} className="ProfilePhoto__img">
                            <img src={`http://localhost:3000/${image.filename}`} alt={"Не удалось загрузить фотку"}/>
                        </div>
                    );
                })
            }
        </div>
        <div className="PrfoilePhoto_action">
            <Button className="PrfoilePhoto__button" >Посмотреть все фотографии</Button> 
        </div>
    </div>);
}

export default ProfilePhoto;