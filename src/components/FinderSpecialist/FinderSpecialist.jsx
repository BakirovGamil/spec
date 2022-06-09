import { useNavigate } from "react-router-dom";
import AddFavoriteBtn from "../AddFavoriteBtn/AddFavoriteBtn";
import BanBtn from "../BanBtn/BanBtn";
import IsVerify from "../IsVerify/IsVerify";
import VerifyBtn from "../VerifyBtn/VerifyBtn";
import WriteMessage from "../WriteMessage/WriteMessage";

function FinderSpecialist({specialist, specialists, setSpecialists, ...props}) {
    const navigator = useNavigate();
    const user = specialist.user;

    return (
        <div className="FinderSpecialist" {...props} onClick={() => navigator(`/profile/${specialist.id}`)}>
            <div className="FinderAvatar">
                <img src={`http://localhost:3000/${specialist?.avatar?.filename}`} alt="Не удалось загрузить аватар" />
            </div>
            <div className="FinderSpecialistInfo">
                <div className="FinderSpecialistInfo__body">
                    <div className="FinderSpecialist__fullName">
                        {
                            [user.lastName, user.firstName, user.middleName].join(" ")
                        }
                    </div>
                    <div className="FinderSpecialist__info">
                        {   specialist.professions &&
                            <div className="FinderSpecialist__professions">
                                {
                                    specialist.professions.reduce((prev, current) => prev += " · " + current.name , "")
                                }
                            </div>
                        }
                        <div className="profile__rating">
                            <i className="star profile__star"></i>
                            <span className="profile__rate">
                                { specialist.stats.averageRating || "–"}
                            </span>
                        </div>
                        <IsVerify specialist={specialist}/>
                    </div>
                </div>
                <div className="FinderSpecialist__actions" onClick={e => e.stopPropagation()}>
                    <WriteMessage userId={user.id}/>
                    <BanBtn specialist={specialist} specialists={specialists} setSpecialists={setSpecialists}/>
                    <VerifyBtn specialist={specialist} specialists={specialists} setSpecialists={setSpecialists}/>
                    <AddFavoriteBtn specialistId={specialist.id}/>
                </div>
            </div>
        </div>
    );
}

export default FinderSpecialist;