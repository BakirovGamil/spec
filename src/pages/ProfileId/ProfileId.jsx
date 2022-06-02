import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetching from "../../hooks/useFetching";
import Header from "../../components/Header/Header";
import ProfileComments from "../../components/ProfileComments/ProfileComments";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import ProfilePhoto from "../../components/ProfilePhoto/ProfilePhoto";
import ProfileServices from "../../components/ProfileServices/ProfileServices";
import "./ProfileId.css"
import SpecialistService from "../../API/SpecialistService";
import ServiceService from "../../API/ServiceService";
import ImageService from "../../API/ImageService";
import CommentService from "../../API/CommentService";

function Profile() {
    const {specialistId} = useParams();
    const [specialist, setSpecialist] = useState(null);
    const [comments, setComments] = useState(null);
    const [commentsStats, setCommentsStats] = useState(null);

    // const navigator = useNavigate();
    const [isSpecialistLoading, fetchSpecialist, errorSpecialist] = useFetching(async () => {
        const resSpecialist = await SpecialistService.getById(specialistId);
        const resSpecialistBody = await resSpecialist.json();
        if(!resSpecialist.ok) return console.log(resSpecialistBody.message);

        const resServices = await ServiceService.getBySpecialistId(specialistId);
        const resServicesBody = await resServices.json();
        if(!resServices.ok) return console.log(resServicesBody.message);
        
        const resAvatar = await ImageService.getAvatarByUsertId(resSpecialistBody.user.id);
        const resAvatarBody = await resAvatar.json();
        if(!resAvatar.ok)  return console.log(resAvatarBody.message);

        const resIamges = await ImageService.getGalleryByUsertId(resSpecialistBody.user.id, 4);
        const resIamgesBody = await resIamges.json();
        if(!resIamges.ok)  return console.log(resIamgesBody.message);
        
        const resComments = await CommentService.getCommentsBySepcialistId(specialistId, 4);
        const resCommentsBody = await resComments.json();
        if(!resComments.ok)  return console.log(resCommentsBody.message);

        const resCommentsStats = await CommentService.getCommentStatsOfSpecialist(specialistId);
        const resCommentsStatsBody = await resCommentsStats.json();
        if(!resComments.ok)  return console.log(resCommentsBody.message);

        console.log(resSpecialistBody);
        console.log(resServicesBody);
        console.log(resAvatarBody);
        console.log(resIamgesBody);
        console.log(resCommentsBody);

        setSpecialist({
            ...resSpecialistBody,
            avatar: resAvatarBody[0],
            services: resServicesBody,
            images: resIamgesBody,
        });

        setComments(resCommentsBody);
        setCommentsStats(resCommentsStatsBody);
    });

    useEffect(() => {
        fetchSpecialist();
    }, []);

    return (<>
        <Header/>
        <main>
            {   specialist &&
                <div className="profile">
                    <div className="container">
                        
                        <div className="profile__body">
                            <div className="profile__actions_fake"></div>
                            <div className="profile__actions">
                                <a className="profile__button" href="#profile">О специалисте</a>
                                { !!specialist.images.length && <a className="profile__button" href="#photo">Фото</a>}
                                { !!specialist.services.length  && <a className="profile__button" href="#services">Услуги</a>}
                                <a className="profile__button" href="#comments">Отзывы</a>
                            </div>
                        
                            <div className="profile__content">
                                <div id="profile"></div>
                                <ProfileInfo specialist={specialist} comments={comments} commentsStats={commentsStats} className="profile-section"/>

                                {
                                    !!specialist.images.length && <>
                                        <div id="photo"></div>
                                        <ProfilePhoto images={specialist.images} specialistId={specialistId} className="profile-section"/>
                                    </>
                                }

                                {
                                    !!specialist.services.length  &&<>
                                        <div id="services"></div>
                                        <ProfileServices services={specialist.services} className="profile-section"/>
                                    </>
                                }
                                
                                <div id="comments"></div>  
                                <ProfileComments comments={comments} commentsStats={commentsStats} className="profile-section" isButtonVisible/>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </main>
    </>);
}

export default Profile;