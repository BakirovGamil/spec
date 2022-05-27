import { useEffect, useState } from "react";
import uuid from "react-uuid";
import Button from "../UI/Button/Button";
import "./ServiceList.css";

const getNewService = () => ({id: uuid(), name: "", price: ""});

function ServiceList() {
    const [services, setServices] = useState([getNewService(), getNewService()]);

    useEffect(() => {
        console.log(checkLastService());
        if(checkLastService()) {
            setServices([...services, getNewService()])
        }
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
                    services.map((experience, indx) => {

                        if(services.length - 1 === indx) {
                            return (
                                <div key={experience.id} className="ServiceList__newService ServiceList__service">
                                    <input className="ServiceList__input ServiceList__name" placeholder="Услуга" value={experience.name} onChange={e => changeService(e, experience.id, "name")}/>
                                    <input className="ServiceList__input ServiceList__price" placeholder="Цена" value={experience.price} onChange={e => changeService(e, experience.id, "price")}/>
                                    <Button className="ServiceList__button" onClick={(e) => e.preventDefault()}>
                                        <i className="gg-close"></i>
                                    </Button>
                                </div>
                            );
                        }

                        return (  
                            <div key={experience.id} className="ServiceList__service">
                                <input className="ServiceList__input ServiceList__name" placeholder="Услуга" value={experience.name} onChange={e => changeService(e, experience.id, "name")} required/>
                                <input className="ServiceList__input ServiceList__price" placeholder="Цена" value={experience.price} onChange={e => changeService(e, experience.id, "price")} required/>
                                <Button className="ServiceList__button" onClick={(e) => removeService(e, experience.id)}>
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