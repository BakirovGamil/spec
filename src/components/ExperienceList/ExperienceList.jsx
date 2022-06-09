import { useEffect, useState } from "react";
import uuid from "react-uuid";
import Button from "../UI/Button/Button";
import "./ExperienceList.css";

const getNewExperience = () => ({id: uuid(), data: ""});

function ExperienceList({setParentExperiences, placeholder = "Опыт работы сантехником 10 лет..."}) {
    const [experiences, setExperiences] = useState([getNewExperience(), getNewExperience()]);

    useEffect(() => {
        console.log(checkLastExperience());
        if(checkLastExperience()) {
            setExperiences([...experiences, getNewExperience()])
        }

        setParentExperiences(experiences);
    }, [experiences]);

    function checkLastExperience() {
        const lastExperience = experiences[experiences.length - 1];

        return !!(lastExperience.data)
    }

    function changeExperience(e, id, prop) {
        setExperiences([...experiences.map(experience => {
            if(experience.id === id)
                return {...experience, [prop]: e.target.value};
            
            return experience;
        })]);
    }

    function removeExperience(e, id) {
        e.preventDefault();

        if(experiences.length === 2) return;

        setExperiences([...experiences.filter(experience => experience.id !== id)]);
    }

    return (
        <div className="ExperienceList">
            <div className="ExperienceList__experiences">
                { 
                    experiences.map((experience, indx) => {

                        if(experiences.length - 1 === indx) {
                            return (
                                <div key={experience.id} className="ExperienceList__newExperience ExperienceList__experience">
                                    <input className="ExperienceList__input ExperienceList__name" placeholder="Добавить еще" value={experience.data} onChange={e => changeExperience(e, experience.id, "data")}/>
                                    <Button className="ExperienceList__button" onClick={(e) => e.preventDefault()}>
                                        <i className="gg-close"></i>
                                    </Button>
                                </div>
                            );
                        }

                        return (  
                            <div key={experience.id} className="ExperienceList__experience">
                                <input className="ExperienceList__input ExperienceList__name" placeholder={placeholder} value={experience.data} onChange={e => changeExperience(e, experience.id, "data")} required/>
                                <Button className="ExperienceList__button" onClick={(e) => removeExperience(e, experience.id)}>
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

export default ExperienceList;