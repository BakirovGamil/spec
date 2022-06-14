import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import LastComments from "../components/LastComments/LastComments";
import Meet from "../components/Meet/Meet";
import Subscriptions from "../components/Subscriptions/Subscriptions";
import Button from "../components/UI/Button/Button";
import Input from "../components/UI/Input/Input";

function Main() {
    const navigator = useNavigate();

    function handleSearch(e) {
        e.preventDefault();
        navigator(`/search/${e.target.query.value}`)
    }

    return ( <>
        <Header/>
        <main className="main">
            <div className="container">
                <Meet/>
                <Link to="mainsubs">Страница подписок</Link>
            </div>
            <div className="search">
                <div className="container">
                    <div className="search__title title">
                        Поиск
                    </div>
                    <div className="Search__body">
                        <form className="search__form" onSubmit={handleSearch}>
                            <Input className="search__input" name="query" placeholder="Найти специалиста" isBackground/>
                            <Button isBackground>
                                Перейти к поиску
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="aboutService">
                <div className="container">
                    <div className="aboutService__title title">
                        О сервисе
                    </div>
                    <div className="aboutService__body">
                        <p>Cайт является платформой поиска специалистов для выполнения различных услуг с возможностью оформления подписок. </p>
                        <p>Если вы являетесь специалистом, то вы можете прейти на вкладку "Стать спецалистом" в меню сайта.</p>
                    </div>
                </div>
            </div>

            <LastComments/>

            <Subscriptions/>    
        </main>
    </>);
}

export default Main;