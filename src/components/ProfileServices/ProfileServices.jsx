import "./ProfileServices.css";

function ProfileServices({className}) {
    const classNameFull = className ? ["ProfileServices", className].join(" ") : "ProfileServices";

    return (<div className={classNameFull}>
        <div className="ProfileServices__title title">
            Услуги
        </div>
        <div className="ProfileServices__body">
            <div className="ProfileServices__service">
                <div className="ProfileServices__name">
                    Индивидуальные занятия
                </div>
                <div className="ProfileServices__price">
                    300Р
                </div>
            </div>
            <div className="ProfileServices__service">
                <div className="ProfileServices__name">
                    Бокс
                </div>
                <div className="ProfileServices__price">
                    300Р
                </div>
            </div>
        </div>
    </div>);
}

export default ProfileServices;