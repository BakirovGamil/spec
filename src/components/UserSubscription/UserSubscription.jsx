import Button from "../UI/Button/Button";
import { useState } from "react";
import Modal from "../UI/Modal/Modal";
import SubscriptionService from "../../API/SubscriptionService";
import { toast } from "react-toastify";

function UserSubscription({userSubs, orders, setOrders, isDisabled = false}) {
    const subscription = userSubs.subscription;
    const [isVisibleModal, setIsVisibleModal] = useState(false);

    function handleClick() {
        if(isDisabled) return;
        
        setIsVisibleModal(true);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if(isDisabled) return;

        const form = e.target;
        const resOrder = await SubscriptionService.addOrder(userSubs.id, form.comment.value);
        const resOrderBody = await resOrder.json();

        if(resOrder.ok) {
            toast.success("Заказ был оставлен!");
            setOrders([...orders, resOrderBody]);
        } else {
            toast.error(resOrderBody.message);
        }

        setIsVisibleModal(false);
        form.reset();
    }

    return (<>
        <div className="subscription" style={{background: subscription.backgroundColor}}>
            <div className="subscription__title">
                {subscription.title}
            </div>
            <div className="subscription__body">
                {
                     <div className="subscription__img-container">
                        <div className="subscription__img">
                            <img src={subscription.imgUrl} alt="" />
                        </div>
                     </div>
                }
                <div className="subscription__text">
                    {
                        subscription.description.map((desc, indx) => <p key={indx}>{desc}</p>)
                    }
                    <p>Истекает: {(new Date(+userSubs.expiredAt)).toLocaleString()}</p>
                </div>
                <Button className="subscription__button" style={{color: subscription.color}} onClick={handleClick}>
                    Осталось: {userSubs.counter} р.
                </Button>
            </div>
        </div>
        <Modal title="Заказ" isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
            <form onSubmit={handleSubmit}>
                <textarea 
                    className="SpecialistRegistration__about"
                    name="comment" 
                    placeholder="Напишите, чтобы оставить комментарий..." 
                />
                <Button isBackground>Оставить заказ</Button>
            </form>
        </Modal>
    </>);
}

export default UserSubscription;