import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CommentService from "../../API/CommentService";
import ImageService from "../../API/ImageService";
import SubscriptionService from "../../API/SubscriptionService";
import useFetching from "../../hooks/useFetching";
import Button from "../UI/Button/Button";
import Loader from "../UI/Loader/Loader";
import "./LinkedSpecialists.css";

function LinkedSpecialists({subsId}) {
    const [specialists, setSpecialists] = useState([]);
    const navigator = useNavigate();
    const [isLoading, fetch, error] = useFetching(async() => {
        const resSpec = await SubscriptionService.getSpecialistsBySubscriptionId(subsId);
        const resSpecBody = await resSpec.json();

        if(!resSpec.ok) return toast.error(resSpecBody.message);

        for(let spec of resSpecBody) {
            const resAvatar = await ImageService.getAvatarByUsertId(spec.user.id);
            const resAvatarBody = await resAvatar.json();

            const resStats = await CommentService.getCommentStatsOfSpecialist(spec.id);
            const resStatsBody = await resStats.json();

            spec.avatar = resAvatarBody[0];
            spec.stats = resStatsBody;
        }

        setSpecialists(resSpecBody);
    });

    useEffect(() => {
        fetch();
    }, []);

    async function handleUnLink(specId) {
        const res = await SubscriptionService.deleteSpecialistFromSubscription(specId, subsId);
        const resBody = await res.json();

        if(res.ok) {
            toast.success("Специалист отвязан");
        } else {
            toast.error(resBody.message);
        }
    }

    async function handleLink(specId) {
        const res = await SubscriptionService.addSpecialisToSubs(specId, subsId);
        const resBody = await res.json();

        if(res.ok) {
            toast.success("Специалист привязан");
        } else {
            toast.error(resBody.message);
        }
    }

    return (
        <div className="LinkedSpecialists">
            {isLoading && <Loader/>}
            {!isLoading &&
                specialists.map(specialist => {
                    return (
                        <div className="LinkedSpecialists__spec">
                            <div className="LastComments__specialist" onClick={(e) => navigator(`/profile/${specialist.id}`)}>
                                <div className="LastComments__avatar">
                                    <img src={`http://localhost:3000/${specialist.avatar.filename}`} alt="" />
                                </div>
                                <div className="LastComments__info">
                                    <div className="LastComments__name">
                                        {`${specialist.user.lastName} ${specialist.user.firstName}`}
                                    </div>
                                    <div className="profile__rating">
                                        <i className="star profile__star"></i>
                                        <span className="profile__rate">
                                            { specialist.stats.averageRating || "–"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="LinkedSpecialists__actions">
                                <Button className="LinkedSpecialists__btn" isBackground onClick={e => handleUnLink(specialist.id)}>
                                    Отвязать
                                </Button>
                                <Button className="LinkedSpecialists__btn" isBackground onClick={e => handleLink(specialist.id)}>
                                    Привязать
                                </Button>
                            </div>
                        </div>
                    )
                })
            }
            {
                specialists.length === 0 && <div className="LinkedSpecialist__notify">Нет привязанных специалистов!</div>
            }
        </div>
    );
}

export default LinkedSpecialists;