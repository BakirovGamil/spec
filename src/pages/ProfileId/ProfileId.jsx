import { useState } from "react";
import Header from "../../components/Header/Header";
import ProfileComments from "../../components/ProfileComments/ProfileComments";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import ProfilePhoto from "../../components/ProfilePhoto/ProfilePhoto";
import Button from "../../components/UI/Button/Button";
import "./ProfileId.css"

const sections = [
    {
        id: 1,
        name: "О специалисте",
        element: <ProfileInfo/>
    },
    {
        id: 2,
        name: "Фото",
        element: <ProfilePhoto/>
    },
    {
        id: 3,
        name: "Услуги",
        element: <div>Услуги</div>
    },
    {
        id: 4,
        name: "Отзывы",
        element: <ProfileComments/>
    }
];

function Profile() {
    const [selectedSection, setSelectedSection] = useState(sections[0]);

    return (<>
        <Header/>
        <main>
            <div className="profile">
                <div className="container">
                    <div className="profile__body">
                        <div className="profile__actions_fake"></div>
                        <div className="profile__actions">
                            {sections.map((section) => {
                                return (
                                    <Button 
                                        key={section.id} 
                                        className={selectedSection === section ?  "profile__button profile__button_selected" : "profile__button"} 
                                        onClick={() => setSelectedSection(section)}
                                    >
                                        {section.name}
                                    </Button>
                                );
                            })}
                        </div>
                        <div className="profile__content">
                            {selectedSection.element}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>);
}

export default Profile;