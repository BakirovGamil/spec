import Header from "../../components/Header/Header";
import "./NotFound.css";

function NotFound() {
    return (<>
        <Header/>
        <main className="main">
            <div className="NotFound">
                <div className="container">
                    <div className="NotFound__row">
                        <div  style={{fontSize: 50, paddingTop: 60,paddingBottom: 20}}>404</div>
                        <div className="NotFound__title">
                            Страница не найдена или у вас нет доступа!
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>);
}

export default NotFound;