import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthorizationService from "../../API/AuthorizarizationService";
import SpecialistService from "../../API/SpecialistService";
import EditExperience from "../../components/EditExperience/EditExperience";
import EditService from "../../components/EditService/EditService";
import Header from "../../components/Header/Header";
import ServiceList from "../../components/ServiceList/ServiceList";
import SpecialistInfo from "../../components/SpecialistRegistration/SpecialistInfo/SpecialistInfo";
import SpecialistItem from "../../components/SpecialistRegistration/SpecialistItem/SpecialistItem";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Modal from "../../components/UI/Modal/Modal";
import useAuthSpecialist from "../../hooks/useAuthSpecialist";
import useAuthUser from "../../hooks/useAuthUser";
import "./SpecialistProfile.css";

function SpecialistProfile() {
    const [isVisibleNameUpdate, setIsVisibleNameUpdate] = useState(false);
    const [isVisibleAboutUpdate, setIsVisibleAboutUpdate] = useState(false);
    const [authUser, setAuthUser] = useAuthUser();
    const [authSpecialist, setAuthSpecialist] = useAuthSpecialist();

    async function handleSaveName(e) {
        e.preventDefault();

        const form = e.target;

        const loader = toast.loading("Обновление имени...");

        const resUser = await AuthorizationService.updateUserById({id: authUser.id, lastName: form.lastName.value, firstName: form.firstName.value, middleName: form.middleName.value});
        const resUserBody = await resUser.json();

        if(resUser.ok) {
            toast.update(loader, { render: "Имя обновлено", type: "success", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});
            setAuthUser(resUserBody);
            setIsVisibleNameUpdate(false);
            console.log(resUserBody);
        } else {
            toast.update(loader, { render: resUserBody.message, type: "error", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});
        }
    };

    async function handleSaveAbout(e) {
        e.preventDefault();
        const form = e.target;

        const loader = toast.loading("Сохранение `о себе`...");

        const res = await SpecialistService.updateAboutById({id: authSpecialist.id, about: form.about.value});
        const resBody = await res.json();

        if(res.ok) {
            setIsVisibleAboutUpdate(false);
            setAuthSpecialist(resBody);
            toast.update(loader, { render: "Информация `о себе` обновлена", type: "success", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null})
        } else {
            toast.update(loader, { render: resBody.message, type: "error", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null})
        }
    }

    return (<>
        <Header/>
        <main className="main">
            <div className="SpecialistProfileContainer">
                <div className="container">
                    <div className="SpecialistProfile">
                        <div className="SpecialistProfile__info">
                            <SpecialistInfo className="SpecialistProfile__SpecialistInfo"/>
                            <Button isBackground onClick={() => setIsVisibleNameUpdate(true)}>
                                Редактировать имя
                            </Button>
                        </div>
                        <SpecialistItem title="О себе">
                            <div className="SpecialistProfile__info">
                                <textarea
                                    disabled
                                    key={authSpecialist?.about}
                                    className="SpecialistRegistration__about"
                                    name="about" 
                                    placeholder="Занимаюсь сантехникой, электрикой. И мелкими работами по дому. Опыт работы — 10 лет..." 
                                    defaultValue={authSpecialist?.about}
                                    required 
                                />
                                <Button isBackground onClick={() => setIsVisibleAboutUpdate(true)}>
                                    Редактировать о себе
                                </Button>
                            </div>
                        </SpecialistItem>
                    
                        <EditExperience/>
                                
                        <EditService/>
                    </div>  
                    <Modal title={"Редактирование имени"} isVisible={isVisibleNameUpdate} setIsVisible={setIsVisibleNameUpdate}>
                    {authUser &&
                        <form key={isVisibleNameUpdate} className="editName" onSubmit={handleSaveName}>
                            <Input name="lastName" placeholder="Фамилия" defaultValue={authUser.lastName} required/>
                            <Input name="firstName" placeholder="Имя" defaultValue={authUser.firstName} required/>
                            <Input name="middleName" placeholder="Отчество" defaultValue={authUser.middleName}/>
                            <Button isBackground className="editName__btn">
                                Сохранить изменения
                            </Button>
                        </form>
                        }
                    </Modal>
                    <Modal title={"Редактирование о себе"} isVisible={isVisibleAboutUpdate} setIsVisible={setIsVisibleAboutUpdate}>
                    {authSpecialist &&
                        <form className="editName" onSubmit={handleSaveAbout}>
                            <textarea
                                key={isVisibleAboutUpdate}
                                className="SpecialistRegistration__about"
                                name="about" 
                                placeholder="Занимаюсь сантехникой, электрикой. И мелкими работами по дому. Опыт работы — 10 лет..." 
                                defaultValue={authSpecialist?.about}
                                required 
                            />
                            <Button isBackground className="editName__btn">
                                Сохранить изменения
                            </Button>
                        </form>
                    }
                    </Modal>    
                </div>
            </div>
        </main>
    </>)
}

export default SpecialistProfile;