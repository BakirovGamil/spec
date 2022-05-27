import Comment from "../Comment/Comment";
import Button from "../UI/Button/Button";
import "./ProfileComments.css";

function ProfileComments({className}) {
    const classNameFull = className ? ["profile-comments", className].join(" ") : "profile-comments";

    return (
        <div className={classNameFull}>
            <div className="profile-comments__title title">Отзывы</div>
            <div className="profile-comments__content">
                <Comment/>
                <Comment/>
                <Comment/>
                <Comment/>
            </div>
            <div className="profile-comments__action">
                <Button className="profile-comments__button">Посмотреть все отзывы</Button> 
            </div>
        </div>
    );
}

export default ProfileComments;