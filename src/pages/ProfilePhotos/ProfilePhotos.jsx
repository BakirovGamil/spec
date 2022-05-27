import Fancybox from "../../components/Fancybox/Fancybox";
import Header from "../../components/Header/Header";
import "./ProfilePhotos.css";

function ProfilePhotos() {
    return (<>
        <Header/>
        <main>
            <div className="photos">
                <div className="container">
                    <div className="photos__title title">
                        Фотографии NAME
                    </div>
                    <div className="photos__body">
                        <Fancybox options={{ infinite: true }}>
                            <div className="photos__img">
                                <a data-fancybox="gallery" 
                                    data-info="АААААААААААААААААААААААААААААААА"
                                    href="https://lipsum.app/id/46/1600x1200"
                                >
                                    <img src="https://lipsum.app/id/46/200x150" />
                                </a>
                            </div>
                            <div className="photos__img">
                                <a data-fancybox="gallery" data-info="Какое-то описание" href="https://lipsum.app/id/47/1600x1200">
                                    <img src="https://lipsum.app/id/47/200x150" />
                                </a>
                            </div>
                            <div className="photos__img">
                                <a data-fancybox="gallery" href="https://lipsum.app/id/51/1600x1200">
                                    <img src="https://lipsum.app/id/51/200x150" />
                                </a>
                            </div>
                            <div className="photos__img">
                                <a data-fancybox="gallery" href="https://lipsum.app/id/46/1600x1200">
                                    <img src="https://lipsum.app/id/46/200x150" />
                                </a>
                            </div>
                            <div className="photos__img">
                                <a data-fancybox="gallery" href="https://lipsum.app/id/47/1600x1200">
                                    <img src="https://lipsum.app/id/47/200x150" />
                                </a>
                            </div>
                            <div className="photos__img">
                                <a data-fancybox="gallery" href="https://lipsum.app/id/51/1600x1200">
                                    <img src="https://lipsum.app/id/51/200x150" />
                                </a>
                            </div>
                            <div className="photos__img">
                                <a data-fancybox="gallery" href="https://lipsum.app/id/46/1600x1200">
                                    <img src="https://lipsum.app/id/46/200x150" />
                                </a>
                            </div>
                            <div className="photos__img">
                                <a data-fancybox="gallery" href="https://lipsum.app/id/47/1600x1200">
                                    <img src="https://lipsum.app/id/47/200x150" />
                                </a>
                            </div>
                            <div className="photos__img">
                                <a data-fancybox="gallery" href="https://lipsum.app/id/51/1600x1200">
                                    <img src="https://lipsum.app/id/51/200x150" />
                                </a>
                            </div>
                            <div className="photos__img">
                                <a data-fancybox="gallery" href="https://lipsum.app/id/51/1600x1200">
                                    <img src="https://lipsum.app/id/51/200x150" />
                                </a>
                            </div>
                            <div className="photos__img">
                                <a data-fancybox="gallery" href="https://lipsum.app/id/46/1600x1200">
                                    <img src="https://lipsum.app/id/46/200x150" />
                                </a>
                            </div>
                            <div className="photos__img">
                                <a data-fancybox="gallery" href="https://lipsum.app/id/47/1600x1200">
                                    <img src="https://lipsum.app/id/47/200x150" />
                                </a>
                            </div>
                            <div className="photos__img">
                                <a data-fancybox="gallery" href="https://lipsum.app/id/51/1600x1200">
                                    <img src="https://lipsum.app/id/51/200x150" />
                                </a>
                            </div>
                        </Fancybox>
                    </div>
                </div>
            </div>
        </main>
    </>);
}

export default ProfilePhotos;