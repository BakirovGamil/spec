import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageService from "../../API/ImageService";
import SpecialistService from "../../API/SpecialistService";
import Fancybox from "../../components/Fancybox/Fancybox";
import Header from "../../components/Header/Header";
import Button from "../../components/UI/Button/Button";
import useFetching from "../../hooks/useFetching";
import "./ProfilePhotos.css";

function ProfilePhotos() {
    const {specialistId} = useParams();
    const navigator = useNavigate();
    const [specialist, setSpecialist] = useState(null);
    const [images, setImages] = useState(null);

    const [isSpecialistLoading, fetchSpecialist, errorSpecialist] = useFetching(async () => {
        const resSpecialist = await SpecialistService.getById(specialistId);
        const resSpecialistBody = await resSpecialist.json();
        if(!resSpecialist.ok) return console.log(resSpecialistBody.message);

        const resImages = await ImageService.getGalleryByUsertId(resSpecialistBody.user.id, 4);
        const resImagesBody = await resImages.json();
        if(!resImages.ok)  return console.log(resImagesBody.message);

        setSpecialist(resSpecialistBody);
        setImages(resImagesBody);
    });

    useEffect(() => {
        fetchSpecialist();
    }, []);

    return (<>
        <Header/>
        <main>
            {   specialist && images &&
                <div className="photos">
                    <div className="container">
                        <Button className={"photos__button"} onClick={() => navigator(`/profile/${specialistId}`)}>
                            <i className="gg-chevron-left"></i>
                            Вернуться назад
                        </Button>
                        <div className="photos__title title">
                            <span className="title__text">Фотографии {`${specialist.user.lastName} ${specialist.user.firstName} ${specialist.user.middleName}`}</span>
                        </div>
                        <div className="photos__body">
                            <Fancybox options={{ infinite: true }}>
                                {
                                    images.map((image) => {
                                        return (
                                            <div key={image.id} className="photos__img">
                                                <a data-fancybox="gallery" 
                                                    data-info={image.description}
                                                    href={`http://localhost:3000/${image.filename}`}
                                                >
                                                    <img src={`http://localhost:3000/${image.filename}`} alt={"Не удалось загрузить фотку"}/>
                                                </a>
                                            </div>
                                        );
                                    })
                                }
                            </Fancybox>
                        </div>
                    </div>
                 </div>
            }
        </main>
    </>);
}

export default ProfilePhotos;