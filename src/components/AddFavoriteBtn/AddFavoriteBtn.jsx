import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FavoriteService from "../../API/FavoriteService";
import useAuthSpecialist from "../../hooks/useAuthSpecialist";
import useAuthUser from "../../hooks/useAuthUser";
import useFavorite from "../../hooks/useFavorite";
import AuthorizationModal from "../AuthorizationModal/AuthorizationModal";
import Button from "../UI/Button/Button";
import "./AddFavoriteBtn.css";

function AddFavoriteBtn({specialistId}) {
    const [favorites, setFavorites, isVisibleFavorites, setIsVisibleFavorites] = useFavorite();
    const [favorite, setIsFavorite] = useState(null);
    const [isVisibleAuthorization, setIsVisibleAuthorization] = useState(false);
    const [authUser, setAuthUser] = useAuthUser();
    const [authSpecialist, setAuthSpecialist] = useAuthSpecialist();

    useEffect(() => {
        const favorite = favorites.find(favorite => favorite.specialist.id === specialistId);
        if(favorite) {
            setIsFavorite(favorite);
        } else {
            setIsFavorite(null);
        }
    }, [specialistId, favorites])

    async function handleDelete(id) {
        const loader = toast.loading("Удаление из избранных...");
        const res = await FavoriteService.deleteById(id);
        const resBody = await res.json();

        if(res.ok) {
            setFavorites(favorites.filter(favorite => favorite.id !== id));
            toast.update(loader, { render: resBody.message, type: "success", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});
           
        } else {
            toast.update(loader, { render: "Что-то пошло не так! Не получилось удалить", type: "error", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});
        }
    }

    async function handleAdd() {
        if(!authUser) return setIsVisibleAuthorization(true);

        const loader = toast.loading("Добавление в избранные...");

        const res = await FavoriteService.addBySpecialistId(specialistId);
        const resBody = await res.json();

        if(res.ok) {
            setFavorites([...favorites, resBody]);
            toast.update(loader, { render: "Специалист добавлен в избранные", type: "success", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});
        } else {
            toast.update(loader, { render: resBody.message, type: "error", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});
        }
    }

    return (<> 
        {
            authSpecialist?.id !== specialistId &&
            <>{ favorite ?
                <Button className="AddFavoriteBtn AddFavoriteBtn_active" onClick={() => handleDelete(favorite.id)}>
                    <i className="gg-heart"></i>
                </Button>
                :
                <Button className="AddFavoriteBtn" onClick={() => handleAdd()}>
                    <i className="gg-heart"></i>
                </Button>
            }
             <AuthorizationModal isVisible={isVisibleAuthorization} setIsVisible={setIsVisibleAuthorization}/>
            </>
        }
    </>);
}

export default AddFavoriteBtn;