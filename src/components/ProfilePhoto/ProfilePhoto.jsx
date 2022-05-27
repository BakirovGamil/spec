import Fancybox from "../Fancybox/Fancybox";
import Button from "../UI/Button/Button";
import "./ProfilePhoto.css";

function ProfilePhoto({className}) {
    const classNameFull = className ? ["ProfilePhoto", className].join(" ") : "ProfilePhoto";

    return (<div className={classNameFull}>
        <div className="ProfilePhoto__title title">
                Фотографии
        </div>
        <div className="ProfilePhoto__body">
            <div className="ProfilePhoto__img">
                <img src="https://lipsum.app/id/46/200x150"/>
            </div>
            <div className="ProfilePhoto__img">
                <img src="https://lipsum.app/id/51/200x150" />
            </div>
            <div className="ProfilePhoto__img">
                <img src="https://lipsum.app/id/46/200x150" />
            </div>
            <div className="ProfilePhoto__img">
                <img src="https://lipsum.app/id/46/200x150" />
            </div>
        </div>
        <div className="PrfoilePhoto_action">
            <Button className="PrfoilePhoto__button">Посмотреть все фотографии</Button> 
        </div>
    </div>);
}

export default ProfilePhoto;


{/* <Fancybox options={{ infinite: true }}>
             <a data-fancybox="gallery" 
                data-info="АААААААААААААААААААААААААААААААА"
                href="https://lipsum.app/id/46/1600x1200"
             >
                <img src="https://lipsum.app/id/46/200x150" />
            </a>
            <a data-fancybox="gallery" data-info="Какое-то описание" href="https://lipsum.app/id/47/1600x1200">
                <img src="https://lipsum.app/id/47/200x150" />
            </a>
            <a data-fancybox="gallery" href="https://lipsum.app/id/51/1600x1200">
                <img src="https://lipsum.app/id/51/200x150" />
            </a>
            <a data-fancybox="gallery" href="https://lipsum.app/id/46/1600x1200">
                <img src="https://lipsum.app/id/46/200x150" />
            </a>
            <a data-fancybox="gallery" href="https://lipsum.app/id/47/1600x1200">
                <img src="https://lipsum.app/id/47/200x150" />
            </a>
            <a data-fancybox="gallery" href="https://lipsum.app/id/51/1600x1200">
                <img src="https://lipsum.app/id/51/200x150" />
            </a><a data-fancybox="gallery" href="https://lipsum.app/id/46/1600x1200">
                <img src="https://lipsum.app/id/46/200x150" />
            </a>
            <a data-fancybox="gallery" href="https://lipsum.app/id/47/1600x1200">
                <img src="https://lipsum.app/id/47/200x150" />
            </a>
            <a data-fancybox="gallery" href="https://lipsum.app/id/51/1600x1200">
                <img src="https://lipsum.app/id/51/200x150" />
            </a><a data-fancybox="gallery" href="https://lipsum.app/id/46/1600x1200">
                <img src="https://lipsum.app/id/46/200x150" />
            </a>
            <a data-fancybox="gallery" href="https://lipsum.app/id/47/1600x1200">
                <img src="https://lipsum.app/id/47/200x150" />
            </a>
            <a data-fancybox="gallery" href="https://lipsum.app/id/51/1600x1200">
                <img src="https://lipsum.app/id/51/200x150" />
            </a><a data-fancybox="gallery" href="https://lipsum.app/id/46/1600x1200">
                <img src="https://lipsum.app/id/46/200x150" />
            </a>
            <a data-fancybox="gallery" href="https://lipsum.app/id/47/1600x1200">
                <img src="https://lipsum.app/id/47/200x150" />
            </a>
        </Fancybox> */}