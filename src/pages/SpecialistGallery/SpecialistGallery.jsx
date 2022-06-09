import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ImageService from "../../API/ImageService";
import AddPhotoModal from "../../components/AddPhotoModal/AddPhotoModal";
import Fancybox from "../../components/Fancybox/Fancybox";
import Header from "../../components/Header/Header";
import Button from "../../components/UI/Button/Button";
import Modal from "../../components/UI/Modal/Modal";
import useAuthSpecialist from "../../hooks/useAuthSpecialist";
import useFetching from "../../hooks/useFetching";
import "./SpecialistGallery.css";

function SpecialistGallery() {
    const navigator = useNavigate();
    const [images, setImages] = useState(null);
    const [authSpecialst, setAuthSpecialist] = useAuthSpecialist();
    const [isVisibleUploader, setIsVisibleUploader] = useState(false);
    const [isVisibleUpdate, setIsVisibleUpdate] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const [isSpecialistLoading, fetchSpecialist, errorSpecialist] = useFetching(async () => {
        if(!authSpecialst) return;

        const resImages = await ImageService.getGalleryByUsertId(authSpecialst.user.id, 0);
        const resImagesBody = await resImages.json();
        if(!resImages.ok)  return console.log(resImagesBody.message);

        setImages(resImagesBody);
    });

    useEffect(() => {
        fetchSpecialist();
    }, [authSpecialst]);

    async function handleDelete(id) {
        const loader = toast.loading("Удаление фотки...");

        const resImage = await ImageService.deleteById(id);
        const resImageBody = await resImage.json();

        if(resImage.ok) {
            toast.update(loader, { render: "Фотка удалена", type: "success", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});
            setImages(images.filter(image => image.id !== id));
        } else {
            toast.update(loader, { render: resImageBody.message, type: "error", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});
        }
    }

    async function handleUpdate(e) {
        e.preventDefault();

        const loader = toast.loading("Обновление описания фотки...");

        const resImage = await ImageService.updateDescriptionById(e.target.description.value, selectedImage.id);
        const resImageBody = await resImage.json();

        if(resImage.ok) {
            toast.update(loader, { render: "Описание обновлено", type: "success", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});
            setImages(images.map(image => {
                if(image === selectedImage)
                    return {...selectedImage, description: e.target.description.value}

                return image;
            }));
            setIsVisibleUpdate(false);
            e.target.reset();
        } else {
            toast.update(loader, { render: resImageBody.message, type: "error", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});
        }
    }

    return (<>
        <Header/>
        <main>
            {authSpecialst && images &&
                <div className="SpecialistGallery">
                    <div className="container">
                        <div className="SpecialistGallery__head">
                            <Button className={"SpecialistGallery__button"} onClick={() => navigator(`/profile/${authSpecialst.id}`)}>
                                <i className="gg-chevron-left"></i>
                                Вернуться назад
                            </Button>
                            <span className="title__text title">Мои фотографии</span>
                            <Button className="SpecialistGallery__uploadBtn" isBackground onClick={() => setIsVisibleUploader(true)}>
                                Загрузить фотку
                            </Button>
                        </div>
                        <div className="SpecialistGallery__body">
                        {   !!images.length 
                            ?
                            <Fancybox options={{ infinite: true }}>
                                {
                                    images.map((image) => {
                                        return (
                                            <div key={image.id} className="SpecialistGallery__img">
                                                   <div className="SpecialistGallery__actions">
                                                        <Button className="SpecialistGallery__actionBtn" isBackground onClick={() => handleDelete(image.id)}>
                                                            <i className="gg-trash"></i>
                                                        </Button>
                                                        <Button className="SpecialistGallery__actionBtn" isBackground onClick={() => {setSelectedImage(image); setIsVisibleUpdate(true);}}>
                                                            <i className="gg-edit-markup"></i> 
                                                        </Button>
                                                    </div>
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
                            :
                            <div className="title SpecialistGallery__empty">Нет фоток</div>
                        }
                        </div>
                    </div>
                 </div>
            }
            <AddPhotoModal isVisible={isVisibleUploader} setIsVisible={setIsVisibleUploader} images={images} setImages={setImages}/>
            <Modal title="Обновить описание" isVisible={isVisibleUpdate} setIsVisible={setIsVisibleUpdate}>
                <form className="uploader" onSubmit={handleUpdate}>
                    <textarea placeholder={selectedImage?.description} name="description" className="uploader__textArea"/>
                    <Button isBackground>
                        Обновить описание
                    </Button>
                </form>
            </Modal>
        </main>
    </>);
}

export default SpecialistGallery;