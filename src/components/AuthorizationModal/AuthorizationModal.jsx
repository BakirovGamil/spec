import { useState } from "react";
import { Link } from "react-router-dom";
import AuthorizationService from "../../API/AuthorizarizationService";
import useAuthUser from "../../hooks/useAuthUser";
import useFetching from "../../hooks/useFetching";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import Modal from "../UI/Modal/Modal";
import "./AuthorizationModal.css";

const initUser = {
    login: "",
    password: "",
};

function AuthorizationModal({isVisible, setIsVisible}) {
    const [authUser, setAuthUser] = useAuthUser();
    const [user, setUser] = useState(initUser);
    const [isLoadingAuth, fethAuth, errorAuth] = useFetching(async () => {
        const res = await AuthorizationService.login(user);
        const resUser = await res.json();

        if(res.ok) {
            setAuthUser(resUser.body);
            setIsVisible(false);
            console.log(resUser.message);
            console.log(resUser.body);
        } else {
            console.log(resUser.message);
        }
    });

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
        }
    };

    const logIn = async e => {
        await fethAuth();

        if(errorAuth) {
            console.log(errorAuth);
        }
    }

    return (
        <Modal title="Авторизация" isVisible={isVisible} setIsVisible={setIsVisible}>
                <div className="authorizationModal">
                    <Input className="authorizationModal__input" placeholder="Логин" value={user.login} onChange={handleChangeLogin}/>
                    <Input className="authorizationModal__input" type="password" placeholder="Пароль" value={user.password} onChange={handleChangePassword}/>
                    <div className="authorizationModal__actions">
                        <Link to="/authorization" className="authorization__link">Регистрация</Link>
                        <Button onClick={logIn}>
                            Войти
                        </Button>
                    </div>
                </div>
        </Modal>
    )
}

export default AuthorizationModal;