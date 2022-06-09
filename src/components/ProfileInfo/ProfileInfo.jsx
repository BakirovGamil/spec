import Experience from "./Experience";
import "./ProfileInfo.css";
import AddFavoriteBtn from "../AddFavoriteBtn/AddFavoriteBtn";
import WriteMessage from "../WriteMessage/WriteMessage";
import BanBtn from "../BanBtn/BanBtn";
import VerifyBtn from "../VerifyBtn/VerifyBtn";
import IsVerify from "../IsVerify/IsVerify";

function ProfileInfo({className, specialist, setSpecialist, comments, commentsStats}) {
    const classNameFull = className ? ["profile__info", className].join(" ") : "profile__info";

    return (
        <div className={classNameFull}>
            <div className="profile__item profile__main">
                <div className="profile__img">
                    <img src={`http://localhost:3000/${specialist.avatar.filename}`} alt="Не удалось загрузить фотку"/>
                </div>
                <div className="profile__stat">
                    <div className="profile__name">{`${specialist.user.lastName} ${specialist.user.firstName} ${specialist.user.middleName}`}</div>
                    <div className="profile__rating-comment">
                        <div className="profile__rating">
                            <i className="star profile__star"></i>
                            <span className="profile__rate">
                                { commentsStats.averageRating || "–"}
                            </span>
                        </div>
                        <div className="profile__comm">
                            <WriteMessage userId={specialist.user.id}/>
                            <AddFavoriteBtn specialistId={specialist.id}/>
                            <BanBtn specialist={specialist}  setSpecialist={setSpecialist} isOne/>
                            <VerifyBtn specialist={specialist}  setSpecialist={setSpecialist} isOne/>
                        </div>
                    </div>
                    <div className="profile__verify">
                       <IsVerify specialist={specialist}/>
                    </div>
                </div>
            </div>
            
            <div className="profile__item">
                <div className="profile__title">
                    О себе
                </div>
                <div className="profile__about">
                    {specialist.about}
                </div>
            </div>
            
           {
               specialist.professions &&
               <div className="profile__item">
               <div className="profile__title">
                   {   
                       specialist.professions.length === 1
                       ? "Профессия"
                       : "Профессии"
                   }
               </div>
               <div className="profile__about">
                   <ul className="Experience">
                       {
                           specialist.professions.map((profession) => <li key={profession.id}>{profession.name[0].toUpperCase() + profession.name.slice(1)}</li>)
                       }
                   </ul>
               </div>
           </div>
           }

            <div className="profile__item">
                <div className="profile__title">
                    Опыт
                </div>
                <div className="profile__about">
                    <Experience experiences={specialist.experience}/>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;