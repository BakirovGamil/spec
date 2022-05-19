import Header from "../../components/Header/Header";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { useState } from "react";
import { Link } from "react-router-dom";

const initUser = {
    login: "",
    password: "",
};

function Login() {
    const [user, setUser] = useState(initUser);
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

    return (<>
        <Header/>
        <main className="main">
            <div className="authorization">
                <div className="container">
                    <div className="authorization__container">
                        <form className="authorization__form">
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
                                <Button className="authorization__button">Войти</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </>);
}

export default Login;