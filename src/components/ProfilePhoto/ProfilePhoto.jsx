import Fancybox from "../Fancybox/Fancybox";
import "./ProfilePhoto.css";

function ProfilePhoto() {
    return (<div className="ProfilePhoto">
        <div className="ProfilePhoto__title title">
                Фотографии
        </div>
        <div className="ProfilePhoto__body">
            <Fancybox options={{ infinite: true }}>
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
        </Fancybox>
        </div>
    </div>);
}

export default ProfilePhoto;