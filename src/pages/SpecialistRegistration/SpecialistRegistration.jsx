import Header from "../../components/Header/Header";
import SpecialistInfo from "../../components/SpecialistRegistration/SpecialistInfo/SpecialistInfo";
import SpecialistItem from "../../components/SpecialistRegistration/SpecialistItem/SpecialistItem";
import ServiceList from "../../components/ServiceList/ServiceList";
import ExperienceList from "../../components/ExperienceList/ExperienceList";
import "./SpecialistRegistration.css"
import Button from "../../components/UI/Button/Button";
import { useState } from "react";
import SpecialistService from "../../API/SpecialistService";
import ServiceService from "../../API/ServiceService";
import ImageService from "../../API/ImageService";
import useAuthUser from "../../hooks/useAuthUser";
import { useNavigate } from "react-router-dom";

function SpecialistRegistration() {
    const [services, setServices] = useState(null);
    const [experiences, setExperiences] = useState(null);
    const [about, setAbout] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [authUser, setAuthUser] = useAuthUser();
    const navigator = useNavigate();

    async function handleRegistrationSpecialist() {
        const fildteredServices =  services.filter(service => service.name.trim() !== "" &&  service.price.trim() !== "");
        const fildteredExperiences =  experiences.filter(experience => experience.data.trim() !== "").map(experience => experience.data);

        console.log(fildteredServices);
        console.log(fildteredExperiences);
        
        if(!authUser) return console.log("Нужно авторизоваться!");

        const resAvatar = await ImageService.getAvatarByUsertId(authUser.id);
        const resAvatarBody = await resAvatar.json();
        if(!resAvatar.ok)  return console.log(resAvatarBody.message);

        setAvatar(resAvatarBody);

        if(!resAvatarBody) return console.log("Необходимо загрузить аватарку!");
        if(about.length < 10) return console.log("Длина информации о себе должна быть больше 10 символов!");

        const resSpecialist = await SpecialistService.registration({about, experience: fildteredExperiences});
        const resSpecialistBody = await resSpecialist.json();

        if(!resSpecialist.ok) return console.log(resSpecialistBody.message);

        console.log(resSpecialistBody);

        for(let service of fildteredServices) {
            const resService = await ServiceService.add({name: service.name, price: service.price});
            const resServiceBody = await resService.json();

            if(!resService.ok) {
                console.log(resServiceBody.message);
                continue;
            }

            console.log(resServiceBody);
        }

        console.log("Регистрация завершена");
        navigator("/");
    }

    function handleChangeAbout(e) {
        setAbout(e.target.value);
    } 

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
                                    value={about}
                                    onChange={handleChangeAbout}
                                    required 
                                />
                            </SpecialistItem>

                            <SpecialistItem title="Опыт работы" className="SpecialistProfile__item">
                                <ExperienceList setParentExperiences={setExperiences}/>
                            </SpecialistItem>
                            
                            <SpecialistItem title="Услуги" className="SpecialistProfile__item">
                                <ServiceList setParentServices={setServices}/>
                            </SpecialistItem>

                            <div className="SpecialistProfile__actions">
                                <Button onClick={handleRegistrationSpecialist} isBackground className="SpecialistProfile__regBtn">Стать специалистом</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>);
}

export default SpecialistRegistration;