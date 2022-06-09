import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SpecialistService from "../../API/SpecialistService";
import useAuthSpecialist from "../../hooks/useAuthSpecialist";
import SpecialistItem from "../SpecialistRegistration/SpecialistItem/SpecialistItem";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";

function EditExperience() {
    const [authSpecialist, setAuthSpecialist] = useAuthSpecialist();
    const [experiences, setExperiences] = useState(["Опыт работы 1", "Опыт работы 2"]);
    const [selectedExpIndx, setSelectedExpIndx] = useState(null);
    const [isVisibleExpUpdate, setIsVisibleExpUpdate] = useState(false);
    const [isVisibleExpAdd, setIsVisibleExpAdd] = useState(false);

    useEffect(() => {
        if(!authSpecialist) return;

        setExperiences(authSpecialist.experience);
    }, [authSpecialist]);
    
    async function handleDeleteExperience(indx) {
        const newExperience = [...experiences.slice(0, indx), ...experiences.slice(indx + 1)];

        const loader = toast.loading("Удаление...");

        const res = await SpecialistService.updateExperienceById({id: authSpecialist.id, experience: newExperience});
        const resBody = await res.json();

        if(res.ok) {
            setAuthSpecialist(resBody);
            toast.update(loader, { render: "Удалено", type: "success", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null})
        } else {
            toast.update(loader, { render: resBody.message, type: "error", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null})
        }
    }

    function handleEditExperience(indx) {
        setSelectedExpIndx(indx);
        setIsVisibleExpUpdate(true)
    }

    async function handleSaveExperience(e) {
        e.preventDefault();

        const form = e.target;
        const newExperience = [...experiences.slice(0, selectedExpIndx), form.experience.value ,...experiences.slice(selectedExpIndx + 1)];
        
        const loader = toast.loading("Изменение опыта работы...");

        const res = await SpecialistService.updateExperienceById({id: authSpecialist.id, experience: newExperience});
        const resBody = await res.json();

        if(res.ok) {
            setIsVisibleExpUpdate(false);
            setAuthSpecialist(resBody);
            setSelectedExpIndx(null);
            toast.update(loader, { render: "Опыт работы обновлен", type: "success", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null})
        } else {
            toast.update(loader, { render: resBody.message, type: "error", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null})
        }
    }

    async function handleAddExp(e) {
        e.preventDefault();

        const form = e.target;
        const newExperience = [...experiences, form.experience.value];
        
        const loader = toast.loading("Добавление опыта работы...");

        const res = await SpecialistService.updateExperienceById({id: authSpecialist.id, experience: newExperience});
        const resBody = await res.json();

        if(res.ok) {
            setIsVisibleExpAdd(false);
            setAuthSpecialist(resBody);
            setSelectedExpIndx(null);
            toast.update(loader, { render: "Опыт работы добавлен", type: "success", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null})
        } else {
            toast.update(loader, { render: resBody.message, type: "error", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null})
        }
    }

    return (<>
         <SpecialistItem title="Опыт работы">
            <div className="SpecialistProfile__experience">
                {experiences.map((experience, indx) => {
                    return (
                        <div key={indx}className="SpecialistProfile__info SpecialistProfile__line">
                            <span>{experience}</span>
                            <div className="SpecialistProfile__ExpActions">
                                <Button isBackground onClick={() => handleEditExperience(indx)}>
                                    Редактировать
                                </Button>
                                <Button isBackground onClick={() => handleDeleteExperience(indx)}>
                                    Удалить
                                </Button>
                            </div>
                        </div>
                    );
                })}
                <Button isBackground onClick={() => setIsVisibleExpAdd(true)}>
                    Добавить
                </Button>
            </div>
        </SpecialistItem>
        <Modal title={"Редактирование опыта"} isVisible={isVisibleExpUpdate} setIsVisible={setIsVisibleExpUpdate}>
            {selectedExpIndx !== null &&
                <form className="editName" onSubmit={handleSaveExperience}>
                    <input
                        key={isVisibleExpUpdate}
                        className="ExperienceList__input"
                        name="experience"
                        placeholder="Опыт работы сантехником 10 лет..."
                        defaultValue={experiences[selectedExpIndx]}
                        required 
                    />
                    <Button isBackground className="editName__btn">
                        Сохранить изменения
                    </Button>
                </form>
            }
        </Modal>
        <Modal title={"Опыт работы"} isVisible={isVisibleExpAdd} setIsVisible={setIsVisibleExpAdd}>
            <form className="editName" onSubmit={handleAddExp}>
                <input
                    className="ExperienceList__input"
                    name="experience"
                    placeholder="Опыт работы сантехником 10 лет..."
                    required 
                />
                <Button isBackground className="editName__btn">
                    Добавить
                </Button>
            </form>
        </Modal>
    </>)
}

export default EditExperience;