import Rating from "../Rating/Rating";
import "./Comment.css";

function Comment({comment, className, avatarStyle, isAvatar = true}) {
    const user = comment.user; 
    const classNameFull = className ? ["comment", className].join(" ") : "comment";

    return (
        <div className={classNameFull}>
            <div className="comment__left-column">
            {isAvatar && <div className="comment__avatar" style={avatarStyle ? avatarStyle : {}}>{user.firstName[0]}</div>}
                <Rating className="comment__rating" isDisabled value={comment.rating}/>
                <div className="comment__date">
                    {new Date(comment.date).toLocaleDateString()}
                </div>
            </div>
            <div className="comment__right-column">
                <div className="comment__author">
                    {`${user.lastName} ${user.firstName}`}
                </div>
                <div className="comment__info">
                    {comment.data}
                </div>
            </div>
        </div>
    );
}

export default Comment;