import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ImageService from "../../../API/ImageService";
import useAuthUser from "../../../hooks/useAuthUser";
import PhotoUploader from "../../UI/PhotoUploader/PhotoUploader";
import "./SpecialistInfo.css";

function SpecialistInfo({className}) {
    const classNameFull = className ? ["SpecialistInfo", className].join(" ") : "SpecialistInfo";
    const [avatar, setAvatar] = useState(null);
    const [authUser, setAuthUser] = useAuthUser();

    useEffect(() => {
        if(!authUser) return;

        (async function() {
            const resAvatar = await ImageService.getAvatarByUsertId(authUser?.id);
            const resAvatarBody = await resAvatar.json();

            if(resAvatar.ok && resAvatarBody.length !== 0) {
                setAvatar(resAvatarBody[0]);
            } else {
                console.log("Нет автарки");
            }
        })();
    }, [authUser]);

    async function handleOnChange(e) {
        if(e.target.files.length === 0) return toast.wanr("Необходимо выбрать фотку");
        const file = e.target.files[0];

        const loader = toast.loading("Загружаем автарку...");

        const image = await ImageService.uploadImage(file, "avatar");
        const imageBody = await image.json();

        if(image.ok) {
            console.log(imageBody);
            setAvatar(imageBody);
            toast.update(loader, { render: "Автарка успешно загружена", type: "success", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});
        } else {
            console.log(imageBody.message);
            toast.update(loader, { render: imageBody.message, type: "error", isLoading: false, delay: 10, autoClose: null, pauseOnHover: null});
        }
       
    }

    return (
        <div className={classNameFull}>
            <div className="SpecialistInfo__img">
                { 
                    avatar &&
                    // <img src={`/${avatar.filename}`} alt="Не удалось загрузить фотку"/>
                    <img src={`http://localhost:3000/${avatar.filename}`} alt="Не удалось загрузить фотку"/>
                }
            </div>
            <div className="SpecialistInfo__stat">
                <div className="SpecialistInfo__name">{authUser ? `${authUser.lastName} ${authUser.firstName} ${authUser.middleName}` : "Фамилия имя отчество"}</div>
                <div className="SpecialistInfo__upload">
                    <PhotoUploader className={"SpecialistInfo__photoUploader"} placeholder={"Загрузить аватар"} name={"avatar"} onChange={handleOnChange}/>
                </div>
                {/* <div className="SpecialistInfo__upload">
                    <PhotoUploader className={"SpecialistInfo__photoUploader"} placeholder={"Загрузить паспорт"} name={"passport"}/>
                </div> */}
            </div>
        </div>
    )
}

export default SpecialistInfo;