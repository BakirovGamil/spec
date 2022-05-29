import Header from "../../components/Header/Header";
import SpecialistInfo from "../../components/SpecialistRegistration/SpecialistInfo/SpecialistInfo";
import SpecialistItem from "../../components/SpecialistRegistration/SpecialistItem/SpecialistItem";
import ServiceList from "../../components/ServiceList/ServiceList";
import ExperienceList from "../../components/ExperienceList/ExperienceList";
import "./SpecialistRegistration.css"

function SpecialistRegistration() {
    return (<>
        <Header/>
        <main>
            <div className="SpecialistProfile">
                <div className="container">
                    <div className="SpecialistProfile__body">
                        <div className="SpecialistProfile__content">
                            <SpecialistInfo className="SpecialistProfile__item"/>

                            <SpecialistItem title="О себе" className="SpecialistProfile__item">
                                <textarea 
                                    className="SpecialistProfile__about"
                                    name="about" 
                                    placeholder="Занимаюсь сантехникой, электрикой. И мелкими работами по дому. Опыт работы — 10 лет..." 
                                    required 
                                />
                            </SpecialistItem>

                            <SpecialistItem title="Опыт работы" className="SpecialistProfile__item">
                                <ExperienceList/>
                            </SpecialistItem>
                            
                            <SpecialistItem title="Услуги" className="SpecialistProfile__item">
                                <ServiceList/>
                            </SpecialistItem>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>);
}

export default SpecialistRegistration;