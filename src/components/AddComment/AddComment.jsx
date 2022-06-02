import { useEffect, useState } from "react";
import CommentService from "../../API/CommentService";
import useAuthUser from "../../hooks/useAuthUser";
import useFetching from "../../hooks/useFetching";
import AuthorizationModal from "../AuthorizationModal/AuthorizationModal";
import EditComment from "../EditComment/EditComment";
import Rating from "../Rating/Rating";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import Modal from "../UI/Modal/Modal";
import "./AddComment.css";

// const initComment = {
//     "id": "1654096034204",
//     "user": {
//         "id": "1654096028579",
//         "lastName": "Бакиров",
//         "firstName": "Гамил",
//         "middleName": "Марифатович",
//         "phoneNumber": "+73123301211",
//         "role": "user",
//         "date": "Wed Jun 01 2022"
//     },
//     "specialistId": "1653787171994",
//     "services": [
//         "Замена дверей"
//     ],
//     "rating": 5,
//     "data": "Очень хороший мастер! Сделал все очень очень круто!4",
//     "date": "Wed Jun 01 2022"
// }

function AddComment({specialistId, className}) {
    const classNameFull = className ? ["addComment", className].join(" ") : "addComment";

    const [authUser, setAuthUser] = useAuthUser();
    const [isVisibleAuthorization, setIsVisibleAuthorization] = useState(false);
    const [currentComment, setCurrentComment] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [comment, setComment] = useState({
        specialistId: specialistId, 
        services: ["Замена дверей"],
        rating: 0,
        data: ""
    });


    const [isLoadingCurrentComment, fetchCurrentComment, errorCurrentComment] = useFetching(async () => {
        const resCurrentComment = await CommentService.getCommentForUser(specialistId);
        const resCurrentCommentBody = await resCurrentComment.json();

        if(resCurrentComment.ok) {
            setCurrentComment(resCurrentCommentBody);
            console.log(currentComment)
        } else {
            setCurrentComment(null);
            console.log(resCurrentCommentBody.message);
        }
    });

    useEffect(() => {
        fetchCurrentComment();
    }, [authUser]);

    function handleChangeData(e) {
        setComment({...comment, data: e.target.value});
    }

    function handleChangeRating() {
        setTimeout(() => {
            const rating = +document.querySelector('input[name="rating"]:checked').value;
            setComment({...comment, rating});
        }, 0);
    }

    async function handleSend() {
        if(!authUser) return setIsVisibleAuthorization(true);

        const resComment = await CommentService.addComment(comment);
        const resCommentBody = await resComment.json();

        if(resComment.ok) {
            console.log(resCommentBody);
            setCurrentComment(resCommentBody);
        } else {
            console.log(resCommentBody.message);
        }
    }

    return (
        <div className={classNameFull}>
            {
                !currentComment && <>
                <div className="addComment__ratingContainer">
                    <span className="addComment__text">Общая оценка : </span>
                    <Rating className="addComment__rating" name="rating" onClick={handleChangeRating} value={comment.rating}/>
                </div>
                <div className="addComment__send">
                    <textarea placeholder="Очень пунктуальный специалист..." className="addComment__textArea" value={comment.data} onChange={handleChangeData}></textarea>
                    <Button onClick={handleSend} isBackground>
                        Оставить отзыв
                    </Button>
                </div>
                </>
            }
            {
                !!currentComment && 
                <EditComment currentComment={currentComment} setCurrentComment={setCurrentComment} isEdit={isEdit} setIsEdit={setIsEdit}/>
            }
            <AuthorizationModal  isVisible={isVisibleAuthorization} setIsVisible={setIsVisibleAuthorization}/>
        </div>
    );
}

export default AddComment;