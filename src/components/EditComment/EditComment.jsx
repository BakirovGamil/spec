import { useState } from "react";
import CommentService from "../../API/CommentService";
import Comment from "../Comment/Comment";
import Rating from "../Rating/Rating";
import Button from "../UI/Button/Button";

function EditComment({currentComment, setCurrentComment, isEdit, setIsEdit}) {
    const [editComment, setEditComment] = useState({
        specialistId: currentComment.specialistId, 
        services: ["Замена дверей"],
        rating: 0,
        data: ""
    });

    async function handleSaveEdit() {
        const resComment = await CommentService.updateComment(editComment);
        const resCommentBody = await resComment.json();

        if(resComment.ok) {
            console.log(resCommentBody);
            setCurrentComment(resCommentBody);
            setIsEdit(false);
        } else {
            console.log(resCommentBody.message);
        }
    }

    async function handleIsEdit() {
        setIsEdit(true);
        setEditComment({
            specialistId: currentComment.specialistId,
            services: currentComment.services,
            rating: currentComment.rating,
            data: currentComment.data
        });
    }

    function handleChangeDataEditComment(e) {
        setEditComment({...editComment, data: e.target.value});
    }

    function handleChangeRatingEdit() {
        setTimeout(() => {
            const rating = +document.querySelector('input[name="ratingEdit"]:checked').value;
            setEditComment({...editComment, rating});
        }, 0);
    }

    async function handleDelete() {
        const resComment = await CommentService.deleteCommentBySpecialistId(currentComment.specialistId);
        const resCommentBody = await resComment.json();

        if(resComment.ok) {
            setCurrentComment(null);
            console.log(resCommentBody.message);
        } else {
            console.log(resCommentBody.message);
        }
    }

    return (
        <div className="addComment__existCommentContainer">
            <div className="addComment__existComment-text">Ваш отзыв: </div>
            { isEdit 
                ?
                <>
                    <div className="addComment__ratingContainer">
                        <span className="addComment__text">Общая оценка : </span>
                        <Rating className="addComment__rating" name="ratingEdit" onClick={handleChangeRatingEdit} value={editComment.rating}/>
                    </div>
                    <div className="addComment__send">
                        <textarea placeholder="Очень пунктуальный специалист..." className="addComment__textArea" value={editComment.data} onChange={handleChangeDataEditComment}></textarea>
                        <Button onClick={handleSaveEdit} isBackground>
                            Сохранить изменения
                        </Button>
                    </div>
                </>
                :
                    <Comment className="addComment__existComment" comment={currentComment}/>
            }

            <div className="addComment__actions">
                {   isEdit  
                    ?
                        <Button className="addComment__editBtn" isBackground onClick={() => setIsEdit(false)}>
                            <i className="gg-close"></i>
                        </Button>
                    : <>
                        <Button className="addComment__editBtn" isBackground onClick={handleDelete}>
                            <i class="gg-trash"></i>
                        </Button>
                        <Button className="addComment__editBtn" isBackground onClick={handleIsEdit}>
                            <i className="gg-edit-markup"></i> 
                        </Button>
                    </>
                }
            </div>
        </div>
    );
}

export default EditComment;