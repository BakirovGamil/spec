import "./ProfileServices.css";

function ProfileServices({className, services}) {
    const classNameFull = className ? ["ProfileServices", className].join(" ") : "ProfileServices";

    return (<div className={classNameFull}>
        <div className="ProfileServices__title title">
            Услуги
        </div>
        <div className="ProfileServices__body">
            {
                services.map((service) => {
                    return (
                        <div key={service.id} className="ProfileServices__service">
                            <div className="ProfileServices__name">
                                {service.name}
                            </div>
                            <div className="ProfileServices__price">
                                {service.price}
                                <span className="ProfileServices__unit">
                                    {service.unit}
                                </span>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    </div>);
}

export default ProfileServices;