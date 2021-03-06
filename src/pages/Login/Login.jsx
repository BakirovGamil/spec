import Header from "../../components/Header/Header";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetching from "../../hooks/useFetching";
import useAuthUser from "../../hooks/useAuthUser";
import AuthorizationService from "../../API/AuthorizarizationService"; 
import { toast } from "react-toastify";
import useAuthSpecialist from "../../hooks/useAuthSpecialist";
import SpecialistService from "../../API/SpecialistService";

const initUser = {
    login: "",
    password: "",
};

function Login() {
    const [user, setUser] = useState(initUser);
    const [authUser, setAuthUser] = useAuthUser();
    const [authSpecialist, setAuthSpecialist] = useAuthSpecialist();
    const navigator = useNavigate();

    const [isLoadingAuth, fethAuth, errorAuth] = useFetching(async () => {
        const loader = toast.loading("Авторизация...");

        const res = await AuthorizationService.login(user);
        const resUser = await res.json();

        if(res.ok) {
            setAuthUser(resUser.body);
            navigator("/");
            const resAuthSpecialist = await SpecialistService.getCurrentSpecialist();
            const resAuthSpecialistBody = await resAuthSpecialist.json();

            if(resAuthSpecialist.ok) {
                setAuthSpecialist(resAuthSpecialistBody);
            } else {
                console.log(resAuthSpecialistBody.message);
            }
            
            toast.update(loader, { render: resUser.message, type: "success", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});
        } else {
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

    return (<>
        <Header/>
        <main className="main">
            <div className="authorization">
                <div className="container">
                    <div className="authorization__container">
                        <div className="authorization__form">
                            <div className="authorization__item authorization__title">
                                <span>Авторизация</span>
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
                                />
                            </div>
                            <div className="authorization__item authorization__actions">
                                <Link to="/authorization" className="authorization__link">Регистрация</Link>
                                <Button className="authorization__button" onClick={logIn} disabled={isLoadingAuth}>Войти</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>);
}

export default Login;