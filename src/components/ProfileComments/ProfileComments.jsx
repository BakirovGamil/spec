import { useNavigate, useParams } from "react-router-dom";
import AddComment from "../AddComment/AddComment";
import Comment from "../Comment/Comment";
import Button from "../UI/Button/Button";
import "./ProfileComments.css";

function ProfileComments({className, comments, isButtonVisible =  false, commentsStats}) {
    const navigator = useNavigate();
    const {specialistId} = useParams();
    const classNameFull = className ? ["profile-comments", className].join(" ") : "profile-comments";

    return (
        <div className={classNameFull}>
            <div className="profile-comments__title title">Отзывы {commentsStats.numberOfComments}</div>
            <AddComment className="profile-comments__addComment" specialistId={specialistId}/>
            <div className="profile-comments__content">
                {
                    comments.map(comment => <Comment key={comment.id} comment={comment}/>)
                }
            </div>
            {
                isButtonVisible && 
                <div className="profile-comments__action">
                    <Button className="profile-comments__button" onClick={(e) => navigator(`/profile/comments/${specialistId}`)}>Посмотреть все отзывы</Button> 
                </div>
            }
        </div>
    );
}

export default ProfileComments;