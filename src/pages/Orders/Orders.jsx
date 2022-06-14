import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SubscriptionService from "../../API/SubscriptionService";
import Header from "../../components/Header/Header";
import Order from "../../components/Order/Order";
import Loader from "../../components/UI/Loader/Loader";
import useFetching from "../../hooks/useFetching";
import "./Orders.css";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [accpetedOrders, setAcceptedOrders] = useState([]);

    const [isLoading, fetch, error] = useFetching(async () => {
        const res = await SubscriptionService.getOrdersForSpecialist();
        const resBody = await res.json();

        if(res.ok) {
            setOrders(resBody);
        } else {
            toast.error(resBody.message);
        }
    });

    const [isLoadingAccepted, fetchAccepted, errorAccepted] = useFetching(async () => {
        const res = await SubscriptionService.getActiveOrdersBySpecialist();
        const resBody = await res.json();

        if(res.ok) {
            setAcceptedOrders(resBody);
        } else {
            toast.error(resBody.message);
        }
    });

    function fullFetch() {
        fetch();
        fetchAccepted();
    }

    useEffect(() => {
        fetch();
        fetchAccepted();
        
        const timeId = setInterval(() => {
            (async() => {
                const res = await SubscriptionService.getOrdersForSpecialist();
                const resBody = await res.json();

                if(res.ok) {
                    setOrders(resBody);
                } else {
                    toast.error(resBody.message);
                }
            })();
        }, 5000);

        return () => clearInterval(timeId);
    }, []);

    return (<>
        <Header/>
        <main className="main">
            <div className="Orders">
                <div className="container">
                    <div className="Orders__container">
                        <div className="Orders__title title">
                            Заказы
                        </div>
                        <div className="Orders__body">
                            {isLoading && <Loader></Loader>}    
                            {!isLoading && orders.map(order => <Order isName isAccept isMessage key={order.id} order={order} fetch={fullFetch}/>)}
                            {orders.length === 0 && <div className="Orders__notify">Нет заказов</div>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="Orders">
                <div className="container">
                    <div className="Orders__container">
                        <div className="Orders__title title">
                            Принятые заказы
                        </div>
                        <div className="Orders__body">
                            {isLoadingAccepted && <Loader></Loader>}    
                            {!isLoadingAccepted && accpetedOrders.map(order => <Order isName isUpdateActive isMessage key={order.id} order={order} fetch={fetchAccepted}/>)}
                            {accpetedOrders.length === 0 && <div className="Orders__notify">Нет принятых заказов</div>}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>);
}

export default Orders;