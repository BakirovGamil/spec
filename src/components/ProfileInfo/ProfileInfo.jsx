import Experience from "./Experience";
import Button from "../UI/Button/Button";
import Info from "../UI/Info/Info";
import "./ProfileInfo.css";

function ProfileInfo({className}) {
    const classNameFull = className ? ["profile__info", className].join(" ") : "profile__info";

    return (
        <div className={classNameFull}>
            <div className="profile__item profile__main">
                <div className="profile__img">
                    <img src="/profile.jpg" alt="Не удалось загрузить фотку"/>
                </div>
                <div className="profile__stat">
                    <div className="profile__name">Екатерина Александровна Трофимова</div>
                    <div className="profile__rating-comment">
                        <div className="profile__rating">
                            <i className="star profile__star"></i>
                            <span className="profile__rate">
                                4.8
                            </span>
                        </div>
                        <div className="profile__comm">
                            <Button className="profile__comment-btn">
                                <i className="gg-comment"></i>
                                Отзывы
                            </Button>
                        </div>
                    </div>
                    <div className="profile__verify">
                        <Info placeholder={"Паспорт проверен"} className="profile__verify-item">
                            Мы проверили копию паспорта:<br/>
                            — следы редактирования<br/>    
                            отсутствуют;<br/>
                            — имя, фамилия и фото совпадают.
                        </Info>
                        <Info placeholder={"Гарантия"} className="profile__verify-item">
                            Специалист даёт гарантию на все услуги: «1 год»
                        </Info>
                    </div>
                </div>
            </div>
            
            <div className="profile__item">
                <div className="profile__title">
                    О себе
                </div>
                <div className="profile__about">
                    Выполняю качественно и в срок установку предметов интерьера и ремонт квартир «под ключ». Опыт работы с 2006 года.
                </div>
            </div>

            <div className="profile__item">
                <div className="profile__title">
                    Опыт
                </div>
                <div className="profile__about">
                    <Experience/>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;