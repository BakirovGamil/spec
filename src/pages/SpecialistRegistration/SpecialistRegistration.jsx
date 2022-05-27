import ServiceList from "../../components/ServiceList/ServiceList";
import Header from "../../components/Header/Header";
import Button from "../../components/UI/Button/Button";
import "./SpecialistRegistration.css";

function SpecialistRegistration() {
    return (<>
        <Header/>
        <main>
            <div className="SpecialistRegistration">
                <div className="container">
                    <div className="SpecialistRegistration__container">
                        <form className="SpecialistRegistration__form">
                            <div className="SpecialistRegistration__item SpecialistRegistration__title">
                                <span>Регистрация специалиста</span>
                            </div>
                            <div className="SpecialistRegistration__item">
                                <div className="SpecialistRegistration__name">Аватар</div>
                                <div className="SpecialistRegistration__body">
                                    <input type="file" />
                                </div>
                            </div>
                            <div className="SpecialistRegistration__item">
                                <div className="SpecialistRegistration__name">О себе</div>
                                <div className="SpecialistRegistration__body">
                                    <textarea 
                                        className="SpecialistRegistration__about"
                                        name="about" 
                                        placeholder="Занимаюсь сантехникой, электрикой. И мелкими работами по дому. Опыт работы — 10 лет..." 
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="SpecialistRegistration__item">
                                <div className="SpecialistRegistration__name">Услуги</div>
                                <div className="SpecialistRegistration__body">
                                    <ServiceList></ServiceList>
                                </div>
                            </div>
                            <div className="SpecialistRegistration__item SpecialistRegistration__actions">
                                <Button className="SpecialistRegistration__button">Создать аккаунт специалиста</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </>);
}

export default SpecialistRegistration;