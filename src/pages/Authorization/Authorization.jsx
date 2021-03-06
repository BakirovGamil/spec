import Header from "../../components/Header/Header";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import "./Authorization.css"
import { useState } from "react";
import AuthorizationListItem from "./AuthorizationListItem";
import { Link, useNavigate } from "react-router-dom";
import AuthorizationService from "../../API/AuthorizarizationService";
import useFetching from "../../hooks/useFetching";
import Agreement from "../../components/Agreement/Agreement";
import { toast } from "react-toastify";

const initUser = {
    lastName: "",
    firstName: "",
    middleName: "",
    login: "",
    password: "",
    phoneNumber: "",
};

function Authorization() {
    const [user, setUser] = useState(initUser);
    const [passwordValidator, setPasswordValidator] = useState({
        isLength: false,
        isDifferentCase: false,
        isContainDigits: false,
    });
    const navigator = useNavigate();
    const [isLoadingRegistration, fethRegistration, errorRegistration] = useFetching(async () => {
        const loader = toast.loading("Регистрация...");

        const res = await AuthorizationService.registration(user);
        const resMessage = await res.json();

        if(res.ok) {
            navigator("/login");
            console.log(resMessage.message);
            console.log(resMessage.body);
            toast.update(loader, { render: resMessage.message, type: "success", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});
        } else {
            console.log(resMessage.message);
            toast.update(loader, { render: resMessage.message, type: "error", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});
        }
    });
    const [isAgree, setIsAgree] = useState(false);
    
    const handleChange = (e, prop) => {
        const regExp =  /[а-яА-ЯёЁ-]/g;
        const filteredValueArray = e.target.value.match(regExp);
        const newValue = filteredValueArray ? filteredValueArray.join("") : "";
        const lengthValue = newValue.length;
        if(lengthValue <= 50) setUser({...user, [prop]: newValue});
    };

    const handleChangeLogin = e => {
        const regExp =  /[\w-]/g;
        const filteredValueArray = e.target.value.match(regExp);
        const newValue = filteredValueArray ? filteredValueArray.join("") : "";
        const lengthValue = newValue.length;
        if(lengthValue <= 50) setUser({...user, login: newValue});
    };

    const handleChangePassword = e => {
        const newValue = e.target.value.trim();
        const lengthValue = newValue.length;
        if(lengthValue <= 50) {
            setUser({...user, password: newValue});

            const regDigits = /[\d]/g;
            const regLowerCase = /[a-zа-я]/g;
            const regUpperCase = /[A-ZА-Я]/g;

            setPasswordValidator({
                isLength: lengthValue >= 6, 
                isDifferentCase: regLowerCase.test(newValue) && regUpperCase.test(newValue),
                isContainDigits: regDigits.test(newValue)
            });
        }
    };

    const handleFocusPassword = e => {
        document.querySelector(".authorization__require").classList.add("authorization__require_fullsize");
    };

    const handleChangePhoneNumber = e => {
        const regExp =  /[\d+]/g;
        const filteredValueArray = e.target.value.match(regExp);
        const newValue = filteredValueArray ? filteredValueArray.join("") : "";
        const lengthValue = newValue.length;
        if(lengthValue <= 12) setUser({...user, phoneNumber: newValue});
    };

    const handleFocusPhoneNumber = e => {
        if(user.phoneNumber === "") setUser({...user, phoneNumber: "+7"});
    };

    async function registration(e) {
        e.preventDefault();
        if(isLoadingRegistration) return;
        if(!isAgree) return toast.warn("Необходимо прочитать соглашение об обработке персональных данных");
        await fethRegistration();

        if(errorRegistration) {
            console.log(errorRegistration);
        }
    }

    return (<>
        <Header/>
        <main className="main">
            <div className="authorization">
                <div className="container">
                    <div className="authorization__container">
                        <form className="authorization__form" onSubmit={registration}>
                            <div className="authorization__item authorization__title">
                                <span>Регистрация</span>
                            </div>
                            <div className="authorization__item">
                                <Input type="text" placeholder="Фамилия" value={user.lastName} onChange={(e) => handleChange(e, "lastName")} required/>
                            </div>
                            <div className="authorization__item">
                                <Input type="text" placeholder="Имя" value={user.firstName} onChange={(e) => handleChange(e, "firstName")} required/>
                            </div>
                            <div className="authorization__item">
                                <Input type="text" placeholder="Отчество" value={user.middleName} onChange={(e) => handleChange(e, "middleName")}/>
                            </div>
                            <div className="authorization__item">
                                <Input type="text" placeholder="Логин" value={user.login} onChange={handleChangeLogin} required/>
                            </div>
                            <div className="authorization__item">
                                <Input 
                                    type="password" 
                                    name="password"
                                    placeholder="Пароль"
                                    value={user.password} 
                                    onChange={handleChangePassword}
                                    onFocus={handleFocusPassword}
                                    isInvalid={!(passwordValidator.isLength && passwordValidator.isContainDigits && passwordValidator.isDifferentCase)}
                                    required   
                                />
                                <div className="authorization__require">
                                    <ul className="authorization__list">
                                        <AuthorizationListItem isInvalid={!passwordValidator.isLength}>Длина не менее 6 символов</AuthorizationListItem>
                                        <AuthorizationListItem isInvalid={!passwordValidator.isDifferentCase}>Разные регистры</AuthorizationListItem>
                                        <AuthorizationListItem isInvalid={!passwordValidator.isContainDigits}>Содержит цифры</AuthorizationListItem>
                                    </ul>
                                </div>
                            </div>
                            <div className="authorization__item">
                                <Input type="tel" placeholder="Телефон (+7)" value={user.phoneNumber} onChange={handleChangePhoneNumber} onFocus={handleFocusPhoneNumber} required/>
                            </div>
                            <Agreement isAgree={isAgree} setIsAgree={setIsAgree} className="authorization__item authorization__isAgree"/>
                            <div className="authorization__item authorization__actions">
                                <Link to="/login" className="authorization__link">Вход</Link>
                                <Button className="authorization__button">Создать аккаунт</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </>)
}

export default Authorization;