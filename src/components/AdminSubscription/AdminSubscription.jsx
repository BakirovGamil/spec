import { useState } from "react";
import { toast } from "react-toastify";
import SubscriptionService from "../../API/SubscriptionService";
import LinkedSpecialists from "../LinkedSpecialists/LinkedSpecialists";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";

function AdminSubscription({subscription, className, subscriptions, setSubscriptions, setSelectedSubs, setIsVisibleEdit}) {
    const [isVisible, setIsVisible] = useState(false);
    const fullClassName = className ? ["subscription adminSubs", className].join(" ") : "subscription adminSubs";

    function handleClickEdit(e) {
        e.stopPropagation();
        setSelectedSubs(subscription);
        setIsVisibleEdit(true);
    }

    async function handleClickArchive(e) {
        e.stopPropagation();
        const res = await SubscriptionService.updateisinarchive(subscription.id, !subscription.isInArchive);
        const resBody = await res.json();

        if(res.ok) {
            setSubscriptions(
                subscriptions.map((subs) => {
                    if(subs.id === subscription.id) return resBody;

                    return subs;
                })
            )

            toast.success("Статус подписки изменен!");
        } else {
            toast.error(resBody.message);
        }
    }

    async function handleClick() {
        setIsVisible(true);
    }
    
    return (<>
        <div className={fullClassName} style={{background: subscription.backgroundColor}} onClick={handleClick}>
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
                    <p>На сколько месяцев: {subscription.months} м.</p>
                    <p>Кол-во использований: {subscription.limit} р.</p>
                    <p>Цена: {subscription.price} ₽</p>
                </div>
                <div className="subscription__actions">
                    <Button className="subscription__button adminSubsBtn" style={{color: subscription.color}} onClick={handleClickEdit}>
                        Изменить
                    </Button>
                    <Button className="subscription__button adminSubsBtn" style={ subscription.isInArchive ? {color: "green"} : {color: "red"}} onClick={handleClickArchive}>
                        {
                            subscription.isInArchive ? "Достать из архива" : "В архив"
                        }
                    </Button>
                </div>
            </div>
        </div>
        <Modal title="Привязанные специалисты" isVisible={isVisible} setIsVisible={setIsVisible}>
            {isVisible && <LinkedSpecialists subsId={subscription.id}/>}
        </Modal>
    </>);
}

export default AdminSubscription;