import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SubscriptionService from "../../API/SubscriptionService";
import Button from "../UI/Button/Button";
import "./Order.css";

function Order({order, isName, isMessage, isCancel, isAccept, isUpdateActive, fetch}) {
    const navigator = useNavigate();
    const subscription = order.subscriptionUser.subscription;
    const user = order.subscriptionUser.user;

    async function handleCancel() {
        const res = await SubscriptionService.deleteactiveorderbyid(order.id);
        const resBody = await res.json();

        if(res.ok) {
            toast.success("Заказ отменен!")
            fetch();
        } else {
            toast.error(resBody.message);
            console.log(resBody.message)
        }
    }

    async function handleAccept() {
        const res = await SubscriptionService.acceptOrderById(order.id);
        const resBody = await res.json();

        if(res.ok) {
            toast.success("Заказ принят!")
            fetch();
        } else {
            toast.error(resBody.message);
            console.log(resBody.message)
        }
    }

    async function handleUpdateIsActive() {
        const res = await SubscriptionService.updateHistoryOrderStatusById(order.historyOrderId);
        const resBody = await res.json();

        if(res.ok) {
            toast.success("Заказ выполнен!")
            fetch();
        } else {
            toast.error(resBody.message);
            console.log(resBody.message)
        }
    }

    async function handleMessage() {
        navigator(`/messages/${user.id}`);
    }

    return (
        <div className="Order">
            <div className="Order__body">
                <div className="Order__title">
                    {
                        isName 
                        ?
                        <div>
                            {user.lastName} {user.firstName}
                        </div>
                        :
                        <div>
                            {subscription.title}
                        </div>
                    }
                </div>
                <div className="Order__comment">
                    {order.comment}
                </div>
            </div>
            <div className="Order__actions">
                {   isCancel &&
                    <Button className="Order__cancel Order__btn" isBackground onClick={handleCancel}>
                        <i className="gg-close"></i>
                    </Button>
                }
                {
                    isAccept && 
                    <Button className="Order__accept Order__btn" isBackground onClick={handleAccept}>
                        <i className="gg-check"></i>
                    </Button>
                }
                {
                    isUpdateActive && 
                    <Button className="Order__accept Order__btn" isBackground onClick={handleUpdateIsActive}>
                        <i className="gg-check"></i>
                    </Button>
                }
                {
                    isMessage && 
                    <Button className="Order__message Order__btn" isBackground onClick={handleMessage}>
                        <i className="gg-comment Order__message_i"></i>
                    </Button>
                }
            </div>
        </div>
    );
}

export default Order;