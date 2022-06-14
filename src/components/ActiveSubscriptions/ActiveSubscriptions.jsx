import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SubscriptionService from "../../API/SubscriptionService";
import useFetching from "../../hooks/useFetching";
import Loader from "../UI/Loader/Loader";
import UserSubscription from "../UserSubscription/UserSubscription";

function ActiveSubscriptions({update, orders, setOrders}) {
    const [subscriptions, setSubscriptions] = useState([]);

    const [isLoading, fetch, error] = useFetching(async () => {
        const resSubs = await SubscriptionService.getCurrentSubs();
        const resSubsBody = await resSubs.json();

        if(resSubs.ok) {
            setSubscriptions(resSubsBody);
        } else {
            toast.error("Не удалось загрузить подписки");
        }
    });

    useEffect(() => {
        fetch();
    }, []);

    useEffect(() => {
        (async() => {
            const resSubs = await SubscriptionService.getCurrentSubs();
            const resSubsBody = await resSubs.json();
    
            if(resSubs.ok) {
                setSubscriptions(resSubsBody);
            } else {
                toast.error("Не удалось загрузить подписки");
            }
        })();
    }, [update]);

    return (
        <div className="subscriptions">
            <div className="container">
                <div className="subscriptions__title title">
                    Активные подписки
                </div>
                <div className="subscriptions__body MySubscriptions__body">
                    {isLoading && <Loader/>}
                    { !isLoading &&
                        subscriptions.map(userSubs => <UserSubscription userSubs={userSubs} orders={orders} setOrders={setOrders}/>)
                    }
                    {
                        subscriptions.length === 0 &&
                        <div className="MySubscriptions__notify">Нет активных подписок</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ActiveSubscriptions;