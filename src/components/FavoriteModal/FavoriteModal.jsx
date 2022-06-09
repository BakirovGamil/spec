import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FavoriteService from "../../API/FavoriteService";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import "./FavoriteModal.css";

function FavoriteModal({favorites, setFavorites, isVisible, setIsVisible}) {
    const navigator = useNavigate();

    async function handleDelete(id) {
        const loader = toast.loading("Удаление из избранных...");
        const res = await FavoriteService.deleteById(id);
        const resBody = await res.json();

        if(res.ok) {
            toast.update(loader, { render: resBody.message, type: "success", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});
            setFavorites(favorites.filter(favorite => favorite.id !== id));
        } else {
            toast.update(loader, { render: "Что-то пошло не так! Не получилось удалить", type: "error", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});
        }
    }

    function handleClick(specialistId) {
        setIsVisible(false);
        navigator(`/profile/${specialistId}`);
    }

    return (
        <Modal title="Избранные специалисты" isVisible={isVisible} setIsVisible={setIsVisible}>
            <div className='favorite'>
                {
                    !!favorites.length 
                    ?
                        favorites.map(favorite => {
                            console.log(favorite);
                            return (
                                <div className='favorite__specialist'>
                                    <div className="favorite__left" onClick={() => handleClick(favorite.specialist.id)}>
                                        <div className="favorite__name">
                                            {favorite.specialist.user.lastName} {favorite.specialist.user.firstName} {favorite.specialist.user.middleName}
                                        </div>
                                    </div>
                                    <div className="favorite__right">
                                        <Button isBackground onClick={() => handleDelete(favorite.id)}>
                                            Удалить
                                        </Button>
                                    </div>
                                </div>
                            );
                        })
                    :
                    <div style={{textAlign: "center"}}>
                        Нет избранных специалистов
                    </div>
                }
            </div>
        </Modal>
    )
}

export default FavoriteModal;