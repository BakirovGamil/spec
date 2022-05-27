import "./Subscription.css";
import Button from "../UI/Button/Button";

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

function Subscription() {
    return (
        <div className="subscription" style={{background: backgroundColors[colorIterator % 9]}}>
            <div className="subscription__title">
                    Здоровый питомец
            </div>
            <div className="subscription__body">
                <div className="subscription__img-container">
                    <div className="subscription__img">
                        <img src="https://c.tenor.com/O-Ard5UaYIkAAAAi/chubby-tonton.gif" alt="" />
                    </div>
                </div>
                <div className="subscription__text">
                    <p>3 консультации (ветеринары)</p>
                    <p>Автопродление каждый месяц </p>
                    <p>Вы Экономите 498 Р в месяц</p>
                </div>
                <Button className="subscription__button" style={{color: color[colorIterator++ % 9]}}>
                    999Р в месяц
                </Button>
            </div>
        </div>
    );
}

export default Subscription;