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
                        Cервис поиска специалистов
                    </div>
                    <div className="card__item card__item-2">
                        Найдите специалиста для своей задачи
                    </div>
                </div>
            </Slide>
            <Slide>
                <div className="card" style={{backgroundColor: "#6699FF"}}>
                    <div className="card__item card__item-0">
                        Заглушка
                    </div>
                    <div className="card__item" style={{textAlign: "center"}}>
                        Здесь могла бы быть ваша реклама
                    </div>
                </div>
            </Slide>
        </Swiper>
    );
}

export default Meet;