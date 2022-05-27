import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Meet from "../components/Meet/Meet";
import Rating from "../components/Rating/Rating";
import Subscription from "../components/Subscription/Subscription";
import Modal from "../components/UI/Modal/Modal";

function Main() {
    const [isVisible, setIsVisible] = useState(false);

    return ( <>
        <Header/>
        <main className="main">
            <div className="container">
                <Meet/>
                <Rating name="rating"/>
                <Link to="profile">Пример профиля</Link><br />
                <Link to="profile/photos">Пример всех фоток профиля</Link><br />
                <Link to="profile/comments">Пример всех отзывов профиля</Link><br />
                <Link to="specialist/registration">Страница регистрации специалиста</Link><br />
            </div>
            <div className="test">
                <div className="container">
                    <button onClick={()=>setIsVisible(true)}>Тест модального окна</button> <br/>
                </div>
                <Modal title={"Сидорович"} isVisible={isVisible} setIsVisible={setIsVisible}>
                    Короче, Меченый, я тебя спас и в благородство играть не буду: выполнишь для меня пару заданий — и мы в расчете. Заодно посмотрим, как быстро у тебя башка после амнезии прояснится. А по твоей теме постараюсь разузнать. Хрен его знает, на кой ляд тебе этот Стрелок сдался, но я в чужие дела не лезу, хочешь убить, значит есть за что...
                </Modal>
            </div>
            <div className="subscriptions">
                <div className="container">
                    <div className="subscriptions__title title">
                        Подписки
                    </div>
                    <div className="subscriptions__body">
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                        <Subscription/>
                    </div>
                </div>
            </div>
        </main>
    </>);
}

export default Main;