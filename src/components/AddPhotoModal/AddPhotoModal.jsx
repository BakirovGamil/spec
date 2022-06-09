import { toast } from "react-toastify";
import ImageService from "../../API/ImageService";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import PhotoUploader from "../UI/PhotoUploader/PhotoUploader";
import "./AddPhotoModal.css";

function AddPhotoModal({isVisible, setIsVisible, images, setImages}) {
    async function handleSendPhoto(e) {
        e.preventDefault();
        
        const form = e.target;
        if(form.image.files.length === 0) return toast.warn("Вы не выбрали фотку");

        const loader = toast.loading("Отправка фотки...");

        const resImage = await ImageService.uploadImage(form.image.files[0], 'gallery', form.description.value);
        const resImageBody = await resImage.json();

        if(resImage.ok) {
            toast.update(loader, { render: "Фотка добавлена", type: "success", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});
            setImages([...images, resImageBody]);
            e.target.reset();
        } else {
            toast.update(loader, { render: resImageBody.message, type: "error", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});
        }
    }

    return (
        <Modal title="Загрузка фотки" isVisible={isVisible} setIsVisible={setIsVisible}>
            <form className="uploader" onSubmit={handleSendPhoto}>
                <PhotoUploader className="uploader__photoUploader" placeholder="Выбрать фотку" name="image"/>
                <textarea placeholder="Описание" name="description" className="uploader__textArea"/>
                <Button isBackground>
                    Загрузить фотку
                </Button>
            </form>
        </Modal>
    );
}

export default AddPhotoModal;