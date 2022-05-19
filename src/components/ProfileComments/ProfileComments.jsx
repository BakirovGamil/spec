import Comment from "./Comment";
import "./ProfileComments.css";

function ProfileComments() {
    return (
        <div className="profile-comments">
            <div className="profile-comments__title title">Отзывы</div>
            <div className="profile-comments__content">
                <Comment/>
                <Comment/>
                <Comment/>
                <Comment/>
            </div>
        </div>
    );
}

export default ProfileComments;