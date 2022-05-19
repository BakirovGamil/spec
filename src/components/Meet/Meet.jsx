import Swiper from "../Swiper/Swiper";
import Slide from "../Swiper/Slide";
import "./Meet.css"

function Meet() {
    return (
        <Swiper isPagination={true} isButton={true} className="meet__swiper">
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
    );
}

export default Meet;