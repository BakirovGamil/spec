import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SubscriptionService from "../../API/SubscriptionService";
import useFetching from "../../hooks/useFetching";
import Loader from "../UI/Loader/Loader";
import UserSubscription from "../UserSubscription/UserSubscription";

function NotActiveSubscriptions({update}) {
    const [experiedSubs, setExperiedSubs] = useState([]);

    const [isLoadingExp, fetchExp, errorExp] = useFetching(async () => {
        const resSubs = await SubscriptionService.getCurrentExperiedSubs();
        const resSubsBody = await resSubs.json();

        if(resSubs.ok) {
            setExperiedSubs(resSubsBody);
        } else {
            toast.error("Не удалось загрузить подписки");
        }
    });

    useEffect(() => {
        fetchExp();
    }, []);

    useEffect(() => {
        (async() => {
            const resSubs = await SubscriptionService.getCurrentExperiedSubs();
            const resSubsBody = await resSubs.json();

            if(resSubs.ok) {
                setExperiedSubs(resSubsBody);
            } else {
                toast.error("Не удалось загрузить подписки");
            }
        })();
    }, [update]);

    return (
        <div className="subscriptions">
            <div className="container">
                <div className="subscriptions__title title">
                    Недействительные подписки
                </div>
                <div className="subscriptions__body MySubscriptions__body">
                    {isLoadingExp && <Loader/>}
                    { !isLoadingExp &&
                        experiedSubs.map(userSubs => <UserSubscription userSubs={userSubs} isDisabled/>)
                    }
                    {
                        experiedSubs.length === 0 &&
                        <div className="MySubscriptions__notify">Нет неактивных подписок</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default NotActiveSubscriptions;