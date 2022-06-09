import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ImageService from "../../API/ImageService";
import SpecialistService from "../../API/SpecialistService";
import useAuthUser from "../../hooks/useAuthUser";

function ChatListItem({chat, userId}) {
    const navigator = useNavigate();
    const [selecetedUser, setSelectedUser] = useState(null);
    const [isVisibleAvatar, setIsVisibleAvatar] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [authUser, setAuthUser] = useAuthUser();

    useEffect(() => {
        const firstUser = chat.firstUser;
        const secondUser = chat.secondUser;
    
        let curSelectedUser = null;
        if(firstUser.id === authUser.id){
            setSelectedUser(secondUser);
            curSelectedUser = secondUser;
        } else {
            setSelectedUser(firstUser);
            curSelectedUser = firstUser;
            console.log(curSelectedUser);
        }

        (async() => {
            const resImage =  await ImageService.getAvatarByUsertId(curSelectedUser.id);
            const resImageBody = await resImage.json();
            
            if(resImage.ok) {
                setAvatar(resImageBody[0]);
            }
        })();
    }, [chat]);

    async function handleClick(e) {
        if(e.ctrlKey) {
            const resSpecialist = await SpecialistService.getByUserId(selecetedUser.id);
            const resSpecialistBody = await resSpecialist.json();

            if(resSpecialist.ok) {
                return navigator(`/profile/${resSpecialistBody.id}`);
            } else {
                toast.error("Нет аккаунта специалиста!");
            }
        }

        navigator(`/messages/${selecetedUser.id}`)
    }

    return (
        <div className="ChatList__Item" onClick={handleClick} style={userId === selecetedUser?.id ? {backgroundColor: "var(--c-bg)"} : {}}>
           {selecetedUser && <>
                <div className="ChatList__avatar">
                    {
                        avatar 
                        ?
                        <img src={`/${avatar.filename}`} alt="Не удалось загрузить аватар" />
                        :
                        <div className="comment__avatar">{selecetedUser?.firstName[0]}</div>
                    }
                </div>
                <div>
                    {selecetedUser.firstName}  {selecetedUser.lastName}
                </div>
            </>}
        </div>
    );
}

export default ChatListItem;