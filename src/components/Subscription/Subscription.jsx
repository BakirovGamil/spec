import "./Subscription.css";
import Button from "../UI/Button/Button";
import { useState } from "react";
import Loader from "../UI/Loader/Loader";
import SubscriptionService from "../../API/SubscriptionService";
import { toast } from "react-toastify";

const backgroundColors = [
    "linear-gradient(146.48deg, rgb(204, 174, 255) 1.4%, rgb(163, 117, 239) 98.57%)",
    "linear-gradient(146.48deg, rgb(176, 227, 239) 1.4%, rgb(113, 179, 205) 98.57%)",
    "linear-gradient(146.48deg, rgb(255, 201, 216) 1.4%, rgb(244, 108, 142) 98.57%)",
    "linear-gradient(146.48deg, rgb(246, 211, 137) 1.4%, rgb(239, 94, 89) 98.57%)",
    "linear-gradient(146.48deg, rgb(141, 180, 45) 1.4%, rgb(111, 156, 0) 98.57%)",
    "linear-gradient(146.48deg, rgb(218, 142, 254) 1.4%, rgb(173, 0, 255) 98.57%)",
    "linear-gradient(146.48deg, rgb(132, 210, 238) 1.4%, rgb(49, 110, 247) 98.57%)",
    "linear-gradient(146.48deg, rgb(30, 197, 198) 1.4%, rgb(115, 30, 198) 98.57%)",
    "linear-gradient(146.48deg, rgb(156, 236, 251) 1.4%, rgb(0, 82, 212) 98.57%)"
];

const color = [
    "rgb(163, 117, 239)",
    "rgb(113, 179, 205)",
    "rgb(244, 108, 142)",
    "rgb(239, 94, 89)",
    "rgb(111, 156, 0)",
    "rgb(173, 0, 255)",
    "rgb(49, 110, 247)",
    "rgb(115, 30, 198)",
    "rgb(0, 82, 212)"
]

let colorIterator = 0;

function Subscription({subscription, className}) {
    const fullClassName = className ? ["subscription", className].join(" ") : "subscription";
    const [isBuying, setIsBuying] = useState(false);
    
    async function handleBuy() {
        if(isBuying) return;
        setIsBuying(true);

        const resBuy = await SubscriptionService.buySubsById(subscription.id);
        const resBuyBody = await resBuy.json();

        if(resBuy.ok) {
            toast.success("Подписка оформлена!");
            setIsBuying(false);
        } else {
            toast.error(resBuyBody.message);
            setIsBuying(false);
        }
    }

    return (
        <div className={fullClassName} style={{background: subscription.backgroundColor}}>
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
                </div>
                <Button className="subscription__button" style={{color: subscription.color}} onClick={handleBuy}>
                {isBuying 
                    ? 
                    <Loader backgroundColor={subscription.color}/>
                    :
                    <>{subscription.price}₽</>
                }
                </Button>
            </div>
        </div>
    );
}

export default Subscription;