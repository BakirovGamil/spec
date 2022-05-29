import PhotoUploader from "../../UI/PhotoUploader/PhotoUploader";
import "./SpecialistInfo.css";

function SpecialistInfo({className}) {
    const classNameFull = className ? ["SpecialistInfo", className].join(" ") : "SpecialistInfo";

    return (
        <div className={classNameFull}>
            <div className="SpecialistInfo__img">
                {/* <img src="/profile.jpg" alt="Не удалось загрузить фотку"/> */}
            </div>
            <div className="SpecialistInfo__stat">
                <div className="SpecialistInfo__name">Екатерина Александровна Трофимова</div>
                <div className="SpecialistInfo__upload">
                    <PhotoUploader className={"SpecialistInfo__photoUploader"} placeholder={"Загрузить аватар"} name={"avatar"}/>
                </div>
                <div className="SpecialistInfo__upload">
                    <PhotoUploader className={"SpecialistInfo__photoUploader"} placeholder={"Загрузить паспорт"} name={"passport"}/>
                </div>
            </div>
        </div>
    )
}

export default SpecialistInfo;