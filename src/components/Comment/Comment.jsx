import Rating from "../Rating/Rating";
import "./Comment.css";

function Comment() {
    return (
        <div className="comment">
            <div className="comment__left-column">
            <div className="comment__avatar">Г</div>
                <Rating className="comment__rating" isDisabled value={3}/>
                <div className="comment__date">
                    {(new Date()).toLocaleDateString()}
                </div>
            </div>
            <div className="comment__right-column">
                <div className="comment__author">
                    Генадий Пупкин
                </div>
                <div className="comment__services">
                    Ремонт почтовых ящиков
                </div>
                <div className="comment__info">
                    Екатерина пунктуальный и хороший мастер! Большое спасибо за работу!
                </div>
            </div>
        </div>
    );
}

export default Comment;