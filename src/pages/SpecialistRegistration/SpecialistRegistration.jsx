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
import ProfessionService from "../../API/ProfessionService";
import ImageService from "../../API/ImageService";
import useAuthUser from "../../hooks/useAuthUser";
import { useNavigate } from "react-router-dom";
import Agreement from "../../components/Agreement/Agreement";
import { toast } from "react-toastify";
import AuthorizationService from "../../API/AuthorizarizationService";
import useAuthSpecialist from "../../hooks/useAuthSpecialist";

function SpecialistRegistration() {
    const [services, setServices] = useState(null);
    const [experiences, setExperiences] = useState(null);
    const [professions, setProfessions] = useState(null);
    const [about, setAbout] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [authUser, setAuthUser] = useAuthUser();
    const [authSpecialist, setAuthSpecialist] = useAuthSpecialist();
    const navigator = useNavigate();
    const [isAgree, setIsAgree] = useState(false);

    async function handleRegistrationSpecialist(e) {
        e.preventDefault();
        if(!isAgree) return toast.warn("Необходимо прочитать соглашение об обработке персональных данных");

        const fildteredServices =  services.filter(service => service.name.trim() !== "" &&  service.price.trim() !== "");
        const fildteredExperiences =  experiences.filter(experience => experience.data.trim() !== "").map(experience => experience.data);
        const filteredProfessions = professions.filter(profession => profession.data.trim() !== "").map(profession => profession.data);

        console.log(fildteredServices);
        console.log(fildteredExperiences);
        console.log(filteredProfessions);
        
        if(!authUser) return toast.warn("Нужно авторизоваться!");

        const loader = toast.loading("Регистрация специалиста...");

        const resAvatar = await ImageService.getAvatarByUsertId(authUser.id);
        const resAvatarBody = await resAvatar.json();
        if(!resAvatar.ok)  
            return toast.update(loader, { render: resAvatarBody.message, type: "error", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});
        
        setAvatar(resAvatarBody);

        if(!resAvatarBody) 
            return toast.update(loader, { render: "Необходимо загрузить аватарку!", type: "error", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});
    
        if(about.length < 10) 
            return toast.update(loader, { render: "Длина 'о себе' должна быть больше 10 символов!", type: "error", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});
        
        let professionsId = [];
        for(let profession of filteredProfessions) {
            const resProfession = await ProfessionService.add(profession);
            const resProfessionBody = await resProfession.json();

            professionsId.push(resProfessionBody._id);
        }

        const resSpecialist = await SpecialistService.registration({about, experience: fildteredExperiences, professions: professionsId});
        const resSpecialistBody = await resSpecialist.json();

        if(!resSpecialist.ok) 
            return toast.update(loader, { render: resSpecialistBody.message, type: "error", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null}); 

        console.log(resSpecialistBody);

        for(let service of fildteredServices) {
            const resService = await ServiceService.add({name: service.name, price: service.price, unit: service.unit});
            const resServiceBody = await resService.json();

            if(!resService.ok) {
                toast.update(loader, { render: resServiceBody.message, type: "error", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});
                continue;
            }

            console.log(resServiceBody);
        }

        const resAuthUser = await AuthorizationService.getCurrentUser();
        const resAuthUserBody = await resAuthUser.json();
        
        const resAuthSpecilist = await SpecialistService.getCurrentSpecialist();
        const resAuthSpecilistBody = await resAuthSpecilist.json();

        toast.update(loader, { render: "Теперь вы специалист!", type: "success", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});
        setAuthUser(resAuthUserBody)
        setAuthSpecialist(resAuthSpecilistBody)
        navigator("/");
    }

    function handleChangeAbout(e) {
        setAbout(e.target.value);
    } 

    return (<>
        <Header/>
        <main>
            <div className="SpecialistRegistration">
                <div className="container">
                    <div className="SpecialistRegistration__body">
                        <form className="SpecialistRegistration__content" onSubmit={handleRegistrationSpecialist}>
                            <SpecialistInfo className="SpecialistRegistration__item"/>

                            <SpecialistItem title="О себе" className="SpecialistRegistration__item">
                                <textarea 
                                    className="SpecialistRegistration__about"
                                    name="about" 
                                    placeholder="Занимаюсь сантехникой, электрикой. И мелкими работами по дому. Опыт работы — 10 лет..." 
                                    value={about}
                                    onChange={handleChangeAbout}
                                    required 
                                />
                            </SpecialistItem>
                            
                            <SpecialistItem title="Профессия" className="SpecialistRegistration__item">
                                <ExperienceList setParentExperiences={setProfessions} placeholder="Сантехник"/>
                            </SpecialistItem>

                            <SpecialistItem title="Опыт работы" className="SpecialistRegistration__item">
                                <ExperienceList setParentExperiences={setExperiences}/>
                            </SpecialistItem>
                            
                            <SpecialistItem title="Услуги" className="SpecialistRegistration__item">
                                <ServiceList setParentServices={setServices}/>
                            </SpecialistItem>

                            <Agreement isAgree={isAgree} setIsAgree={setIsAgree} className="SpecialistRegistration__agreement"/>

                            <div className="SpecialistRegistration__actions">
                                <Button isBackground className="SpecialistRegistration__regBtn">Стать специалистом</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </>);
}

export default SpecialistRegistration;