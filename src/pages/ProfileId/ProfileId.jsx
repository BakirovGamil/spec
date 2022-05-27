import Header from "../../components/Header/Header";
import ProfileComments from "../../components/ProfileComments/ProfileComments";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import ProfilePhoto from "../../components/ProfilePhoto/ProfilePhoto";
import ProfileServices from "../../components/ProfileServices/ProfileServices";
import "./ProfileId.css"

function Profile() {
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