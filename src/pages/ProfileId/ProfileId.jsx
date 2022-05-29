import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetching from "../../hooks/useFetching";
import Header from "../../components/Header/Header";
import ProfileComments from "../../components/ProfileComments/ProfileComments";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import ProfilePhoto from "../../components/ProfilePhoto/ProfilePhoto";
import ProfileServices from "../../components/ProfileServices/ProfileServices";
import "./ProfileId.css"
import SpecialistService from "../../API/SpecialistService";
import ServiceService from "../../API/ServiceService";
import ImageService from "../../API/ImageService";

function Profile() {
    const {specialistId} = useParams();
    // const navigator = useNavigate();
    const [isSpecialistLoading, fetchSpecialist, errorSpecialist] = useFetching(async () => {
        const res = await SpecialistService.getById(specialistId);
        const resSpecialist = await res.json();
        if(res.ok) {
            console.log(resSpecialist);
        } else {
            console.log(resSpecialist.message);
        }

        const res2 = await ServiceService.getBySpecialistId(specialistId);
        const resServices = await res2.json();
        if(res2.ok) {
            console.log(resServices);
        } else {
            console.log(resServices.message);
        }

        const res3 = await ImageService.getAvatarByUsertId(resSpecialist.user.id);
        const resImages = await res3.json();
        if(res3.ok) {
            console.log(resImages);
        } else {
            console.log(resImages.message);
        }
    });

    useEffect(() => {
        fetchSpecialist();
    }, []);

    return (<>
        <Header/>
        <main>
            <div className="profile">
                <div className="container">
                    <div className="profile__body">
                        <div className="profile__actions_fake"></div>
                        <div className="profile__actions">
                            <a className="profile__button" href="#profile">О специалисте</a>
                            <a className="profile__button" href="#photo">Фото</a>
                            <a className="profile__button" href="#services">Услуги</a>
                            <a className="profile__button" href="#comments">Отзывы</a>
                        </div>
                        <div className="profile__content">
                            <div id="profile"></div>
                            <ProfileInfo className="profile-section"/>

                            <div id="photo"></div>
                            <ProfilePhoto className="profile-section"/>

                            <div id="services"></div>
                            <ProfileServices className="profile-section"/>

                            <div id="comments"></div>
                            <ProfileComments className="profile-section"/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>);
}

export default Profile;