import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CommentService from "../../API/CommentService";
import ImageService from "../../API/ImageService";
import SpecialistService from "../../API/SpecialistService";
import useFetching from "../../hooks/useFetching";
import Comment from "../Comment/Comment";
import Loader from "../UI/Loader/Loader";
import "./LastComments.css";

function LastComments() {
    const [comments, setComments] = useState([]);
    const navigator = useNavigate();
    const [isLoading, fetch, error] = useFetching(async () => {
        const resComments = await CommentService.getLastComments(6);
        const resCommentsBody = await resComments.json();
        
        if(resComments.ok) {
            for(let comment of resCommentsBody) {
                const resSpec = await SpecialistService.getById(comment.specialistId);
                const resSpecBody = await resSpec.json();

                const resAvatar = await ImageService.getAvatarByUsertId(resSpecBody.user.id);
                const resAvatarBody = await resAvatar.json();

                const resStats = await CommentService.getCommentStatsOfSpecialist(comment.specialistId);
                const resStatsBody = await resStats.json();

                comment.specialist = resSpecBody;
                comment.specialist.avatar = resAvatarBody[0];
                comment.specialist.stats = resStatsBody;
            }
            
            console.log(resCommentsBody);
            setComments(resCommentsBody);
        } else {
            toast.error("Что-то пошло не так при загрузке последних отзывов!");
        }
    });

    useEffect(() => {
        fetch();
    }, []);

    return (
        <div className="lastComments">
            {isLoading && <Loader/>}
            <div className="container">
                <div className="aboutService__title title">
                    Последние отзывы
                </div>
                <div className="lastComments__body">
                    {comments.map(comment => {
                        return (
                            <div key={comment.id} className="LastComments__item">
                                <div className="LastComments__specialist" onClick={(e) => navigator(`/profile/${comment.specialistId}`)}>
                                    <div className="LastComments__avatar">
                                        <img src={`http://localhost:3000/${comment.specialist.avatar.filename}`} alt="" />
                                    </div>
                                    <div className="LastComments__info">
                                        <div className="LastComments__name">
                                            {`${comment.specialist.user.lastName} ${comment.specialist.user.firstName}`}
                                        </div>
                                        <div className="profile__rating">
                                            <i className="star profile__star"></i>
                                            <span className="profile__rate">
                                                { comment.specialist.stats.averageRating || "–"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <Comment isAvatar={false} className="LastComments__comment" comment={comment}/>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default LastComments;