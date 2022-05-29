import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentService from "../../API/CommentService";
import SpecialistService from "../../API/SpecialistService";
import Comment from "../../components/Comment/Comment";
import Header from "../../components/Header/Header";
import Button from "../../components/UI/Button/Button";
import useFetching from "../../hooks/useFetching";
import "./ProfileComments.css";

function ProfileComments() {
    const {specialistId} = useParams();
    const navigator = useNavigate();
    const [specialist, setSpecialist] = useState(null);
    const [comments, setComments] = useState(null);

    const [isLoading, fetch, error] = useFetching(async () => {
        const resSpecialist = await SpecialistService.getById(specialistId);
        const resSpecialistBody = await resSpecialist.json();
        if(!resSpecialist.ok) return console.log(resSpecialistBody.message);
        
        const resComments = await CommentService.getCommentsBySepcialistId(specialistId, 4);
        const resCommentsBody = await resComments.json();
        if(!resComments.ok)  return console.log(resCommentsBody.message);

        console.log(resSpecialistBody);
        console.log(resCommentsBody);

        setSpecialist(resSpecialistBody);
        setComments(resCommentsBody);
    });

    useEffect(() => {
        fetch();
    }, []);


    return (<>
        <Header/>
        <main>
            { specialist && comments &&
                <div className="comments">
                    <div className="container">
                        <Button className={"photos__button"} onClick={() => navigator(`/profile/${specialistId}`)}>
                            <i className="gg-chevron-left"></i>
                            Вернуться назад
                        </Button>
                        <div className="comments__title title">
                            <span className="title__text">Отзывы {`${specialist.user.lastName} ${specialist.user.firstName} ${specialist.user.middleName}`}</span>
                        </div>
                        <div className="comments__body">
                            <Comment/>
                            <Comment/>
                            <Comment/>
                            <Comment/>
                        </div>
                    </div>
                </div>
            }
        </main>
    </>);
}

export default ProfileComments;