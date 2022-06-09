import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ServiceService from "../../API/ServiceService";
import useAuthSpecialist from "../../hooks/useAuthSpecialist";
import SpecialistItem from "../SpecialistRegistration/SpecialistItem/SpecialistItem";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";

function EditService() {
    const [authSpecialist, setAuthSpecialist] = useAuthSpecialist();
    const [services, setServices] = useState([{"id": "1653765579732",  "specialistId": "1653765541384",  "name": "Услуга 1",  "price": 100,  "unit": "₽/Услуга"}, {"id": "165376557973",  "specialistId": "1653765541384",  "name": "Услуга 2",  "price": "200",  "unit": "₽/Час"}]);
    const [selectedService, setSelectedService] = useState(null);
    const [isVisibleServiceUpdate, setIsVisibleServiceUpdate] = useState(false);
    const [isVisibleServiceAdd, setIsVisibleServiceAdd] = useState(false);

    useEffect(() => {
        if(!authSpecialist) return;

        (async function() {
            const res = await ServiceService.getBySpecialistId(authSpecialist.id);
            const resBody = await res.json();
            
            if(res.ok) {
                setServices(resBody);
            } else {
                toast.error("Что-то пошло не так! Попробуйте обновить страницу!");
            }
        })()
        
    }, [authSpecialist]);
    
    async function handleDeleteService(service) {
        const newServices = services.filter(curService => curService.id !== service.id);

        const loader = toast.loading("Удаление услуги...");

        const res = await ServiceService.deleteById(service.id);
        const resBody = await res.json();

        if(res.ok) {
            setServices(newServices);
            toast.update(loader, { render: "Услуга удалена", type: "success", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null})
        } else {
            toast.update(loader, { render: resBody.message, type: "error", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null})
        }
    }

    function handleEditService(service) {
        setSelectedService(service);
        setIsVisibleServiceUpdate(true);
    }

    async function handleSaveService(e) {
        e.preventDefault();

        const form = e.target;
        
        const loader = toast.loading("Изменение услуги...");

        const updatedService = {id: selectedService.id, name: form.name.value, price: form.price.value, unit: form.unit.value};
        const res = await ServiceService.updateById(updatedService);
        const resBody = await res.json();

        if(res.ok) {
            const newServices = services.map(service => {
                if(service.id === selectedService.id) return updatedService;

                return service;
            });

            setServices(newServices);
            setIsVisibleServiceUpdate(false);
            setSelectedService(null);
            toast.update(loader, { render: "Услуга изменена", type: "success", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null})
        } else {
            toast.update(loader, { render: resBody.message, type: "error", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null})
        }
    }

    async function handleAddService(e) {
        e.preventDefault();

        const form = e.target;
        
        const loader = toast.loading("Добавление услуги...");

        const res = await ServiceService.add({name: form.name.value, price: form.price.value, unit: form.unit.value});
        const resBody = await res.json();

        if(res.ok) {
            setServices([...services, resBody]);
            setIsVisibleServiceAdd(false);
            setSelectedService(null);
            toast.update(loader, { render: "Услуга добавлен", type: "success", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null})
        } else {
            toast.update(loader, { render: resBody.message, type: "error", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null})
        }
    }

    return (<>
         <SpecialistItem title="Услуги">
            <div className="SpecialistProfile__experience">
                {services.map(service => {
                    return (
                        <div key={service.id} className="SpecialistProfile__info SpecialistProfile__line">
                            <div style={{display: "flex"}}>
                                <div className="ServiceList__input ServiceList__name SpecialistProfile__service" style={{width: 200}}>{service.name}</div>
                                <div className="ServiceList__input ServiceList__price SpecialistProfile__service" >{service.price}</div>
                                <div className="ServiceList__input SpecialistProfile__service" style={{width: 100.2}}>{service.unit}</div>
                            </div>
                            <div className="SpecialistProfile__ExpActions">
                                <Button isBackground onClick={() => handleEditService(service)}>
                                    Редактировать
                                </Button>
                                <Button isBackground onClick={() => handleDeleteService(service)}>
                                    Удалить
                                </Button>
                            </div>
                        </div>
                    );
                })}
                <Button isBackground onClick={() => setIsVisibleServiceAdd(true)}>
                    Добавить
                </Button>
            </div>
        </SpecialistItem>
        <Modal title={"Редактирование услуги"} isVisible={isVisibleServiceUpdate} setIsVisible={setIsVisibleServiceUpdate}>
            { selectedService !== null && 
                <form key={isVisibleServiceUpdate} className="editName" onSubmit={handleSaveService}>
                    <div>
                        <input name="name" className="ServiceList__input ServiceList__name" placeholder="Услуга" defaultValue={selectedService.name}/>
                        <input name="price" className="ServiceList__input ServiceList__price" placeholder="Цена" defaultValue={selectedService.price} type="number"/>
                        <select name="unit" className="ServiceList__input" defaultValue={selectedService.unit}>
                            <option value="₽/Услуга">₽/Услуга</option>
                            <option value="₽/Час">₽/Час</option>
                        </select>
                    </div>
                    <Button isBackground className="editName__btn">
                        Сохранить изменения
                    </Button>
                </form>
            }
        </Modal>
        <Modal title={"Добавить услугу"} isVisible={isVisibleServiceAdd} setIsVisible={setIsVisibleServiceAdd}>
            <form key={isVisibleServiceAdd} className="editName" onSubmit={handleAddService}>
                <div>
                    <input name="name" className="ServiceList__input ServiceList__name" placeholder="Услуга"/>
                    <input name="price" className="ServiceList__input ServiceList__price" placeholder="Цена" type="number"/>
                    <select name="unit" className="ServiceList__input" defaultValue={"₽/Услуга"}>
                        <option value="₽/Услуга">₽/Услуга</option>
                        <option value="₽/Час">₽/Час</option>
                    </select>
                </div>
                <Button isBackground className="editName__btn">
                    Добавить услугу
                </Button>
            </form>
        </Modal>
    </>)
}

export default EditService;