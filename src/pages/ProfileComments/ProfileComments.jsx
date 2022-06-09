import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentService from "../../API/CommentService";
import SpecialistService from "../../API/SpecialistService";
import CommentsStatistics from "../../components/CommentsStatistics/CommentsStatistics";
import Header from "../../components/Header/Header";
import Button from "../../components/UI/Button/Button";
import useFetching from "../../hooks/useFetching";
import Comments from "../../components/ProfileComments/ProfileComments";
import "./ProfileComments.css";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import ImageService from "../../API/ImageService";
import useFilterSortComments from "../../hooks/useFilterSortComments";

function ProfileComments() {
    const {specialistId} = useParams();
    const navigator = useNavigate();
    const [specialist, setSpecialist] = useState(null);
    const [comments, setComments] = useState(null);
    const [commentsStats, setCommentsStats] = useState(null);
    const [filter, setFilter] = useState({
        5: false,
        4: false,
        3: false,
        2: false,
        1: false
    });
    const [sort, setSort] = useState({field: "date", order: 0})

    const sortedAndFilteredComments = useFilterSortComments(comments, filter, sort);

    const [isLoading, fetch, error] = useFetching(async () => {
        const resSpecialist = await SpecialistService.getById(specialistId);
        const resSpecialistBody = await resSpecialist.json();
        if(!resSpecialist.ok) return console.log(resSpecialistBody.message);
        
        const resComments = await CommentService.getCommentsBySepcialistId(specialistId, 0);
        const resCommentsBody = await resComments.json();
        if(!resComments.ok)  return console.log(resCommentsBody.message);

        const resAvatar = await ImageService.getAvatarByUsertId(resSpecialistBody.user.id);
        const resAvatarBody = await resAvatar.json();
        if(!resAvatar.ok)  return console.log(resAvatarBody.message);

        const resCommentsStats = await CommentService.getCommentStatsOfSpecialist(specialistId);
        const resCommentsStatsBody = await resCommentsStats.json();
        if(!resComments.ok)  return console.log(resCommentsBody.message);

        console.log(resSpecialistBody);
        console.log(resCommentsBody);

        setSpecialist({
            ...resSpecialistBody,
            avatar: resAvatarBody[0],
        });
        setComments(resCommentsBody);
        setCommentsStats(resCommentsStatsBody);
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
                        
                        <ProfileInfo className="comments__profile" commentsStats={commentsStats} specialist={specialist} setSpecialist={setSpecialist} comments={comments}/>

                        <div className="comments__body">
                            <div className="comments__leftCol">
                                <Comments comments={sortedAndFilteredComments} commentsStats={commentsStats} isSort sort={sort} setSort={setSort}/>
                            </div>
                            <div className="comments__rightCol">
                                <CommentsStatistics className="comments__statistics" filter={filter} setFilter={setFilter} comments={comments}/>
                            </div>              
                        </div>
                    </div>
                </div>
            }
        </main>
    </>);
}

export default ProfileComments;