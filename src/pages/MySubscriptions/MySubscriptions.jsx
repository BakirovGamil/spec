import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SubscriptionService from "../../API/SubscriptionService";
import ActiveOrdersUser from "../../components/ActiveOrdersUser/ActiveOrdersUser";
import ActiveSubscriptions from "../../components/ActiveSubscriptions/ActiveSubscriptions";
import Header from "../../components/Header/Header";
import NotActiveSubscriptions from "../../components/NotActiveSubscriptions/NotActiveSubscriptions";
import useFetching from "../../hooks/useFetching";
import "./MySubscriptions.css";

function MySubscriptions() {
    const [update, setUpdate] = useState(Math.random());
    const [orders, setOrders] = useState([ ]);

    const [isLoading, fetch, error] = useFetching(async () => {
        const resActiveOrders = await SubscriptionService.getCurrentActiveOrders();
        const resActiveOrdersBody = await resActiveOrders.json();

        if(resActiveOrders.ok) {
            setOrders(resActiveOrdersBody);
        } else {
            toast.error("Что-то пошло не так при загрузке активных заказов");
            console.log(resActiveOrdersBody.message);
        }
    });

    useEffect(() => {
        fetch()

        const timeId = setInterval(() => {
            (async() => {
                const resActiveOrders = await SubscriptionService.getCurrentActiveOrders();
                const resActiveOrdersBody = await resActiveOrders.json();

                if(resActiveOrders.ok) {
                    setOrders(resActiveOrdersBody);
                } else {
                    toast.error("Что-то пошло не так при загрузке активных заказов");
                    console.log(resActiveOrdersBody.message);
                }
            })();
            setUpdate(Math.random());
        }, 5000);

        return () => clearInterval(timeId);
    }, [])

    return ( <>
        <Header/>
        <main className="main">
            <div className="MySubscriptions">
                <ActiveOrdersUser isLoading={isLoading} fetch={fetch} orders={orders} setOrders={setOrders} setUpdate={setUpdate}/>
                <ActiveSubscriptions update={update} orders={orders} setOrders={setOrders}/>
                <NotActiveSubscriptions update={update}/>
            </div>
        </main>
    </>)
}

export default MySubscriptions;