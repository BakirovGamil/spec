import "./Meet.css"
import Swiper from '../../components/Swiper/Swiper';
import Slide from "../../components/Swiper/Slide";

function Meet() {
    return (
        <div className="welcome">
            <div className="container">
            <Swiper isPagination={true} isButton={true} className="welcome__swiper">
                <Slide>
                    <div className="card">
                        <div className="card__item card__item-0">
                            Заглушка
                        </div>
                        <div className="card__item card__item-1">
                            Привет
                        </div>
                        <div className="card__item card__item-2">
                            Пока
                        </div>
                    </div>
                </Slide>
                <Slide>
                    <div className="how">
                        <div className="how__fake">
                            Заглушка
                        </div>
                    </div>
                </Slide>
            </Swiper>
        </div>
    </div>
       
    );
}

export default Meet;