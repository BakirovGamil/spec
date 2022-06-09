import { useEffect, useState } from "react";
import uuid from "react-uuid";
import Button from "../UI/Button/Button";
import "./ServiceList.css";

const getNewService = () => ({id: uuid(), name: "", price: "", unit: "₽/Услуга"});

function ServiceList({setParentServices}) {
    const [services, setServices] = useState([getNewService(), getNewService()]);

    useEffect(() => {
        console.log(checkLastService());
        if(checkLastService()) {
            setServices([...services, getNewService()])
        }

        setParentServices(services);
    }, [services]);

    function checkLastService() {
        const lastService = services[services.length - 1];

        return !!(lastService.name || lastService.price)
    }

    function changeService(e, id, prop) {
        setServices([...services.map(service => {
            if(service.id === id)
                return {...service, [prop]: e.target.value};
            
            return service;
        })]);
    }

    function removeService(e, id) {
        e.preventDefault();

        if(services.length === 2) return;

        setServices([...services.filter(service => service.id !== id)]);
    }

    return (
        <div className="ServiceList">
            <div className="ServiceList__services">
                { 
                    services.map((service, indx) => {

                        if(services.length - 1 === indx) {
                            return (
                                <div key={service.id} className="ServiceList__newService ServiceList__service">
                                    <input className="ServiceList__input ServiceList__name" placeholder="Услуга" value={service.name} onChange={e => changeService(e, service.id, "name")}/>
                                    <input className="ServiceList__input ServiceList__price" placeholder="Цена" value={service.price} onChange={e => changeService(e, service.id, "price")} type="number"/>
                                    <select name="ServiceList__select" className="ServiceList__input">
                                        <option value="₽/Услуга">₽/Услуга</option>
                                        <option value="₽/Час">₽/Час</option>
                                    </select>
                                    <Button className="ServiceList__button" onClick={(e) => e.preventDefault()}>
                                        <i className="gg-close"></i>
                                    </Button>
                                </div>
                            );
                        }

                        return (  
                            <div key={service.id} className="ServiceList__service">
                                <input className="ServiceList__input ServiceList__name" placeholder="Услуга" value={service.name} onChange={e => changeService(e, service.id, "name")} required/>
                                <input className="ServiceList__input ServiceList__price" placeholder="Цена" value={service.price} onChange={e => changeService(e, service.id, "price")} type="number" required/>
                                <select name="ServiceList__select" className="ServiceList__input" value={service.unit} onChange={e => changeService(e, service.id, "unit")}>
                                    <option value="₽/Услуга">₽/Услуга</option>
                                    <option value="₽/Час">₽/Час</option>
                                </select>
                                <Button className="ServiceList__button" onClick={(e) => removeService(e, service.id)}>
                                    <i className="gg-close"></i>
                                </Button>
                           </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default ServiceList;