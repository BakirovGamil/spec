import { useEffect, useState } from "react";
import Button from "../UI/Button/Button";
import "./Cookie.css";

function Cookie() {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        const isVisibleCookie = window.localStorage.getItem("isVisibleCookie");

        if(!isVisibleCookie) {
            window.localStorage.setItem("isVisibleCookie", true);
            setIsVisible(true);
        }
    }, []);

    function handleClick() {
        window.localStorage.setItem("isVisibleCookie", false);
        setIsVisible(false);
    }

    return (
        <div className="cookie" style={isVisible ? {} : {display: "none"}}>
            <div className="cookie__body">
                Пользуясь нашим сайтом, вы соглашаетесь с тем, что <a href="/PolitikaKonfidencialnosti.docx" className="cookie__link" target="_blank">мы используем cookies</a> 🍪
            </div>
            <Button className="cookie__btn" isBackground onClick={handleClick}>
                Окей
            </Button>
        </div>
    );
}

export default Cookie;