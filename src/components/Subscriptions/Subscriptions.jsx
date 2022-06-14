import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SubscriptionService from "../../API/SubscriptionService";
import useFetching from "../../hooks/useFetching";
import Subscription from "../Subscription/Subscription";
import Loader from "../UI/Loader/Loader";

function Subscriptions() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [isLoading, fetch, error] = useFetching(async () => {
        const resSubs = await SubscriptionService.getNotArchived();
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

    return (
        <div className="subscriptions">
            <div className="container">
                <div className="subscriptions__title title">
                    Подписки
                </div>
                <div className="subscriptions__body">
                    {isLoading && <Loader/>}
                    { !isLoading &&
                        subscriptions.map(subs => <Subscription subscription={subs}/>)
                    }
                </div>
            </div>
        </div>
    );
}

export default Subscriptions;