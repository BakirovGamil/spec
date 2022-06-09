import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AuthorizationService from "../../API/AuthorizarizationService";
import useAuthUser from "../../hooks/useAuthUser";
import useAuthSpecialist from "../../hooks/useAuthSpecialist";
import useFetching from "../../hooks/useFetching";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import Modal from "../UI/Modal/Modal";
import "./AuthorizationModal.css";
import SpecialistService from "../../API/SpecialistService";
import FavoriteService from "../../API/FavoriteService";
import useFavorite from "../../hooks/useFavorite";

const initUser = {
    login: "",
    password: "",
};

function AuthorizationModal({isVisible, setIsVisible}) {
    const [authUser, setAuthUser] = useAuthUser();
    const [authSpecialist, setAuthSpecialist] = useAuthSpecialist();
    const [user, setUser] = useState(initUser);
    const [favorites, setFavorites, isVisibleFavorites, setIsVisibleFavorites] = useFavorite();
    const [isLoadingAuth, fethAuth, errorAuth] = useFetching(async () => {
        if(isLoadingAuth) return;

        const loader = toast.loading("Авторизация...");

        const res = await AuthorizationService.login(user);
        const resUser = await res.json();

        if(res.ok) {
            setAuthUser(resUser.body);
            console.log(resUser.message);
            console.log(resUser.body);

            const resFavorite = await FavoriteService.getByUserId(resUser.body.id);
			const resFavoriteBody = await resFavorite.json();

			if(resFavorite.ok) {
				setFavorites(resFavoriteBody);
				console.log(resFavoriteBody);
			} else {
				toast.error("Что-то пошло не так! Попробуйте перезагрузить страницу");
			}

            const resAuthSpecialist = await SpecialistService.getCurrentSpecialist();
            const resAuthSpecialistBody = await resAuthSpecialist.json();

            if(resAuthSpecialist.ok) {
                setAuthSpecialist(resAuthSpecialistBody);
            } else {
                console.log(resAuthSpecialistBody.message);
            }

            toast.update(loader, { render: resUser.message, type: "success", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});
            setIsVisible(false);
        } else {
            console.log(resUser.message);
            toast.update(loader, { render: resUser.message, type: "error", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});
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